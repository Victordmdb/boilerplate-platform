import { PackedRule } from "@casl/ability/extra";
import { Action } from "react-fetching-library";
import { IOrganisation } from "scenes/Organisation/type";

export enum Role {
  ADMIN,
  OWNER,
  MANAGER,
  VERIFIER,
  ASSIGNER,
  SPECIALIST,
  REQUESTOR,
  SUPPORT
};

export const Roles = Object.keys(Role).filter(k => typeof Role[k as any] === "number");

export class IUser {
  readonly _id         : string | undefined = undefined;
  readonly email       : string = '';
  readonly organisation? : IOrganisation = undefined;
  readonly firstname   : string = '';
  readonly lastname    : string = '';
  readonly roles       : Array<keyof typeof Role> = [];
  readonly abilities   : Array<PackedRule> = [];
};

export type UserFilter = {
  _id   : string;
  email : string;
  name  : string;
}

export const UserData : Action = ({_id, email, name } : Partial<UserFilter>) => ({
  method: 'GET',
  endpoint: `/users?${_id?"_id="+_id:email?"email="+email:name?"name="+name:null}`
});

export type NewUser = {
  email           : string;
  firstname       : string;
  lastname        : string;
  password        : string;
  organisation    : string;
  roles           : Array<Role>;
};

export const CreateUser : Action = (body : NewUser) => ({
  method: 'PUT',
  endpoint: '/users',
  body
});

export type UpdatedUser = {
  _id             : string;
} & Partial<NewUser>;

export const UpdateUser : Action = (body : UpdatedUser) => ({
  method: 'POST',
  endpoint: '/users',
  body
});