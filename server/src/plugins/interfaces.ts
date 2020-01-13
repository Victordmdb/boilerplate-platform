import * as Hapi from "@hapi/hapi";
import { IDatabase } from "api/models";

export interface IPlugin {
  register(server: Hapi.Server, database?: IDatabase): Promise<void>;
  info(): IPluginInfo;
}

export interface IPluginInfo {
  name: string;
  version: string;
}
