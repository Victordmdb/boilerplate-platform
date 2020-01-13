import { Action } from "react-fetching-library";

export class IOrganisation {
    _id         : string | undefined = "";
    name        : string = "";
    email       : string = "";
    address     : string = "";
    createdAt   : Date = new Date();
    updateAt    : Date = new Date();
};

export type OrganisationFilter = {
    _id : string;
    text : string;
    name : string;
}

export const OrganisationData : (filter : Partial<OrganisationFilter>) => Action = ({_id, text, name})=>({
    method: 'GET',
    endpoint: `/organisations${text?"?text="+text:_id?"?_id="+_id:name?"/"+name:""}`
});

export interface NewOrganisation {
    name        : string;
    email       : string;
    address     : string;
};

export const CreateOrganisation : Action = (body : NewOrganisation) => ({
    method: 'POST',
    endpoint: '/organisations',
    body
  });
  

export interface UpdatedOrganisation {
    _id         : string
    name?        : string;
    email?       : string;
    address?     : string;
};

export const UpdateOrganisation : Action = (_id : string) => ( body : UpdatedOrganisation ) => ({
    method: 'PUT',
    endpoint: `/organisations/${_id}`,
    body
  });