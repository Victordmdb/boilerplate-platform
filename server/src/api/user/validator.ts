import * as Joi from "@hapi/joi";

export const setupServerModel = Joi.object({
    email: Joi.string().email().trim().required(),
    organisation: Joi.string(),
    password: Joi.string().trim().required()
});

export const createUserModel = Joi.object({
    organisation: Joi.string().required(),
    email: Joi.string().email().trim().required(),
    firstname: Joi.string(),
    lastname: Joi.string(),
    password: Joi.string().trim().required(),
    roles: Joi.array().items(Joi.string()).required()
});

export const updateUserModel = Joi.object({
    _id: Joi.string(),
    email: Joi.string().email().trim(),
    firstname: Joi.string(),
    lastname: Joi.string(),
    password: Joi.string().trim(),
    roles: Joi.array().items(Joi.string())
});

export const loginUserModel = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().trim().required()
});

export const jwtValidator = Joi.object({
    authorization : Joi.string().required(),
}).unknown();