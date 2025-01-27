// based on plugin-api.d.ts

/*
 CONVERSION:
    Mixed => Mixed

    */

////////////////////////////////////////////////////////////////////////////////
// Dump that includes nodes and images

export type Base64String = string;

/**	"components": {
		"102:9236": {
			"key": "4bae8a3530377b33f040438a0fe00a9055736b17",
			"name": "icon / 24 / dasboard",
			"description": "",
			"remote": true,
			"documentationLinks": []
		},
 */

// TODO: extend PublishableMixin (publishStatus is missing)
export interface ComponentInfo {
  key: string;
  name: string;
  description: string;
  remote: boolean;
  componentSetId?: string;
  documentationLinks: ReadonlyArray<DocumentationLink>;
}

/**
 * 	"componentSets": {
		"102:9330": {
			"key": "480be1061cf75ce3874204fe4987860c4e732623",
			"name": "面积图",
			"description": "",
			"remote": true
		}

 * */
// TODO: extend PublishableMixin (publishStatus is missing)
export interface ComponentSetInfo {
  key: string;
  name: string;
  description: string;
  remote: boolean;
  documentationLinks: ReadonlyArray<DocumentationLink>;
}

export interface StyleInfo {
  key: string;
  name: string;
  styleType: StyleType;
  remote: boolean;
  description: string;
}

export type ComponentMap = Record<string, ComponentInfo>;
export type ComponentSetMap = Record<string, ComponentSetInfo>;
export type ImageMap = { [hash: string]: Uint8Array };
export type StyleMap = Record<string, StyleInfo>;

export interface DumpedFigma {
  objects: SceneNode[];
  components: ComponentMap;
  componentSets: ComponentSetMap;
  images: ImageMap;
  styles: StyleMap;
}

////////////////////////////////////////////////////////////////////////////////
// Datatypes

// Need this because it's used by `overrides`
export type NodeChangeProperty =
  | "pointCount"
  | "name"
  | "width"
  | "height"
  | "parent"
  | "pluginData"
  | "constraints"
  | "locked"
  | "visible"
  | "opacity"
  | "blendMode"
  | "layoutGrids"
  | "guides"
  | "characters"
  | "styledTextSegments"
  | "vectorNetwork"
  | "effects"
  | "exportSettings"
  | "arcData"
  | "autoRename"
  | "fontName"
  | "innerRadius"
  | "fontSize"
  | "lineHeight"
  | "paragraphIndent"
  | "paragraphSpacing"
  | "letterSpacing"
  | "textAlignHorizontal"
  | "textAlignVertical"
  | "textCase"
  | "textDecoration"
  | "textAutoResize"
  | "fills"
  | "topLeftRadius"
  | "topRightRadius"
  | "bottomLeftRadius"
  | "bottomRightRadius"
  | "constrainProportions"
  | "strokes"
  | "strokeWeight"
  | "strokeAlign"
  | "strokeCap"
  | "strokeJoin"
  | "strokeMiterLimit"
  | "booleanOperation"
  | "overflowDirection"
  | "dashPattern"
  | "backgrounds"
  | "handleMirroring"
  | "cornerRadius"
  | "cornerSmoothing"
  | "relativeTransform"
  | "x"
  | "y"
  | "rotation"
  | "isMask"
  | "clipsContent"
  | "type"
  | "overlayPositionType"
  | "overlayBackgroundInteraction"
  | "overlayBackground"
  | "prototypeStartNode"
  | "prototypeBackgrounds"
  | "expanded"
  | "fillStyleId"
  | "strokeStyleId"
  | "backgroundStyleId"
  | "textStyleId"
  | "effectStyleId"
  | "gridStyleId"
  | "description"
  | "layoutMode"
  | "paddingLeft"
  | "paddingTop"
  | "paddingRight"
  | "paddingBottom"
  | "itemSpacing"
  | "layoutAlign"
  | "counterAxisSizingMode"
  | "primaryAxisSizingMode"
  | "primaryAxisAlignItems"
  | "counterAxisAlignItems"
  | "layoutGrow"
  | "layoutPositioning"
  | "itemReverseZIndex"
  | "hyperlink"
  | "mediaData"
  | "stokeTopWeight"
  | "strokeBottomWeight"
  | "strokeLeftWeight"
  | "strokeRightWeight"
  | "reactions"
  | "flowStartingPoints"
  | "shapeType"
  | "connectorStart"
  | "connectorEnd"
  | "connectorLineType"
  | "connectorStartStrokeCap"
  | "connectorEndStrokeCap"
  | "codeLanguage"
  | "widgetSyncedState"
  | "componentPropertyDefinitions"
  | "componentPropertyReferences"
  | "componentProperties"
  | "embedData"
  | "linkUnfurlData"
  | "text"
  | "authorVisible"
  | "authorName"
  | "code"
  | "textBackground";

// This has to be something convertible to JSON and comparable
export const MixedValue = "__Symbol(figma.mixed)__";
export type Mixed = typeof MixedValue;

