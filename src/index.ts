// Copyright 2019 Andrew Pouliot
import { conditionalReadBlacklist } from "./readBlacklist";
import { applyOverridesToChildren } from "./applyOverridesToChildren";
import * as F from "./figma-json";
import {
  saveFigmaState as useFigmaState,
  restoreFigmaState
} from "./figmaState";
import updateImageHashes from "./updateImageHashes";

// Expose types for our consumers to interact with
export * from "./figma-json";

export { default as defaultLayers } from "./figma-default-layers";

// Things in figmaJSON we are not writing right now
export const writeBlacklist = new Set([
  "id",
  "componentPropertyReferences",
  "variantProperties",
  // readonly
  "overlayPositionType",
  "overlayBackground",
  "overlayBackgroundInteraction",
  "fontWeight",
  "overrides",
  "componentProperties",
  // Not part of the Figma Plugin API
  "inferredAutoLayout", // TODO: could add to readBlacklist
  "componentId",
  "isAsset"
]);

export const fallbackFonts: F.FontName[] = [
  { family: "Inter", style: "Regular" }, // default style
  { family: "Inter", style: "Thin" },
  { family: "Inter", style: "Extra Light" },
  { family: "Inter", style: "Light" },
  { family: "Inter", style: "Medium" },
  { family: "Inter", style: "Semi Bold" },
  { family: "Inter", style: "Bold" },
  { family: "Inter", style: "Extra Bold" },
  { family: "Inter", style: "Black" }
];

function notUndefined<T>(x: T | undefined): x is T {
  return x !== undefined;
}

// Returns true if n is a visible SceneNode or
// not a SceneNode (e.g. a string, number, etc.)
function isVisible(n: any) {
  if (typeof n !== "object") {
    return true;
  }

  if (
    !("visible" in n) ||
    typeof n.visible !== "boolean" ||
    !("opacity" in n) ||
    typeof n.opacity !== "number" ||
    !("removed" in n) ||
    typeof n.removed !== "boolean"
  ) {
    return true;
  }

  return n.visible && n.opacity > 0.001 && !n.removed;
}

export interface Options {
  skipInvisibleNodes: boolean;
  images: boolean;
  geometry: "none" | "paths";
  styles: boolean;
}

const defaultOptions: Options = {
  skipInvisibleNodes: true,
  // TODO: Investigate why reading images makes the plugin crash. Otherwise we could have this be true by default.
  images: false,
  geometry: "none",
  styles: false
};

type AnyObject = { [name: string]: any };

class DumpContext {
  constructor(public options: Options) {}

  // Images we need to request and append to our dump
  imageHashes = new Set<string>();
  components: F.ComponentMap = {};
  componentSets: F.ComponentSetMap = {};
  styles: F.StyleMap = {};
}

function _dumpObject(n: AnyObject, keys: readonly string[], ctx: DumpContext) {
  return keys.reduce((o, k) => {
    const v = n[k];
    if (k === "imageHash" && typeof v === "string") {
      ctx.imageHashes.add(v);
    } else if (
      k.endsWith("StyleId") &&
      typeof v === "string" &&
      v.length > 0 &&
      ctx.options.styles
    ) {
      const style = figma.getStyleById(v);

      if (style) {
        ctx.styles[style.id] = {
          key: style.key,
          name: style.name,
          styleType: style.type,
          remote: style.remote,
          description: style.description
        };
      } else {
        console.warn(`Couldn't find style with id ${v}.`);
      }
    } else if (k === "mainComponent" && v) {
      // If this is a reference to a mainComponent, we want to instead add the componentId
      // ok v should be a component
      const component = v as ComponentNode;
      let componentSetId;
      if (component.parent?.type === "COMPONENT_SET") {
        const componentSet = component.parent as ComponentSetNode;
        const { name, description, documentationLinks, key, remote } =
          componentSet;
        componentSetId = componentSet.id;
        ctx.componentSets[componentSet.id] = {
          key,
          name,
          description,
          remote,
          documentationLinks
        };
      }
      const { name, key, description, documentationLinks, remote } = component;
      ctx.components[component.id] = {
        key,
        name,
        description,
        remote,
        componentSetId,
        documentationLinks
      };
      o["componentId"] = v.id;
      return o;
    }
    o[k] = _dump(v, ctx);
    return o;
  }, {} as AnyObject);
}

