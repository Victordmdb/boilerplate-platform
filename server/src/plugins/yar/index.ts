import { IPlugin } from "plugins/interfaces";
import * as Hapi from "@hapi/hapi";
import { IDatabase } from "src/api/models";
import ms from "ms";

const register = async (
  server: Hapi.Server,
  database: IDatabase
): Promise<void> => {
  try {
    return server.register({
        plugin: require('@hapi/yar'),
        options: {
            storeBlank: false,
            cookieOptions: {
                password: process.env.SECRET_PASSPHRASE,
                isSecure: process.env.NODE_ENV !== 'development',
                // cache : {
                //     expiresIn : ms(process.env.JWT_EXPIRY)
                // }
            }
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
      return { name: "Yar Session Management", version: "1.0.0" };
    }
  };
};