export type Transform = [[number, number, number], [number, number, number]];

export type JSON = any;

export interface Vector {
  readonly x: number;
  readonly y: number;
}

export interface Rect {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
}

export interface RGB {
  readonly r: number;
  readonly g: number;
  readonly b: number;
}

export interface RGBA {
  readonly r: number;
  readonly g: number;
  readonly b: number;
  readonly a: number;
}

export interface FontName {
  readonly family: string;
  readonly style: string;
}

export type TextCase = "ORIGINAL" | "UPPER" | "LOWER" | "TITLE";

export type TextDecoration = "NONE" | "UNDERLINE" | "STRIKETHROUGH";

export interface ArcData {
  readonly startingAngle: number;
  readonly endingAngle: number;
  readonly innerRadius: number;
}

export interface DropShadowEffect {
  readonly type: "DROP_SHADOW";
  readonly color: RGBA;
  readonly offset: Vector;
  readonly radius: number;
  readonly spread?: number;
  readonly visible: boolean;
  readonly blendMode: BlendMode;
  readonly showShadowBehindNode?: boolean;
}

export interface InnerShadowEffect {
  readonly type: "INNER_SHADOW";
  readonly color: RGBA;
  readonly offset: Vector;
  readonly radius: number;
  readonly spread?: number;
  readonly visible: boolean;
  readonly blendMode: BlendMode;
}

export interface BlurEffect {
  readonly type: "LAYER_BLUR" | "BACKGROUND_BLUR";
  readonly radius: number;
  readonly visible: boolean;
}

export type Effect = DropShadowEffect | InnerShadowEffect | BlurEffect;

export type ConstraintType = "MIN" | "CENTER" | "MAX" | "STRETCH" | "SCALE";

export interface Constraints {
  readonly horizontal: ConstraintType;
  readonly vertical: ConstraintType;
}

export interface ColorStop {
  readonly position: number;
  readonly color: RGBA;
}

export interface ImageFilters {
  readonly exposure?: number;
  readonly contrast?: number;
  readonly saturation?: number;
  readonly temperature?: number;
  readonly tint?: number;
  readonly highlights?: number;
  readonly shadows?: number;
}

export interface SolidPaint {
  readonly type: "SOLID";
  readonly color: RGB;

  readonly visible?: boolean;
  readonly opacity?: number;
  readonly blendMode?: BlendMode;
}

export interface GradientPaint {
  readonly type:
    | "GRADIENT_LINEAR"
    | "GRADIENT_RADIAL"
    | "GRADIENT_ANGULAR"
    | "GRADIENT_DIAMOND";
  readonly gradientTransform: Transform;
  readonly gradientStops: ReadonlyArray<ColorStop>;

  readonly visible?: boolean;
  readonly opacity?: number;
  readonly blendMode?: BlendMode;
}

export interface ImagePaint {
  readonly type: "IMAGE";
  readonly scaleMode: "FILL" | "FIT" | "CROP" | "TILE";
  readonly imageHash: string | null;
  readonly imageTransform?: Transform; // setting for "CROP"
  readonly scalingFactor?: number; // setting for "TILE"
  readonly rotation?: number; // setting for "FILL" | "FIT" | "TILE"
  readonly filters?: ImageFilters;
  readonly visible?: boolean;
  readonly opacity?: number;
  readonly blendMode?: BlendMode;
}

export interface VideoPaint {
  readonly type: "VIDEO";
  readonly scaleMode: "FILL" | "FIT" | "CROP" | "TILE";
  readonly videoHash: string | null;
  readonly videoTransform?: Transform;
  readonly scalingFactor?: number;
  readonly rotation?: number;
  readonly filters?: ImageFilters;
  readonly visible?: boolean;
  readonly opacity?: number;
  readonly blendMode?: BlendMode;
}

export type Paint = SolidPaint | GradientPaint | ImagePaint | VideoPaint;

export interface Guide {
  readonly axis: "X" | "Y";
  readonly offset: number;
}

export interface RowsColsLayoutGrid {
  readonly pattern: "ROWS" | "COLUMNS";
  readonly alignment: "MIN" | "MAX" | "STRETCH" | "CENTER";
  readonly gutterSize: number;

  readonly count: number; // Infinity when "Auto" is set in the UI
  readonly sectionSize?: number; // Not set for alignment: "STRETCH"
  readonly offset?: number; // Not set for alignment: "CENTER"

  readonly visible?: boolean;
  readonly color?: RGBA;
}

export interface GridLayoutGrid {
  readonly pattern: "GRID";
  readonly sectionSize: number;

  readonly visible?: boolean;
  readonly color?: RGBA;
}

export type LayoutGrid = RowsColsLayoutGrid | GridLayoutGrid;

export interface ExportSettingsConstraints {
  readonly type: "SCALE" | "WIDTH" | "HEIGHT";
  readonly value: number;
}

