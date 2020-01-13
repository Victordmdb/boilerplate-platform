import { Pagination } from "../_helpers/pagination";
import { IUser } from "../user/type";
import { prop, getModelForClass, Ref, modelOptions } from '@typegoose/typegoose';
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

export interface IOrganisation extends TimeStamps, Base {}

@modelOptions({ options: { customName: 'Organisation' } })
export class IOrganisation {
    @prop({required : true, unique : true})
    public name!        : string;

    @prop({required : true})
    public email!       : string;

    @prop()
    public address     : string;

    @prop({ ref: "User", required : true })
    public createdBy! : Ref<IUser>;
};

export const IOrganisationModel = getModelForClass(IOrganisation, { schemaOptions: { timestamps: true, collection : "organisations" } });

export type OrganisationFilter = {
    _id : string;
    text : string;
    name : string;
} & Pagination;

export interface OrganisationInput {
    name        : string;
    email       : string;
    address     : string;
};