import Joi = require("@hapi/joi");

export type Pagination = {
    top     : string;
    skip    : string;
};

export const Validate = Joi.object().keys({
    top: Joi.number().default(5),
    skip: Joi.number().default(0)
});