export interface ExportSettingsImage {
  readonly format: "JPG" | "PNG";
  readonly contentsOnly?: boolean; // defaults to true
  readonly useAbsoluteBounds?: boolean; // defaults to false
  readonly suffix?: string;
  readonly constraint?: ExportSettingsConstraints;
}

export interface ExportSettingsSVG {
  readonly format: "SVG";
  readonly contentsOnly?: boolean; // defaults to true
  readonly useAbsoluteBounds?: boolean; // defaults to false
  readonly suffix?: string;
  readonly svgOutlineText?: boolean; // defaults to true
  readonly svgIdAttribute?: boolean; // defaults to false
  readonly svgSimplifyStroke?: boolean; // defaults to true
}

export interface ExportSettingsPDF {
  readonly format: "PDF";
  readonly contentsOnly?: boolean; // defaults to true
  readonly useAbsoluteBounds?: boolean; // defaults to false
  readonly suffix?: string;
}

export type ExportSettings =
  | ExportSettingsImage
  | ExportSettingsSVG
  | ExportSettingsPDF;

export type WindingRule = "NONZERO" | "EVENODD";

export interface VectorVertex {
  readonly x: number;
  readonly y: number;
  readonly strokeCap?: StrokeCap;
  readonly strokeJoin?: StrokeJoin;
  readonly cornerRadius?: number;
  readonly handleMirroring?: HandleMirroring;
}

export interface VectorSegment {
  readonly start: number;
  readonly end: number;
  readonly tangentStart?: Vector; // Defaults to { x: 0, y: 0 }
  readonly tangentEnd?: Vector; // Defaults to { x: 0, y: 0 }
}

export interface VectorRegion {
  readonly windingRule: WindingRule;
  readonly loops: ReadonlyArray<ReadonlyArray<number>>;
  readonly fills?: ReadonlyArray<Paint>;
  readonly fillStyleId?: string;
}

export interface VectorNetwork {
  readonly vertices: ReadonlyArray<VectorVertex>;
  readonly segments: ReadonlyArray<VectorSegment>;
  readonly regions?: ReadonlyArray<VectorRegion>; // Defaults to []
}

export interface VectorPath {
  readonly windingRule: WindingRule | "NONE";
  readonly data: string;
}

export type VectorPaths = ReadonlyArray<VectorPath>;

export interface LetterSpacing {
  readonly value: number;
  readonly unit: "PIXELS" | "PERCENT";
}

export type LineHeight =
  | {
      readonly value: number;
      readonly unit: "PIXELS" | "PERCENT";
    }
  | {
      readonly unit: "AUTO";
    };

export type HyperlinkTarget = {
  type: "URL" | "NODE";
  value: string;
};

export type TextListOptions = {
  type: "ORDERED" | "UNORDERED" | "NONE";
};

export type BlendMode =
  | "PASS_THROUGH"
  | "NORMAL"
  | "DARKEN"
  | "MULTIPLY"
  | "LINEAR_BURN"
  | "COLOR_BURN"
  | "LIGHTEN"
  | "SCREEN"
  | "LINEAR_DODGE"
  | "COLOR_DODGE"
  | "OVERLAY"
  | "SOFT_LIGHT"
  | "HARD_LIGHT"
  | "DIFFERENCE"
  | "EXCLUSION"
  | "HUE"
  | "SATURATION"
  | "COLOR"
  | "LUMINOSITY";

export interface Font {
  fontName: FontName;
}

export interface StyledTextSegment {
  characters: string;
  start: number;
  end: number;
  fontSize: number;
  fontName: FontName;
  fontWeight: number;
  textDecoration: TextDecoration;
  textCase: TextCase;
  lineHeight: LineHeight;
  letterSpacing: LetterSpacing;
  fills: Paint[];
  textStyleId: string;
  fillStyleId: string;
  listOptions: TextListOptions;
  indentation: number;
  hyperlink: HyperlinkTarget | null;
}

export type Reaction = { action: Action | null; trigger: Trigger | null };

export type Action =
  | { readonly type: "BACK" | "CLOSE" }
  | { readonly type: "URL"; url: string }
  | {
      readonly type: "UPDATE_MEDIA_RUNTIME";
      readonly mediaAction: "PLAY" | "PAUSE" | "TOGGLE_PLAY_PAUSE";
    }
  | {
      readonly type: "NODE";
      readonly destinationId: string | null;
      readonly navigation: Navigation;
      readonly transition: Transition | null;
      readonly preserveScrollPosition: boolean;

      // Only present if navigation == "OVERLAY" and the destination uses
      // overlay position type "RELATIVE"
      readonly overlayRelativePosition?: Vector;
      readonly resetVideoPosition?: boolean;
    };

export interface SimpleTransition {
  readonly type: "DISSOLVE" | "SMART_ANIMATE" | "SCROLL_ANIMATE";
  readonly easing: Easing;
  readonly duration: number;
}

