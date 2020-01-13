import * as Hapi from "@hapi/hapi";
import { badImplementation, unauthorized } from "@hapi/boom";
import * as Jwt from "jsonwebtoken";
import { IUser, NewUser, UpdateUser, SetupServer } from "./type";
import { IDatabase } from "api/models";
import { IRequest } from "src/api/_helpers/request";

import { Ability } from "@casl/ability";
import { unpackRules } from '@casl/ability/extra';

import ms from "ms";
import { IOrganisation } from "../organisation/type";
import { MongoError } from "mongodb";

import * as Bcrypt from "bcryptjs";
import { DocumentType } from "@typegoose/typegoose";

export interface ISetupRequest extends IRequest {
  payload : SetupServer;
};

export interface ICreateRequest extends IRequest {
  payload : NewUser;
};

export interface ILoginRequest extends IRequest {
  payload : UpdateUser;
};

export const parseUserAbilities = ( request : IRequest ) => {
  const abilities = request.yar.get("abilities");
  if(!abilities) return null;
  return new Ability(unpackRules(JSON.parse(abilities)));
};

export default class UserController {
  private database: IDatabase;

  constructor( database: IDatabase ) {
    this.database = database;
    if(!process.env.SECRET_PASSPHRASE) throw "JWT Secret not set";
  };

  private generateToken(user: IUser) {
    const jwtSecret = process.env.SECRET_PASSPHRASE;
    const jwtExpiration = process.env.JWT_EXPIRY;

    const payload = { id  : user._id };

    const newDate = new Date(new Date().getTime() + ms(jwtExpiration));

    return {
      token : Jwt.sign(payload, jwtSecret, { expiresIn: jwtExpiration }),
      expiresAt : newDate
    };
  };

  public async loginUser(request: ILoginRequest, h: Hapi.ResponseToolkit) {
    try{
      const { email, password } = request.payload;
  
      let user: DocumentType<IUser> = await this.database.User.findOne({ email: email });
  
      if (!user) {
        return unauthorized("User does not exists.");
      }
  
      if (!user.validatePassword(password)) {
        return unauthorized("Password is invalid.");
      };      

      //Initialise JWT2 Token
      const { token, expiresAt } = this.generateToken(user);
      
      const userSession = user.getSession();
      request.yar.set("abilities", JSON.stringify(userSession.abilities));

      const ttl = expiresAt.getTime() - new Date().getTime();
      h.state('authToken', token, { ttl, isHttpOnly: false, isSecure : false, isSameSite : "Lax", path : "/" } );

      return h.response(userSession).code(201);

    } catch (e){
      return badImplementation(e);
    }
  }

  public async createUser(request: ICreateRequest, h: Hapi.ResponseToolkit) {
    try {
      const abilities = parseUserAbilities(request);
      abilities.throwUnlessCan('create', "User");
  
      // const { email, firstname, lastname, organisation } = request.payload;

      let newUser = request.payload;

      let user: any = await this.database.User.create(newUser);
      return h.response(this.generateToken(user)).code(201);
    } catch (error) {
      return badImplementation(error);
    }
  }

  public async createRoot(request: ISetupRequest, h: Hapi.ResponseToolkit) {
    try {
      const rootUserCount = await this.database.User.countDocuments({__ROOT__: true});
      if(rootUserCount) return h.response().code(401);

      const { email, organisation : orgName, password } = request.payload;
      const firstname = "Super";
      const lastname = "Admin";

      const newOrg = {
        email,
        name : orgName,
      } as IOrganisation;

      const organisation = await this.database.Organisation.collection.insertOne(newOrg).then(r=>r.ops[0] as IOrganisation) ;
      
      const newUser = {
        email,
        firstname,
        lastname,
        password : Bcrypt.hashSync(password, Bcrypt.genSaltSync(10)),
        organisation : organisation._id,
        __ROOT__ : true
      } as IUser;

      let user: any = await this.database.User.collection.insertOne(newUser).then(r=>r.ops[0] as IUser);

      return h.response({ user }).code(201);
    } catch (error) {
      return badImplementation((error as Error).message ? error.message: (error as MongoError).errmsg ? error.errmsg : error);
    }
  }

  public async updateUser(request: IRequest, h: Hapi.ResponseToolkit) {
    const _id = request.auth.credentials.id;
    const abilities = parseUserAbilities(request);

    abilities.throwUnlessCan('update', "User");

    try {
      return this.database.User.accessibleBy(abilities).findOneAndUpdate(
        { _id },
        { $set: request.payload },
        { new: true }
      );
    } catch (error) {
      return badImplementation(error);
    }
  }

  public async deleteUser(request: IRequest, h: Hapi.ResponseToolkit) {
    const _id = request.auth.credentials.id;
    const abilities = parseUserAbilities(request);
    abilities.throwUnlessCan('remove', "User");

    let user: IUser = await this.database.User.accessibleBy(abilities).findOneAndRemove({_id});

    return user;
  }

  public async infoUser(request: IRequest, h: Hapi.ResponseToolkit) {

    const _id = request.auth.credentials.id;
    if(!_id) return h.response().code(401);

    const abilities = parseUserAbilities(request);
    if(!abilities) return h.response().code(401);

    let user: DocumentType<IUser> = await this.database.User.findOne({_id});

    if(!user) return h.response().code(401);

    return user.getSession();
  }

  public async refreshToken(request: IRequest, h: Hapi.ResponseToolkit) {
    const _id = request.auth.credentials.id;

    let user: DocumentType<IUser> = await this.database.User.findOne({_id});
    if(!user) return h.response().code(401);
    
    const abilities = parseUserAbilities(request);
    if(!abilities){
      request.yar.set("abilities", JSON.stringify(user.getSession().abilities));
    };

    return this.generateToken(user);
  }
}