function _dump(n: any, ctx: DumpContext): any {
  switch (typeof n) {
    case "object": {
      if (Array.isArray(n)) {
        return n
          .filter((v) => !ctx.options.skipInvisibleNodes || isVisible(v))
          .map((v) => _dump(v, ctx));
      } else if (n === null) {
        return null;
      } else if (n.__proto__ !== undefined) {
        // Merge keys from __proto__ with natural keys
        const blacklistKeys = conditionalReadBlacklist(n, ctx.options);
        const keys = [...Object.keys(n), ...Object.keys(n.__proto__)].filter(
          (k) => !blacklistKeys.has(k)
        );
        return _dumpObject(n, keys, ctx);
      } else {
        const keys = Object.keys(n);
        return _dumpObject(n, keys, ctx);
      }
    }
    case "function":
      return undefined;
    case "symbol":
      if (n === figma.mixed) {
        return "__Symbol(figma.mixed)__";
      } else {
        return String(n);
      }
    default:
      return n;
  }
}

async function requestImages(ctx: DumpContext): Promise<F.ImageMap> {
  const imageRequests = [...ctx.imageHashes].map(async (hash: string) => {
    const im = figma.getImageByHash(hash);
    if (im === null) {
      throw new Error(`Image not found: ${hash}`);
    }
    const dat = await im.getBytesAsync();
    // Tell typescript it's a tuple not an array (fromEntries type error)
    return [hash, dat] as [string, Uint8Array];
  });

  const r = await Promise.all(imageRequests);
  return Object.fromEntries(r);
}

export async function dump(
  n: readonly SceneNode[],
  options: Partial<Options> = {}
): Promise<F.DumpedFigma> {
  const resolvedOptions: Options = { ...defaultOptions, ...options };
  const { skipInvisibleNodes } = resolvedOptions;

  // If skipInvisibleNodes is true, skip invisible nodes/their descendants inside *instances*.
  // This only covers instances, and doesn't consider opacity etc.
  // We could filter out these nodes ourselves but it's more efficient when
  // Figma doesn't include them in in the first place.
  useFigmaState(skipInvisibleNodes);

  const ctx = new DumpContext(resolvedOptions);

  const objects = n
    .filter((v) => !skipInvisibleNodes || isVisible(v))
    .map((o) => _dump(o, ctx));

  const images = resolvedOptions.images ? await requestImages(ctx) : {};

  // Reset skipInvisibleInstanceChildren to not affect other code.
  restoreFigmaState();

  const { components, componentSets, styles } = ctx;

  return {
    objects,
    components,
    componentSets,
    styles,
    images
  };
}

// Loads fonts and returns the available fonts/missing fonts
// as well as what fonts to replace the missing fonts with.
export async function loadFonts(
  requestedFonts: F.FontName[],
  fallbackFonts: F.FontName[]
): Promise<{
  availableFonts: F.FontName[];
  missingFonts: F.FontName[];
  // It's slightly awkward to have a map of encoded fonts
  // but it's a better DX than an array of font names.
  fontReplacements: Record<EncodedFont, EncodedFont>;
}> {
  const availableFonts: F.FontName[] = [];
  const missingFonts: F.FontName[] = [];
  const fontReplacements: Record<EncodedFont, EncodedFont> = {};

  const loadFontPromises = requestedFonts.map(async (fontName) => {
    try {
      await figma.loadFontAsync(fontName);
      availableFonts.push(fontName);
    } catch (e) {
      console.warn(`Unable to load font: ${encodeFont(fontName)}`);
      missingFonts.push(fontName);
      const replacement = getFontReplacement(fontName, fallbackFonts);
      console.log(`Trying font replacement: ${encodeFont(replacement)}`);
      try {
        await figma.loadFontAsync(replacement);
        console.log(`Loaded font replacement: ${encodeFont(replacement)}`);
        fontReplacements[encodeFont(fontName)] = encodeFont(replacement);
      } catch (e) {
        console.warn(
          `Unable to load font replacement: ${encodeFont(replacement)}`
        );
        // Assumes Inter Regular is always available
        fontReplacements[encodeFont(fontName)] = encodeFont(fallbackFonts[0]);
      }
    }
  });

  await Promise.all(loadFontPromises);

  console.log("done loading fonts.");
  return { availableFonts, missingFonts, fontReplacements };
}