export interface DirectionalTransition {
  readonly type: "MOVE_IN" | "MOVE_OUT" | "PUSH" | "SLIDE_IN" | "SLIDE_OUT";
  readonly direction: "LEFT" | "RIGHT" | "TOP" | "BOTTOM";
  readonly matchLayers: boolean;

  readonly easing: Easing;
  readonly duration: number;
}

export type Transition = SimpleTransition | DirectionalTransition;

export type Trigger =
  | { readonly type: "ON_CLICK" | "ON_HOVER" | "ON_PRESS" | "ON_DRAG" }
  | {
      readonly type: "AFTER_TIMEOUT";
      readonly timeout: number;
    }
  | {
      readonly type: "MOUSE_ENTER" | "MOUSE_LEAVE" | "MOUSE_UP" | "MOUSE_DOWN";
      readonly delay: number;
    }
  | {
      readonly type: "ON_KEY_DOWN";
      readonly device:
        | "KEYBOARD"
        | "XBOX_ONE"
        | "PS4"
        | "SWITCH_PRO"
        | "UNKNOWN_CONTROLLER";
      readonly keyCodes: ReadonlyArray<number>;
    };

export type Navigation =
  | "NAVIGATE"
  | "SWAP"
  | "OVERLAY"
  | "SCROLL_TO"
  | "CHANGE_TO";

export interface Easing {
  readonly type:
    | "EASE_IN"
    | "EASE_OUT"
    | "EASE_IN_AND_OUT"
    | "LINEAR"
    | "EASE_IN_BACK"
    | "EASE_OUT_BACK"
    | "EASE_IN_AND_OUT_BACK"
    | "CUSTOM_CUBIC_BEZIER";
  readonly easingFunctionCubicBezier?: EasingFunctionBezier;
}

export interface EasingFunctionBezier {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export type OverflowDirection = "NONE" | "HORIZONTAL" | "VERTICAL" | "BOTH";

export type OverlayPositionType =
  | "CENTER"
  | "TOP_LEFT"
  | "TOP_CENTER"
  | "TOP_RIGHT"
  | "BOTTOM_LEFT"
  | "BOTTOM_CENTER"
  | "BOTTOM_RIGHT"
  | "MANUAL";

export type OverlayBackground =
  | { readonly type: "NONE" }
  | { readonly type: "SOLID_COLOR"; readonly color: RGBA };

export type OverlayBackgroundInteraction = "NONE" | "CLOSE_ON_CLICK_OUTSIDE";

export type PublishStatus = "UNPUBLISHED" | "CURRENT" | "CHANGED";

export interface ConnectorEndpointPosition {
  position: { x: number; y: number };
}

export interface ConnectorEndpointPositionAndEndpointNodeId {
  position: { x: number; y: number };
  endpointNodeId: string;
}

export interface ConnectorEndpointEndpointNodeIdAndMagnet {
  endpointNodeId: string;
  magnet: "NONE" | "AUTO" | "TOP" | "LEFT" | "BOTTOM" | "RIGHT";
}

export type ConnectorEndpoint =
  | ConnectorEndpointPosition
  | ConnectorEndpointEndpointNodeIdAndMagnet
  | ConnectorEndpointPositionAndEndpointNodeId;

export type ConnectorStrokeCap =
  | "NONE"
  | "ARROW_EQUILATERAL"
  | "ARROW_LINES"
  | "TRIANGLE_FILLED"
  | "DIAMOND_FILLED"
  | "CIRCLE_FILLED";

////////////////////////////////////////////////////////////////////////////////
// Mixins

export interface BaseNodeMixin extends PluginDataMixin {
  readonly id: string;
  // CONVERSION: important to not have parent because we have nesting
  // readonly parent: (BaseNode & ChildrenMixin) | null;
  name: string; // Note: setting this also sets `autoRename` to false on TextNodes
  // CONVERSION: excluding removed because it doesn't provide value
  // readonly removed: boolean;
  // TODO: Add relaunch data?
}

export interface PluginDataMixin {
  readonly pluginData?: { [key: string]: string };

  // Namespace is a string that must be at least 3 alphanumeric characters, and should
  // be a name related to your plugin. Other plugins will be able to read this data.
  readonly sharedPluginData?: {
    [namespace: string]: { [key: string]: string };
  };
}

export interface SceneNodeMixin {
  visible: boolean;
  locked: boolean;
  // CONVERSION: excluding stuckNodes because it's a little cursed
  // readonly stuckNodes: SceneNode[];
  // CONVERSION: excluding attached... for now because it's more effort than it's worth
  // readonly attachedConnectors: ConnectorNode[];
  componentPropertyReferences:
    | {
        [nodeProperty in "visible" | "characters" | "mainComponent"]: string;
      }
    | null;
}

export interface StickableMixin {
  stuckTo: SceneNode | null;
}

export interface ChildrenMixin {
  readonly children: ReadonlyArray<SceneNode>;
}

export interface ConstraintMixin {
  constraints: Constraints;
}

export interface LayoutMixin {
  // CONVERSION: should we use absoluteBounds?
  // readonly absoluteTransform: Transform;
  // CONVERSION: relativeTransform's presence depends on the `geometry` option
  relativeTransform?: Transform;
  x: number;
  y: number;
  rotation: number; // In degrees

