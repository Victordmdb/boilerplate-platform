import { IPlugin } from "plugins/interfaces";
import * as Hapi from "@hapi/hapi";
import { IDatabase } from "src/api/models";
import AuthJW2 from "hapi-auth-jwt2";

const register = async (
  server: Hapi.Server,
  database: IDatabase
): Promise<void> => {
  try {

    // const validateUser = ( decoded: any, h: Hapi.ResponseToolkit) => ({ isValid : database.User.exists({_id:decoded.id }) });    
    const validateUser = async ( decoded: any, h: Hapi.ResponseToolkit) =>{
      const isValid = await database.User.exists({_id:decoded.id });
      return { isValid };    
    }

    await server.register(AuthJW2);

    server.auth.strategy("jwt", "jwt", {
      key: process.env.SECRET_PASSPHRASE,
      validate : validateUser,
      verifyOptions: {
        algorithms: ["HS256"]
      }
    });
    
    server.auth.default("jwt");
  } catch (err) {
    throw err;
  }
};


export default (): IPlugin => {
  return {
    register,
    info: () => {
      return { name: "JWT Authentication", version: "1.0.0" };
    }
  };
};