// Loads components and returns the available components.
// We don't care about missing components (for now) because
// there's not much we can do; we'd have to find the most similar
// component and use that instead.
// TODO: Write a test.
async function loadComponents(requestedComponents: F.ComponentMap) {
  const availableComponents: Record<string, ComponentNode> = {};

  await Promise.all(
    Object.entries(requestedComponents).map(async ([id, requested]) => {
      try {
        const component = await figma.importComponentByKeyAsync(requested.key);
        availableComponents[id] = component;
      } catch (e) {
        // Check if the component is an unpublished, local component.
        const node = figma.getNodeById(id);
        if (node && node.type === "COMPONENT") {
          availableComponents[id] = node as ComponentNode;
        } else {
          console.log("error loading component:", e);
        }
      }
    })
  );

  return { availableComponents };
}

// Loads styles.
// Doesn't return the available styles because we don't need it to
// use the styles. We don't care about missing styles (for now)
// because every node also stores what it looks like as the
// result of applying the style.
// TODO: Write a test.
async function loadStyles(requestedStyles: F.StyleMap) {
  await Promise.all(
    Object.entries(requestedStyles).map(async ([id, requested]) => {
      try {
        await figma.importStyleByKeyAsync(requested.key);
      } catch (e) {
        // The style could be an unpublished, local style.
        // We don't care regardless because it's pre-loaded in that case.
        console.log("error loading style:", e);
      }
    })
  );
}

// Format is "Family|Style"
type EncodedFont = string;
// Assume that font never contains "|"
export function encodeFont({ family, style }: FontName): EncodedFont {
  if (family.includes("|") || style.includes("|")) {
    throw new Error(`Cannot encode a font with "|" in the name.`);
  }
  return [family, style].join("|");
}

export function decodeFont(f: EncodedFont): FontName {
  const s = f.split("|");
  if (s.length !== 2) {
    throw new Error(`Unable to decode font string: ${f}`);
  }
  const [family, style] = s;
  return { family, style };
}

export async function applyFontName(
  n: TextNode,
  fontName: F.TextNode["fontName"],
  fontReplacements: Record<EncodedFont, EncodedFont>
) {
  if (fontName === "__Symbol(figma.mixed)__") {
    return;
  }

  const replacement = fontReplacements[encodeFont(fontName)];
  if (replacement) {
    n.fontName = decodeFont(replacement);
    return;
  }

  n.fontName = fontName;
}

export function getFontReplacement(
  missingFont: FontName,
  fallbackFonts: F.FontName[]
): F.FontName {
  const replacement = fallbackFonts.find((f) => f.style === missingFont.style);

  if (replacement) {
    return replacement;
  }

  return fallbackFonts[0];
}

function resizeOrLog(
  f: LayoutMixin,
  width: number,
  height: number,
  withoutConstraints?: boolean
) {
  if (width > 0.01 && height > 0.01) {
    if (withoutConstraints) {
      f.resizeWithoutConstraints(width, height);
    } else {
      f.resize(width, height);
    }
    // We could check that the size matches after:
    // console.log("size after:", { width: f.width, height: f.height });
  } else {
    const generic = f as SceneNode;
    const { type } = generic;
    console.log(
      `Couldn't resize item: ${JSON.stringify({
        type,
        width,
        height
      })}`
    );
  }
}

export function fontsToLoad(n: F.DumpedFigma): FontName[] {
  // Sets are dumb in JS, can't use FontName because it's an object ref
  // Normalize all fonts to their JSON representation
  const fonts = new Set<EncodedFont>();

  // Recursive function, searches for fontName to add to set
  const addFonts = (json: F.SceneNode) => {
    switch (json.type) {
      case "COMPONENT":
      case "INSTANCE":
      case "FRAME":
      case "GROUP":
        const { children = [] } = json;
        children.forEach(addFonts);
        return;
      case "TEXT":
        const { fontName } = json;
        if (typeof fontName === "object") {
          fonts.add(encodeFont(fontName));
        } else if (fontName === "__Symbol(figma.mixed)__") {
          console.log("encountered mixed fontName: ", fontName);
        }
    }
  };

  try {
    n.objects.forEach(addFonts);
  } catch (err) {
    console.error("error searching for fonts:", err);
  }

  const fontNames = [...fonts].map((fstr) => decodeFont(fstr));

  return fontNames;
}

