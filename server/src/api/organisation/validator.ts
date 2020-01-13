import * as Joi from "@hapi/joi";

import { Validate as Paginate } from "src/api/_helpers/pagination";

export const listOrganisationModel = Paginate.keys({
    _id: Joi.string().optional(),
    name: Joi.string().optional(),
    text: Joi.string().optional(),
});

export const createOrganisationModel = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required(),
    address: Joi.string().required(),
});

export const updateOrganisationModel = createOrganisationModel.keys({
    _id  : Joi.string(),
});