  readonly width: number;
  readonly height: number;
  // CONVERSION: should we store absoluteBounds?
  // readonly absoluteRenderBounds: Rect | null;
  // readonly absoluteBoundingBox: Rect | null;
  constrainProportions: boolean;

  layoutAlign: "MIN" | "CENTER" | "MAX" | "STRETCH" | "INHERIT"; // applicable only inside auto-layout frames
  layoutGrow: number;
  layoutPositioning: "AUTO" | "ABSOLUTE";
}

export interface BlendMixin extends MinimalBlendMixin {
  isMask: boolean;
  effects: ReadonlyArray<Effect>;
  effectStyleId: string;
}

export interface ContainerMixin {
  expanded: boolean;
  backgrounds: ReadonlyArray<Paint>; // DEPRECATED: use 'fills' instead
  backgroundStyleId: string; // DEPRECATED: use 'fillStyleId' instead
}

export type StrokeCap =
  | "NONE"
  | "ROUND"
  | "SQUARE"
  | "ARROW_LINES"
  | "ARROW_EQUILATERAL";
export type StrokeJoin = "MITER" | "BEVEL" | "ROUND";
export type HandleMirroring = "NONE" | "ANGLE" | "ANGLE_AND_LENGTH";

export interface MinimalStrokesMixin {
  strokes: ReadonlyArray<Paint>;
  strokeStyleId: string;
  strokeWeight: number | Mixed;
  strokeJoin: StrokeJoin | Mixed;
  strokeAlign: "CENTER" | "INSIDE" | "OUTSIDE";
  dashPattern: ReadonlyArray<number>;
  // CONVERSION: strokeGeometry's presence depends on the `geometry` option
  strokeGeometry?: VectorPaths;
}

export interface IndividualStrokesMixin {
  strokeTopWeight: number;
  strokeBottomWeight: number;
  strokeLeftWeight: number;
  strokeRightWeight: number;
}

export interface MinimalFillsMixin {
  fills: ReadonlyArray<Paint> | Mixed;
  fillStyleId: string | Mixed;
}

export interface GeometryMixin extends MinimalStrokesMixin, MinimalFillsMixin {
  strokeCap: StrokeCap | Mixed;
  strokeMiterLimit: number;
  // CONVERSION: fillGeometry's presence depends on the `geometry` option
  fillGeometry?: VectorPaths;
}

export interface CornerMixin {
  cornerRadius: number | Mixed;
  cornerSmoothing: number;
}

export interface RectangleCornerMixin {
  topLeftRadius: number;
  topRightRadius: number;
  bottomLeftRadius: number;
  bottomRightRadius: number;
}

export interface ExportMixin {
  exportSettings: ReadonlyArray<ExportSettings>;
}

export interface FramePrototypingMixin {
  overflowDirection: OverflowDirection;
  numberOfFixedChildren: number;