// Any value that is (A | B | PluginAPI["mixed"]) becomes  (A | B | F.Mixed)
type SymbolMixedToMixed<T> = T extends PluginAPI["mixed"]
  ? Exclude<T, PluginAPI["mixed"]> | F.Mixed
  : T;

// Apply said transformation to a Partial<T>
type PartialTransformingMixedValues<T> = {
  [P in keyof T]?: SymbolMixedToMixed<T[P]>;
};

function safeAssign<T>(n: T, dict: PartialTransformingMixedValues<T>) {
  for (let k in dict) {
    try {
      if (writeBlacklist.has(k)) {
        continue;
      }
      const v = dict[k];
      // Bit of a nasty hack here, but don't try to set these mixed sentinels
      if (v === F.MixedValue || v === undefined) {
        continue;
      }
      // Have to cast here, typescript doesn't know how to match these up
      n[k] = v as T[typeof k];
      // console.log(`${k} = ${JSON.stringify(v)}`);
    } catch (error) {
      console.error("assignment failed for key", k, error);
    }
  }
}

function applyPluginData(
  n: BaseNodeMixin,
  pluginData: F.SceneNode["pluginData"]
) {
  if (pluginData === undefined) {
    return;
  }
  Object.entries(pluginData).map(([k, v]) => n.setPluginData(k, v));
}

// Sets layoutMode and several peculiar props that we can
// only set without erroring if layoutMode isn't "NONE."
// E.g. we can't even set itemReverseZIndex to false
// (=disabled) without the right layoutMode.
// Note that this doesn't set all auto layout values.
function safeApplyLayoutMode(
  f: BaseFrameMixin,
  dict: {
    layoutMode: F.BaseFrameMixin["layoutMode"];
    itemReverseZIndex: F.BaseFrameMixin["itemReverseZIndex"];
    strokesIncludedInLayout: F.BaseFrameMixin["strokesIncludedInLayout"];
  }
) {
  const { layoutMode, itemReverseZIndex, strokesIncludedInLayout } = dict;
  f.layoutMode = layoutMode;

  if (f.layoutMode !== "NONE") {
    f.itemReverseZIndex = itemReverseZIndex;
    f.strokesIncludedInLayout = strokesIncludedInLayout;
  }
}

