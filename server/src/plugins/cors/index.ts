import { IPlugin } from "plugins/interfaces";
import * as Hapi from "@hapi/hapi";
import { IDatabase } from "src/api/models";

const register = async (
  server: Hapi.Server,
  database: IDatabase
): Promise<void> => {
  try {
    return server.register({
      plugin: require('hapi-cors'),
      options: {
        origins: ['http://localhost:3000'],
        allowCredentials: 'true',
        methods: ['POST, GET, OPTIONS', 'PUT', 'DELETE'],
      }
    });
  } catch (err) {
    throw err;
  }
};


export default (): IPlugin => {
  return {
    register,
    info: () => {
      return { name: "Yar CORS", version: "1.0.0" };
    }
  };
};
