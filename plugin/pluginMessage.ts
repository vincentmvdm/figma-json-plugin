import { DumpedFigma } from "../src/figmaJSON";

/// Messages UI code sends to Plugin

export interface ReadyMessage {
  type: "ready";
}

export interface InsertMessage {
  type: "insert";
  data: DumpedFigma;
}

export type UIToPluginMessage = ReadyMessage | InsertMessage;

/// Messages Plugin code sends to UI

export interface UpdateDumpMessage {
  type: "update";
  data: DumpedFigma;
}

export interface UpdateInsertTextMessage {
  type: "updateInsertText";
  recentInsertText: string;
}

export interface DidInsertMessage {
  type: "didInsert";
}

export type PluginToUIMessage =
  | UpdateDumpMessage
  | DidInsertMessage
  | UpdateInsertTextMessage;