export async function insert(n: F.DumpedFigma): Promise<SceneNode[]> {
  const offset = { x: 0, y: 0 };
  console.log("starting insert.");

  // Load all the fonts, components, and styles we need in parallel.
  const [{ fontReplacements }, { availableComponents }] = await Promise.all([
    loadFonts(fontsToLoad(n), fallbackFonts),
    loadComponents(n.components),
    loadStyles(n.styles)
  ]);

  // Create all images
  console.log("creating images.");
  const jsonImages = Object.entries(n.images);
  // TODO(perf): deduplicate same hash => base64 decode => figma
  const hashUpdates = new Map<string, string>();
  const figim = jsonImages.map(([hash, bytes]) => {
    console.log("Adding with hash: ", hash);
    // We can't look up the image by our hash, since figma has a different one
    // const buffer = toByteArray(bytes);
    const im = figma.createImage(bytes);
    // Tell typescript this is a tuple not an array
    hashUpdates.set(hash, im.hash);
    return [hash, im] as [string, Image];
  });

  console.log("updating figma based on new hashes.");
  const objects = n.objects.map((n) => updateImageHashes(n, hashUpdates));

  console.log("inserting.");
  const insertSceneNode = (
    json: F.SceneNode,
    target: BaseNode & ChildrenMixin
  ): SceneNode | undefined => {
    // Using lambdas here to make sure figma is bound as this
    // TODO: experiment whether this is necessary
    const factories = {
      RECTANGLE: () => figma.createRectangle(),
      LINE: () => figma.createLine(),
      ELLIPSE: () => figma.createEllipse(),
      POLYGON: () => figma.createPolygon(),
      STAR: () => figma.createStar(),
      VECTOR: () => figma.createVector(),
      TEXT: () => figma.createText(),
      FRAME: () => figma.createFrame(),
      COMPONENT: () => figma.createComponent(),
      INSTANCE: (
        componentId: F.InstanceNode["componentId"],
        availableComponents: Record<string, ComponentNode>
      ) => {
        const component = availableComponents[componentId];
        if (!component) {
          throw new Error("Couldn't find component");
        }
        return component.createInstance();
      }

      // Not sceneNodes…
      // createPage(): PageNode;
      // createSlice(): SliceNode;
    };

    const addToParent = (n: SceneNode | undefined) => {
      // console.log("adding to parent", n);
      if (n && n.parent !== target) {
        target.appendChild(n);
      }
    };

    let n;
    switch (json.type) {
      case "INSTANCE":
        const {
          type,
          children = [], // satisfying safeAssign
          width,
          height,
          pluginData,
          layoutMode,
          itemReverseZIndex,
          strokesIncludedInLayout,
          componentId,
          overflowDirection, // cannot be overridden in an instance
          isExposedInstance, // TODO: applies when instance is in component/component set
          componentProperties,
          ...rest
        } = json;

        let f: InstanceNode;

        try {
          f = factories[type](componentId, availableComponents);
        } catch {
          console.error("Couldn't create instance of component", componentId);
          break;
        }

        const properties = Object.fromEntries(
          Object.entries(componentProperties).map(
            ([propertyName, { value }]) => [propertyName, value]
          )
        );
        f.setProperties(properties);
        applyOverridesToChildren(f, json);
        addToParent(f);
        safeApplyLayoutMode(f, {
          layoutMode,
          itemReverseZIndex,
          strokesIncludedInLayout
        });
        resizeOrLog(f, width, height);
        safeAssign(f, rest);
        applyPluginData(f, pluginData);
        n = f;
        break;
      // Handle types with children
      case "FRAME":
      case "COMPONENT": {
        const {
          type,
          children = [],
          width,
          height,
          strokeCap,
          strokeJoin,
          pluginData,
          layoutMode,
          itemReverseZIndex,
          strokesIncludedInLayout,
          ...rest
        } = json;

        const f = factories[json.type]();
        addToParent(f);
        safeApplyLayoutMode(f, {
          layoutMode,
          itemReverseZIndex,
          strokesIncludedInLayout
        });
        resizeOrLog(f, width, height);
        safeAssign(f, rest);
        applyPluginData(f, pluginData);
        // console.log("building children: ", children);
        children.forEach((c) => insertSceneNode(c, f));
        // console.log("applied to children ", f);
        n = f;
        break;
      }
      case "GROUP": {
        const {
          type,
          children = [],
          width,
          height,
          pluginData,
          ...rest
        } = json;
        const nodes = children
          .map((c) => insertSceneNode(c, target))
          .filter(notUndefined);

        const f = figma.group(nodes, target);
        safeAssign(f, rest);
        n = f;
        break;
      }
      case "BOOLEAN_OPERATION": {
        // TODO: this isn't optimal
        const { type, children, width, height, pluginData, ...rest } = json;
        const f = figma.createBooleanOperation();
        safeAssign(f, rest);
        applyPluginData(f, pluginData);
        resizeOrLog(f, width, height);
        n = f;
        break;
      }

      case "RECTANGLE":
      case "ELLIPSE":
      case "LINE":
      case "POLYGON":
      case "VECTOR": {
        const { type, width, height, pluginData, ...rest } = json;
        const f = factories[json.type]();
        safeAssign(
          f,
          rest as Partial<
            RectangleNode & EllipseNode & LineNode & PolygonNode & VectorNode
          >
        );
        applyPluginData(f, pluginData);
        resizeOrLog(f, width, height, true);
        n = f;
        break;
      }

      case "TEXT": {
        const { type, width, height, fontName, pluginData, ...rest } = json;
        const f = figma.createText();
        // Need to assign this first, because of font-loading rules :O
        applyFontName(f, fontName, fontReplacements);
        safeAssign(f, rest);
        applyPluginData(f, pluginData);
        resizeOrLog(f, width, height);
        n = f;
        break;
      }

      default: {
        console.log(`element type not supported: ${json.type}`);
        break;
      }
    }
    if (n) {
      target.appendChild(n);
    } else {
      console.warn("Unable to do anything with", json);
    }
    return n;
  };

  return objects
    .map((o) => {
      const n = insertSceneNode(o, figma.currentPage);
      if (n !== undefined) {
        n.x += offset.x;
        n.y += offset.y;
        n.name = `${n.name} Copy`;
      } else {
        console.error("returned undefined for json", o);
      }
      return n;
    })
    .filter(notUndefined);
}
