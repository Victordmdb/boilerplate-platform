import * as Joi from "@hapi/joi";

export const createAssetModel = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required()
});

export const updateAssetModel = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  completed: Joi.boolean()
});
