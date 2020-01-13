import { Role } from "../type";
import { IOrganisation } from "scenes/Organisation/type";
import { RouteComponentProps } from "react-router";
import { UserFunctions } from ".";


type RouteProps = {
    userId : string;
};

export type OwnProps = RouteComponentProps<RouteProps>

export type FormProps = ReturnType<typeof UserFunctions> & OwnProps;

export type FormState = {
    _id?         : string;
    email       : string;
    firstname   : string;
    lastname    : string;
    organisation : Partial<IOrganisation>;
    roles       : Array<keyof typeof Role>;
};