  readonly overlayPositionType: OverlayPositionType;
  readonly overlayBackground: OverlayBackground;
  readonly overlayBackgroundInteraction: OverlayBackgroundInteraction;
}

export interface VectorLikeMixin {
  // vectorNetwork: VectorNetwork;
  vectorPaths: VectorPaths;
  handleMirroring: HandleMirroring | Mixed;
}
export interface ReactionMixin {
  reactions: ReadonlyArray<Reaction>;
}

export interface DocumentationLink {
  readonly uri: string;
}

export interface PublishableMixin {
  description: string;
  documentationLinks: ReadonlyArray<DocumentationLink>;
  readonly remote: boolean;
  readonly key: string; // The key to use with "importComponentByKeyAsync", "importComponentSetByKeyAsync", and "importStyleByKeyAsync"
  // CONVERSION: should we expose this?
  readonly publishStatus: PublishStatus;
  // getPublishStatusAsync(): Promise<PublishStatus>
}

export interface DefaultShapeMixin
  extends BaseNodeMixin,
    SceneNodeMixin,
    ReactionMixin,
    BlendMixin,
    GeometryMixin,
    LayoutMixin,
    ExportMixin {}

export interface BaseFrameMixin
  extends BaseNodeMixin,
    SceneNodeMixin,
    ChildrenMixin,
    ContainerMixin,
    GeometryMixin,
    CornerMixin,
    RectangleCornerMixin,
    BlendMixin,
    ConstraintMixin,
    LayoutMixin,
    ExportMixin,
    IndividualStrokesMixin {
  layoutMode: "NONE" | "HORIZONTAL" | "VERTICAL";
  primaryAxisSizingMode: "FIXED" | "AUTO"; // applicable only if layoutMode != "NONE"
  counterAxisSizingMode: "FIXED" | "AUTO"; // applicable only if layoutMode != "NONE"

  primaryAxisAlignItems: "MIN" | "MAX" | "CENTER" | "SPACE_BETWEEN"; // applicable only if layoutMode != "NONE"
  counterAxisAlignItems: "MIN" | "MAX" | "CENTER" | "BASELINE"; // applicable only if layoutMode != "NONE"

  paddingLeft: number; // applicable only if layoutMode != "NONE"
  paddingRight: number; // applicable only if layoutMode != "NONE"
  paddingTop: number; // applicable only if layoutMode != "NONE"
  paddingBottom: number; // applicable only if layoutMode != "NONE"
  itemSpacing: number; // applicable only if layoutMode != "NONE"
  itemReverseZIndex: boolean; // applicable only if layoutMode != "NONE"
  strokesIncludedInLayout: boolean; // applicable only if layoutMode != "NONE"

  // CONVERSION: excluding because deprecated
  // horizontalPadding: number;
  // verticalPadding: number;

  layoutGrids: ReadonlyArray<LayoutGrid>;
  gridStyleId: string;
  clipsContent: boolean;
  guides: ReadonlyArray<Guide>;
}

export interface DefaultFrameMixin
  extends BaseFrameMixin,
    FramePrototypingMixin,
    ReactionMixin {}

export interface OpaqueNodeMixin
  extends BaseNodeMixin,
    SceneNodeMixin,
    ExportMixin {
  // readonly absoluteTransform: Transform;
  // CONVERSION: relativeTransform's presence depends on the `geometry` option
  relativeTransform?: Transform;
  x: number;
  y: number;
  readonly width: number;
  readonly height: number;
  // readonly absoluteBoundingBox: Rect | null;
}

export interface MinimalBlendMixin {
  opacity: number;
  blendMode: BlendMode;
}

export interface VariantMixin {
  readonly variantProperties: { [property: string]: string } | null;
}

interface ComponentPropertiesMixin {
  readonly componentPropertyDefinitions: ComponentPropertyDefinitions;
}

export interface TextSublayerNode extends MinimalFillsMixin {
  // readonly hasMissingFont: boolean;

  paragraphIndent: number;
  paragraphSpacing: number;

  fontSize: number | Mixed;
  fontName: FontName | Mixed;
  readonly fontWeight: number | Mixed;
  textCase: TextCase | Mixed;
  textDecoration: TextDecoration | Mixed;
  letterSpacing: LetterSpacing | Mixed;
  lineHeight: LineHeight | Mixed;
  hyperlink: HyperlinkTarget | null | Mixed;

  characters: string;

  // CONVERSION: this is our own representation of getStyledTextSegments()
  // but commenting out until we support it
  // styledTextSegments: ReadonlyArray<StyledTextSegment>;
}

////////////////////////////////////////////////////////////////////////////////
// Nodes

export interface DocumentNode extends BaseNodeMixin {
  readonly type: "DOCUMENT";

  readonly children: ReadonlyArray<PageNode>;
}

export interface PageNode extends BaseNodeMixin, ChildrenMixin, ExportMixin {
  readonly type: "PAGE";

  guides: ReadonlyArray<Guide>;
  selection: ReadonlyArray<SceneNode>;
  selectedTextRange: { node: TextNode; start: number; end: number } | null;
  flowStartingPoints: ReadonlyArray<{ nodeId: string; name: string }>;

  backgrounds: ReadonlyArray<Paint>;

  prototypeBackgrounds: ReadonlyArray<Paint>;

