import { RouteComponentProps } from "react-router";
import { OrganisationFunctions } from ".";


type RouteProps = {
    organisationName : string;
};

export type OwnProps = RouteComponentProps<RouteProps>

export type FormProps = ReturnType<typeof OrganisationFunctions> & OwnProps;

export type FormState = {
    _id?         : string;
    name        : string;
    email       : string;
    address     : string;
};