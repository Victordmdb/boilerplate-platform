import { IPlugin } from "plugins/interfaces";
import * as Hapi from "@hapi/hapi";

const register = async (server: Hapi.Server): Promise<void> => {
  try {
    return server.register([
      require("inert"),
      require("vision"),
      {
        plugin: require("hapi-swagger"),
        options: {
          info: {
            title: "Asset Api",
            description: "Asset Api Documentation",
            version: "1.0"
          },
          tags: [
            {
              name: "assets",
              description: "Api assets interface."
            },
            {
              name: "users",
              description: "Api users interface."
            }
          ],
          swaggerUI: true,
          documentationPage: true,
          documentationPath: "/docs"
        }
      }
    ]);
  } catch (err) {
    console.error(`Error registering swagger plugin: ${err}`);
  }
};

export default (): IPlugin => {
  return {
    register,
    info: () => {
      return { name: "Swagger Documentation", version: "1.0.0" };
    }
  };
};
