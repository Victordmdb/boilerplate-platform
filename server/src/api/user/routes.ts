import * as Hapi from "@hapi/hapi";
import UserController from "./controller";
import * as UserValidator from "./validator";
import { IDatabase } from "api/models";

export default function(
  server: Hapi.Server,
  database: IDatabase
) {
  const userController = new UserController(database);
  server.bind(userController);

  server.route([{
    method: "DELETE",
    path: "/users",
    options: {
      handler: userController.deleteUser,
      auth: "jwt",
      tags: ["api", "users"],
      description: "Delete current user.",
      validate: {
        headers: process.env.REQUIRES_AUTH && UserValidator.jwtValidator 
      },
      plugins: {
        "hapi-swagger": {
          responses: {
            "200": {
              description: "User deleted."
            },
            "401": {
              description: "User does not have authorization."
            }
          }
        }
      }
    }
  },{
    method: "PUT",
    path: "/users",
    options: {
      handler: userController.updateUser,
      auth: "jwt",
      tags: ["api", "users"],
      description: "Update current user info.",
      validate: {
        payload: UserValidator.updateUserModel,
        headers: process.env.REQUIRES_AUTH && UserValidator.jwtValidator 
      },
      plugins: {
        "hapi-swagger": {
          responses: {
            "200": {
              description: "Updated info."
            },
            "401": {
              description: "User does not have authorization."
            }
          }
        }
      }
    }
  },{
    method: "POST",
    path: "/users",
    options: {
      handler: userController.createUser,
      auth: false,
      tags: ["api", "users"],
      description: "Create a user.",
      validate: {
        payload: UserValidator.createUserModel
      },
      plugins: {
        "hapi-swagger": {
          responses: {
            "201": {
              description: "User created."
            }
          }
        }
      }
    }
  },{
    method: "POST",
    path: "/init",
    options: {
      handler: userController.createRoot,
      auth: false,
      tags: ["api", "init"],
      description: "Initialize server",
      validate: {
        payload: UserValidator.setupServerModel
      },
      plugins: {
        "hapi-swagger": {
          responses: {
            "201": {
              description: "User created."
            }
          }
        }
      }
    }
  },{
    method: "POST",
    path: "/users/login",
    options: {
      handler: userController.loginUser,
      auth: false,
      tags: ["api", "users"],
      description: "Login a user.",
      validate: {
        payload: UserValidator.loginUserModel
      },
      plugins: {
        "hapi-swagger": {
          responses: {
            "200": {
              description: "User logged in."
            }
          }
        }
      }
    }
  },{
    method: "GET",
    path: "/users/info",
    options: {
      handler: userController.infoUser,
      auth: "jwt",
      tags: ["api", "users"],
      description: "Get user info.",
      validate: {
        headers: process.env.REQUIRES_AUTH && UserValidator.jwtValidator 
      },
      plugins: {
        "hapi-swagger": {
          responses: {
            "200": {
              description: "User found."
            },
            "401": {
              description: "Please login."
            }
          }
        }
      }
    }
  },{
    method: "GET",
    path: "/users/refresh",
    options: {
      handler: userController.refreshToken,
      auth: "jwt",
      tags: ["api", "users"],
      description: "Refresh user token.",
      validate: {
        headers: process.env.REQUIRES_AUTH && UserValidator.jwtValidator 
      },
      plugins: {
        "hapi-swagger": {
          responses: {
            "200": {
              description: "User Token Refreshed."
            }
          }
        }
      }
    }
  }]);
}
