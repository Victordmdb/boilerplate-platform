import * as Hapi from "@hapi/hapi";
import OrganisationController from "./controller";
import * as OrganisationValidator from "./validator";
import * as UserValidator from "api/user/validator";
import { IDatabase } from "api/models";
import Joi = require("@hapi/joi");

export default function(
  server: Hapi.Server,
  database: IDatabase
) {
  const organisationController = new OrganisationController(database);
  server.bind(organisationController);

  server.route([{
    method: "GET",
    path: "/organisations/{name}",
    options: {
      handler: organisationController.getOrganisationByName,
      auth: "jwt",
      tags: ["api", "organisations"],
      description: "Get organisation by name.",
      validate: {
        params: Joi.object({
          name: Joi.string().required()
        }),
        headers: process.env.REQUIRES_AUTH && UserValidator.jwtValidator 
      },
      plugins: {
        "hapi-swagger": {
          responses: {
            "200": {
              description: "Asset founded."
            },
            "404": {
              description: "Asset does not exists."
            }
          }
        }
      }
    }
  },{
    method: "GET",
    path: "/organisations",
    options: {
      handler: organisationController.getOrganisations,
      auth: "jwt",
      tags: ["api", "organisations"],
      description: "Get organisation info.",
      validate: {
        headers: process.env.REQUIRES_AUTH && UserValidator.jwtValidator ,
        query: OrganisationValidator.listOrganisationModel
      },
      plugins: {
        "hapi-swagger": {
          responses: {
            "200": {
              description: "Organisation founded."
            },
            "401": {
              description: "Please login."
            }
          }
        }
      }
    }
  },{
    method: "DELETE",
    path: "/organisations/{id}",
    options: {
      handler: organisationController.deleteOrganisation,
      auth: "jwt",
      tags: ["api", "organisations"],
      description: "Delete organisation.",
      validate: {
        headers: process.env.REQUIRES_AUTH && UserValidator.jwtValidator ,
        params: Joi.object({
          id: Joi.string().required()
        })        
      },
      plugins: {
        "hapi-swagger": {
          responses: {
            "200": {
              description: "Organisation deleted."
            },
            "401": {
              description: "Organisation does not have authorization."
            }
          }
        }
      }
    }
  },{
    method: "PUT",
    path: "/organisations/{id}",
    options: {
      handler: organisationController.updateOrganisation,
      auth: "jwt",
      tags: ["api", "organisations"],
      description: "Update current organisation info.",
      validate: {
        params: Joi.object({
          id: Joi.string().required()
        }),
        payload: OrganisationValidator.updateOrganisationModel,
        headers: process.env.REQUIRES_AUTH && UserValidator.jwtValidator 
      },
      plugins: {
        "hapi-swagger": {
          responses: {
            "200": {
              description: "Updated info."
            },
            "401": {
              description: "Organisation does not have authorization."
            }
          }
        }
      }
    }
  },{
    method: "POST",
    path: "/organisations",
    options: {
      handler: organisationController.createOrganisation,
      auth: "jwt",
      tags: ["api", "organisations"],
      description: "Create an organisation.",
      validate: {
        payload: OrganisationValidator.createOrganisationModel
      },
      plugins: {
        "hapi-swagger": {
          responses: {
            "201": {
              description: "Organisation created."
            }
          }
        }
      }
    }
  }]);
}
