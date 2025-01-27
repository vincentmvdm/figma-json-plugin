import * as F from "./figma-json";

// Defaults that non-Figma environments like tests/APIs can use to create figma-json.
// Update by clicking the plugin's "Log defaults" button and copying the output.
const defaultLayers: {
  RECTANGLE: F.RectangleNode;
  LINE: F.LineNode;
  ELLIPSE: F.EllipseNode;
  POLYGON: F.PolygonNode;
  STAR: F.StarNode;
  VECTOR: F.VectorNode;
  TEXT: F.TextNode;
  FRAME: F.FrameNode;
  PAGE: F.PageNode;
} = {
  RECTANGLE: {
    id: "_",
    name: "Rectangle",
    visible: true,
    locked: false,
    componentPropertyReferences: null,
    opacity: 1,
    blendMode: "PASS_THROUGH",
    isMask: false,
    effects: [],
    effectStyleId: "",
    fills: [
      {
        type: "SOLID",
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        color: {
          r: 0.8509804010391235,
          g: 0.8509804010391235,
          b: 0.8509804010391235
        }
      }
    ],
    fillStyleId: "",
    strokes: [],
    strokeStyleId: "",
    strokeWeight: 1,
    strokeAlign: "INSIDE",
    strokeJoin: "MITER",
    dashPattern: [],
    strokeCap: "NONE",
    strokeMiterLimit: 4,
    fillGeometry: [
      {
        windingRule: "NONZERO",
        data: "M0 0L100 0L100 100L0 100L0 0Z"
      }
    ],
    strokeGeometry: [],
    relativeTransform: [
      [1, 0, 0],
      [0, 1, 0]
    ],
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    rotation: 0,
    layoutAlign: "INHERIT",
    constrainProportions: false,
    layoutGrow: 0,
    layoutPositioning: "AUTO",
    exportSettings: [],
    constraints: {
      horizontal: "MIN",
      vertical: "MIN"
    },
    cornerRadius: 0,
    cornerSmoothing: 0,
    topLeftRadius: 0,
    topRightRadius: 0,
    bottomLeftRadius: 0,
    bottomRightRadius: 0,
    reactions: [],
    strokeTopWeight: 1,
    strokeBottomWeight: 1,
    strokeLeftWeight: 1,
    strokeRightWeight: 1,
    type: "RECTANGLE"
  },
  LINE: {
    id: "_",
    name: "Line",
    visible: true,
    locked: false,
    componentPropertyReferences: null,
    opacity: 1,
    blendMode: "PASS_THROUGH",
    isMask: false,
    effects: [],
    effectStyleId: "",
    fills: [],
    fillStyleId: "",
    strokes: [
      {
        type: "SOLID",
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        color: {
          r: 0,
          g: 0,
          b: 0
        }
      }
    ],
    strokeStyleId: "",
    strokeWeight: 1,
    strokeAlign: "CENTER",
    strokeJoin: "MITER",
    dashPattern: [],
    strokeCap: "NONE",
    strokeMiterLimit: 4,
    fillGeometry: [],
    strokeGeometry: [
      {
        windingRule: "NONZERO",
        data: "M0 0L100 0L100 -1L0 -1L0 0Z"
      }
    ],
    relativeTransform: [
      [1, 0, 0],
      [0, 1, 0]
    ],
    x: 0,
    y: 0,
    width: 100,
    height: 0,
    rotation: 0,
    layoutAlign: "INHERIT",
    constrainProportions: false,
    layoutGrow: 0,
    layoutPositioning: "AUTO",
    exportSettings: [],
    constraints: {
      horizontal: "MIN",
      vertical: "MIN"
    },
    reactions: [],
    type: "LINE"
  },
  ELLIPSE: {
    id: "_",
    name: "Ellipse",
    visible: true,
    locked: false,
    componentPropertyReferences: null,
    opacity: 1,
    blendMode: "PASS_THROUGH",
    isMask: false,
    effects: [],
    effectStyleId: "",
    fills: [
      {
        type: "SOLID",
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        color: {
          r: 0.8509804010391235,
          g: 0.8509804010391235,
          b: 0.8509804010391235
        }
      }
    ],
    fillStyleId: "",
    strokes: [],
    strokeStyleId: "",
    strokeWeight: 1,
    strokeAlign: "INSIDE",
    strokeJoin: "MITER",
    dashPattern: [],
    strokeCap: "NONE",
    strokeMiterLimit: 4,
    fillGeometry: [
      {
        windingRule: "NONZERO",
        data: "M100 50C100 77.6142 77.6142 100 50 100C22.3858 100 0 77.6142 0 50C0 22.3858 22.3858 0 50 0C77.6142 0 100 22.3858 100 50Z"
      }
    ],
    strokeGeometry: [],
    relativeTransform: [
      [1, 0, 0],
      [0, 1, 0]
    ],
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    rotation: 0,
    layoutAlign: "INHERIT",
    constrainProportions: false,
    layoutGrow: 0,
    layoutPositioning: "AUTO",
    exportSettings: [],
    constraints: {
      horizontal: "MIN",
      vertical: "MIN"
    },
    cornerRadius: 0,
    cornerSmoothing: 0,
    arcData: {
      startingAngle: 0,
      endingAngle: 6.2831854820251465,
      innerRadius: 0
    },
    reactions: [],
    type: "ELLIPSE"
  },
  POLYGON: {
    id: "_",
    name: "Polygon",
    visible: true,
    locked: false,
    componentPropertyReferences: null,
    opacity: 1,
    blendMode: "PASS_THROUGH",
    isMask: false,
    effects: [],
    effectStyleId: "",
    fills: [
      {
        type: "SOLID",
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        color: {
          r: 0.8509804010391235,
          g: 0.8509804010391235,
          b: 0.8509804010391235
        }
      }
    ],
    fillStyleId: "",
    strokes: [],
    strokeStyleId: "",
    strokeWeight: 1,
    strokeAlign: "INSIDE",
    strokeJoin: "MITER",
    dashPattern: [],
    strokeCap: "NONE",
    strokeMiterLimit: 4,
    fillGeometry: [
      {
        windingRule: "NONZERO",
        data: "M50 0L93.3013 75L6.69873 75L50 0Z"
      }
    ],
    strokeGeometry: [],
    relativeTransform: [
      [1, 0, 0],
      [0, 1, 0]
    ],
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    rotation: 0,
    layoutAlign: "INHERIT",
    constrainProportions: false,
    layoutGrow: 0,
    layoutPositioning: "AUTO",
    exportSettings: [],
    constraints: {
      horizontal: "MIN",
      vertical: "MIN"
    },
    cornerRadius: 0,
    cornerSmoothing: 0,
    pointCount: 3,
    reactions: [],
    type: "POLYGON"
  },
  STAR: {
    id: "_",
    name: "Star",
    visible: true,
    locked: false,
    componentPropertyReferences: null,
    opacity: 1,
    blendMode: "PASS_THROUGH",
    isMask: false,
    effects: [],
    effectStyleId: "",
    fills: [
      {
        type: "SOLID",
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        color: {
          r: 0.8509804010391235,
          g: 0.8509804010391235,
          b: 0.8509804010391235
        }
      }
    ],
    fillStyleId: "",
    strokes: [],
    strokeStyleId: "",
    strokeWeight: 1,
    strokeAlign: "INSIDE",
    strokeJoin: "MITER",
    dashPattern: [],
    strokeCap: "NONE",
    strokeMiterLimit: 4,
    fillGeometry: [
      {
        windingRule: "NONZERO",
        data: "M50 0L61.2257 34.5491L97.5528 34.5491L68.1636 55.9017L79.3893 90.4509L50 69.0983L20.6107 90.4509L31.8364 55.9017L2.44717 34.5491L38.7743 34.5491L50 0Z"
      }
    ],
    strokeGeometry: [],
    relativeTransform: [
      [1, 0, 0],
      [0, 1, 0]
    ],
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    rotation: 0,
    layoutAlign: "INHERIT",
    constrainProportions: false,
    layoutGrow: 0,
    layoutPositioning: "AUTO",
    exportSettings: [],
    constraints: {
      horizontal: "MIN",
      vertical: "MIN"
    },
    cornerRadius: 0,
    cornerSmoothing: 0,
    pointCount: 5,
    innerRadius: 0.3819660246372223,
    reactions: [],
    type: "STAR"
  },
  VECTOR: {
    id: "_",
    name: "Vector",
    visible: true,
    locked: false,
    componentPropertyReferences: null,
    opacity: 1,
    blendMode: "PASS_THROUGH",
    isMask: false,
    effects: [],
    effectStyleId: "",
    fills: [],
    fillStyleId: "",
    strokes: [
      {
        type: "SOLID",
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        color: {
          r: 0,
          g: 0,
          b: 0
        }
      }
    ],
    strokeStyleId: "",
    strokeWeight: 1,
    strokeAlign: "CENTER",
    strokeJoin: "MITER",
    dashPattern: [],
    strokeCap: "NONE",
    strokeMiterLimit: 4,
    fillGeometry: [],
    strokeGeometry: [],
    relativeTransform: [
      [1, 0, 0],
      [0, 1, 0]
    ],
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    rotation: 0,
    layoutAlign: "INHERIT",
    constrainProportions: false,
    layoutGrow: 0,
    layoutPositioning: "AUTO",
    exportSettings: [],
    constraints: {
      horizontal: "MIN",
      vertical: "MIN"
    },
    cornerRadius: 0,
    cornerSmoothing: 0,
    vectorPaths: [],
    handleMirroring: "NONE",
    reactions: [],
    type: "VECTOR"
  },
  TEXT: {
    id: "_",
    name: "Text",
    visible: true,
    locked: false,
    componentPropertyReferences: null,
    opacity: 1,
    blendMode: "PASS_THROUGH",
    isMask: false,
    effects: [],
    effectStyleId: "",
    fills: [
      {
        type: "SOLID",
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        color: {
          r: 0,
          g: 0,
          b: 0
        }
      }
    ],
    fillStyleId: "",
    strokes: [],
    strokeStyleId: "",
    strokeWeight: 1,
    strokeAlign: "OUTSIDE",
    strokeJoin: "MITER",
    dashPattern: [],
    strokeCap: "NONE",
    strokeMiterLimit: 4,
    fillGeometry: [],
    strokeGeometry: [],
    relativeTransform: [
      [1, 0, 0],
      [0, 1, 0]
    ],
    x: 0,
    y: 0,
    width: 0,
    height: 15,
    rotation: 0,
    layoutAlign: "INHERIT",
    constrainProportions: false,
    layoutGrow: 0,
    layoutPositioning: "AUTO",
    exportSettings: [],
    constraints: {
      horizontal: "MIN",
      vertical: "MIN"
    },
    characters: "",
    fontSize: 12,
    paragraphIndent: 0,
    paragraphSpacing: 0,
    textCase: "ORIGINAL",
    textDecoration: "NONE",
    letterSpacing: {
      unit: "PERCENT",
      value: 0
    },
    lineHeight: {
      unit: "AUTO"
    },
    fontName: {
      family: "Inter",
      style: "Regular"
    },
    fontWeight: 400,
    hyperlink: null,
    autoRename: true,
    textAlignHorizontal: "LEFT",
    textAlignVertical: "TOP",
    textAutoResize: "WIDTH_AND_HEIGHT",
    textStyleId: "",
    reactions: [],
    type: "TEXT"
  },
  FRAME: {
    id: "_",
    name: "Frame",
    visible: true,
    locked: false,
    componentPropertyReferences: null,
    opacity: 1,
    blendMode: "PASS_THROUGH",
    isMask: false,
    effects: [],
    effectStyleId: "",
    relativeTransform: [
      [1, 0, 0],
      [0, 1, 0]
    ],
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    rotation: 0,
    layoutAlign: "INHERIT",
    constrainProportions: false,
    layoutGrow: 0,
    layoutPositioning: "AUTO",
    children: [],
    exportSettings: [],
    fills: [
      {
        type: "SOLID",
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        color: {
          r: 1,
          g: 1,
          b: 1
        }
      }
    ],
    fillStyleId: "",
    strokes: [],
    strokeStyleId: "",
    strokeWeight: 1,
    strokeAlign: "INSIDE",
    strokeJoin: "MITER",
    dashPattern: [],
    strokeCap: "NONE",
    strokeMiterLimit: 4,
    fillGeometry: [
      {
        windingRule: "NONZERO",
        data: "M0 0L100 0L100 100L0 100L0 0Z"
      }
    ],
    strokeGeometry: [],
    cornerRadius: 0,
    cornerSmoothing: 0,
    topLeftRadius: 0,
    topRightRadius: 0,
    bottomLeftRadius: 0,
    bottomRightRadius: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    primaryAxisAlignItems: "MIN",
    counterAxisAlignItems: "MIN",
    primaryAxisSizingMode: "AUTO",
    strokeTopWeight: 1,
    strokeBottomWeight: 1,
    strokeLeftWeight: 1,
    strokeRightWeight: 1,
    layoutGrids: [],
    gridStyleId: "",
    backgrounds: [
      {
        type: "SOLID",
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        color: {
          r: 1,
          g: 1,
          b: 1
        }
      }
    ],
    backgroundStyleId: "",
    clipsContent: true,
    guides: [],
    expanded: true,
    constraints: {
      horizontal: "MIN",
      vertical: "MIN"
    },
    layoutMode: "NONE",
    counterAxisSizingMode: "FIXED",
    itemSpacing: 0,
    overflowDirection: "NONE",
    numberOfFixedChildren: 0,
    overlayPositionType: "CENTER",
    overlayBackground: {
      type: "NONE"
    },
    overlayBackgroundInteraction: "NONE",
    itemReverseZIndex: false,
    strokesIncludedInLayout: false,
    reactions: [],
    type: "FRAME"
  },
  PAGE: {
    id: "_",
    name: "Page",
    children: [],
    guides: [],
    selection: [],
    selectedTextRange: null,
    backgrounds: [
      {
        type: "SOLID",
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        color: {
          r: 0.9624999761581421,
          g: 0.9624999761581421,
          b: 0.9624999761581421
        }
      }
    ],
    exportSettings: [],
    prototypeStartNode: null,
    flowStartingPoints: [],
    prototypeBackgrounds: [
      {
        type: "SOLID",
        visible: true,
        opacity: 0,
        blendMode: "NORMAL",
        color: {
          r: 0,
          g: 0,
          b: 0
        }
      }
    ],
    type: "PAGE"
  }
};

export default defaultLayers;