  readonly prototypeStartNode:
    | FrameNode
    | GroupNode
    | ComponentNode
    | InstanceNode
    | null;
}

export interface FrameNode extends DefaultFrameMixin {
  readonly type: "FRAME";
}

export interface GroupNode
  extends BaseNodeMixin,
    SceneNodeMixin,
    ReactionMixin,
    ChildrenMixin,
    ContainerMixin,
    BlendMixin,
    LayoutMixin,
    ExportMixin {
  readonly type: "GROUP";
}

export interface SliceNode
  extends BaseNodeMixin,
    SceneNodeMixin,
    LayoutMixin,
    ExportMixin {
  readonly type: "SLICE";
}

export interface RectangleNode
  extends DefaultShapeMixin,
    ConstraintMixin,
    CornerMixin,
    RectangleCornerMixin,
    IndividualStrokesMixin {
  readonly type: "RECTANGLE";
}

export interface LineNode extends DefaultShapeMixin, ConstraintMixin {
  readonly type: "LINE";
}

export interface EllipseNode
  extends DefaultShapeMixin,
    ConstraintMixin,
    CornerMixin {
  readonly type: "ELLIPSE";

  arcData: ArcData;
}

export interface PolygonNode
  extends DefaultShapeMixin,
    ConstraintMixin,
    CornerMixin {
  readonly type: "POLYGON";

  pointCount: number;
}

export interface StarNode
  extends DefaultShapeMixin,
    ConstraintMixin,
    CornerMixin {
  readonly type: "STAR";

  pointCount: number;
  innerRadius: number;
}

export interface VectorNode
  extends DefaultShapeMixin,
    ConstraintMixin,
    CornerMixin,
    VectorLikeMixin {
  readonly type: "VECTOR";
}

export interface TextNode
  extends DefaultShapeMixin,
    ConstraintMixin,
    TextSublayerNode {
  readonly type: "TEXT";

  textAlignHorizontal: "LEFT" | "CENTER" | "RIGHT" | "JUSTIFIED";
  textAlignVertical: "TOP" | "CENTER" | "BOTTOM";
  textAutoResize: "NONE" | "WIDTH_AND_HEIGHT" | "HEIGHT" | "TRUNCATE";
  autoRename: boolean;

  textStyleId: string | Mixed;
}

export type ComponentPropertyType =
  | "BOOLEAN"
  | "TEXT"
  | "INSTANCE_SWAP"
  | "VARIANT";

export type InstanceSwapPreferredValue = {
  type: "COMPONENT" | "COMPONENT_SET";
  key: string;
};

export type ComponentPropertyOptions = {
  preferredValues?: InstanceSwapPreferredValue[];
};

export type ComponentPropertyDefinitions = {
  [propertyName: string]: {
    type: ComponentPropertyType;
    defaultValue: string | boolean;
    preferredValues?: InstanceSwapPreferredValue[];
    variantOptions?: string[];
  };
};

export interface ComponentSetNode
  extends BaseFrameMixin,
    PublishableMixin,
    ComponentPropertiesMixin {
  readonly type: "COMPONENT_SET";
  readonly defaultVariant: ComponentNode;
  readonly variantGroupProperties: {
    [property: string]: { values: string[] };
  };
}

export interface ComponentNode
  extends DefaultFrameMixin,
    PublishableMixin,
    VariantMixin,
    ComponentPropertiesMixin {
  readonly type: "COMPONENT";
  // CONVERSION: leaving out to avoid circular deps.
  // readonly instances: InstanceNode[];
}

export interface ComponentProperties {
  [propertyName: string]: {
    type: ComponentPropertyType;
    value: string | boolean;
    preferredValues?: InstanceSwapPreferredValue[];
  };
}

export interface InstanceNode extends DefaultFrameMixin, VariantMixin {
  readonly type: "INSTANCE";
  // CONVERSION: Use the componentId to look up the component in the result instead of recursively defining this
  componentId: string;
  // mainComponent: ComponentNode | null;
  readonly componentProperties: ComponentProperties;
  scaleFactor: number;
  // CONVERSION: leaving out for now to avoid circular deps
  // readonly exposedInstances: InstanceNode[];
  isExposedInstance: boolean;
  readonly overrides: {
    id: string;
    overriddenFields: NodeChangeProperty[];
  }[];
}

export interface BooleanOperationNode
  extends DefaultShapeMixin,
    ChildrenMixin,
    CornerMixin {
  readonly type: "BOOLEAN_OPERATION";
  booleanOperation: "UNION" | "INTERSECT" | "SUBTRACT" | "EXCLUDE";
  expanded: boolean;
}

export interface StickyNode
  extends OpaqueNodeMixin,
    MinimalFillsMixin,
    MinimalBlendMixin {
  readonly type: "STICKY";
  readonly text: TextSublayerNode;
  authorVisible: boolean;
  authorName: string;
}

export interface StampNode
  extends DefaultShapeMixin,
    ConstraintMixin,
    StickableMixin {
  readonly type: "STAMP";
}

export interface HighlightNode
  extends DefaultShapeMixin,
    ConstraintMixin,
    CornerMixin,
    ReactionMixin,
    VectorLikeMixin,
    StickableMixin {
  readonly type: "HIGHLIGHT";
}

export interface WashiTapeNode extends DefaultShapeMixin, StickableMixin {
  readonly type: "WASHI_TAPE";
}

export interface ShapeWithTextNode
  extends OpaqueNodeMixin,
    MinimalFillsMixin,
    MinimalBlendMixin,
    MinimalStrokesMixin {
  readonly type: "SHAPE_WITH_TEXT";
  shapeType:
    | "SQUARE"
    | "ELLIPSE"
    | "ROUNDED_RECTANGLE"
    | "DIAMOND"
    | "TRIANGLE_UP"
    | "TRIANGLE_DOWN"
    | "PARALLELOGRAM_RIGHT"
    | "PARALLELOGRAM_LEFT"
    | "ENG_DATABASE"
    | "ENG_QUEUE"
    | "ENG_FILE"
    | "ENG_FOLDER";
  readonly text: TextSublayerNode;
  readonly cornerRadius?: number;
  rotation: number;
}

export interface CodeBlockNode extends OpaqueNodeMixin, MinimalBlendMixin {
  readonly type: "CODE_BLOCK";
  code: string;
  codeLanguage:
    | "TYPESCRIPT"
    | "CPP"
    | "RUBY"
    | "CSS"
    | "JAVASCRIPT"
    | "HTML"
    | "JSON"
    | "GRAPHQL"
    | "PYTHON"
    | "GO"
    | "SQL"
    | "SWIFT"
    | "KOTLIN"
    | "RUST"
    | "BASH";
}

export interface LayerSublayerNode {
  fills: Paint[] | Mixed;
}

export interface ConnectorNode
  extends OpaqueNodeMixin,
    MinimalBlendMixin,
    MinimalStrokesMixin {
  readonly type: "CONNECTOR";
  readonly text: TextSublayerNode;
  readonly textBackground: LayerSublayerNode;
  readonly cornerRadius?: number;
  connectorLineType: "ELBOWED" | "STRAIGHT";
  connectorStart: ConnectorEndpoint;
  connectorEnd: ConnectorEndpoint;
  connectorStartStrokeCap: ConnectorStrokeCap;
  connectorEndStrokeCap: ConnectorStrokeCap;
  rotation: number;
}

export interface WidgetNode extends OpaqueNodeMixin, StickableMixin {
  readonly type: "WIDGET";
  readonly widgetId: string;
  readonly widgetSyncedState: {
    [key: string]: any;
  };
}

export interface EmbedData {
  srcUrl: string;
  canonicalUrl: string | null;
  title: string | null;
  description: string | null;
  provider: string | null;
}
export interface EmbedNode extends OpaqueNodeMixin, SceneNodeMixin {
  readonly type: "EMBED";
  readonly embedData: EmbedData;
}

export interface LinkUnfurlData {
  url: string;
  title: string | null;
  description: string | null;
  provider: string | null;
}
export interface LinkUnfurlNode extends OpaqueNodeMixin, SceneNodeMixin {
  readonly type: "LINK_UNFURL";
  readonly linkUnfurlData: LinkUnfurlData;
}

export interface MediaData {
  hash: string;
}
export interface MediaNode extends OpaqueNodeMixin {
  readonly type: "MEDIA";
  readonly mediaData: MediaData;
}

export interface SectionNode
  extends ChildrenMixin,
    MinimalFillsMixin,
    OpaqueNodeMixin {
  readonly type: "SECTION";
}

export type BaseNode = DocumentNode | PageNode | SceneNode;

export type SceneNode =
  | SliceNode
  | FrameNode
  | GroupNode
  | ComponentSetNode
  | ComponentNode
  | InstanceNode
  | BooleanOperationNode
  | VectorNode
  | StarNode
  | LineNode
  | EllipseNode
  | PolygonNode
  | RectangleNode
  | TextNode
  | StickyNode
  | ConnectorNode
  | ShapeWithTextNode
  | CodeBlockNode
  | StampNode
  | WidgetNode
  | EmbedNode
  | LinkUnfurlNode
  | MediaNode
  | SectionNode
  | HighlightNode
  | WashiTapeNode;

export type NodeType = BaseNode["type"];

////////////////////////////////////////////////////////////////////////////////
// Styles
export type StyleType = "PAINT" | "TEXT" | "EFFECT" | "GRID";

export type InheritedStyleField =
  | "fillStyleId"
  | "strokeStyleId"
  | "backgroundStyleId"
  | "textStyleId"
  | "effectStyleId"
  | "gridStyleId"
  | "strokeStyleId";

export interface StyleConsumers {
  node: SceneNode;
  fields: InheritedStyleField[];
}

export interface BaseStyle extends PublishableMixin, PluginDataMixin {
  readonly id: string;
  readonly type: StyleType;
  // CONVERSION: excluding consumers because we don't need it
  // leaving in the interface for future reference
  // readonly consumers: StyleConsumers[];
  name: string;
}

export interface PaintStyle extends BaseStyle {
  type: "PAINT";
  paints: ReadonlyArray<Paint>;
}

export interface TextStyle extends BaseStyle {
  type: "TEXT";
  fontSize: number;
  textDecoration: TextDecoration;
  fontName: FontName;
  letterSpacing: LetterSpacing;
  lineHeight: LineHeight;
  paragraphIndent: number;
  paragraphSpacing: number;
  textCase: TextCase;
}

export interface EffectStyle extends BaseStyle {
  type: "EFFECT";
  effects: ReadonlyArray<Effect>;
}

export interface GridStyle extends BaseStyle {
  type: "GRID";
  layoutGrids: ReadonlyArray<LayoutGrid>;
}

////////////////////////////////////////////////////////////////////////////////
// Other

export interface Image {
  readonly hash: string;
  // TODO: bytes?
  //getBytesAsync(): Promise<Uint8Array>
  // TODO: Ensure we save the width and height
  readonly width: number;
  readonly height: number;
}

export interface Video {
  readonly hash: string;
}
