import * as Hapi from "@hapi/hapi";
import { Yar } from "@hapi/yar";
// import { PackedRule } from '@casl/ability/extra';

export interface ICredentials extends Hapi.AuthCredentials {
    id: string;
    // abilities : Array<PackedRule>;
}
  
export interface IRequestAuth extends Hapi.RequestAuth {
    credentials: ICredentials;
}

export interface IRequest extends Hapi.Request {
    auth: IRequestAuth;
    yar : Yar;
};