import { IOrganisation } from "api/organisation/type";
import { PackedRule } from "@casl/ability/extra";
import { pre, prop, arrayProp, getModelForClass, Ref, DocumentType, plugin, modelOptions } from '@typegoose/typegoose';
import * as Bcrypt from "bcryptjs";

import { AbilityBuilder } from "@casl/ability";
import { getAbilities } from "api/abilities";
import { packRules } from '@casl/ability/extra';
import { TimeStamps, Base } from "@typegoose/typegoose/lib/defaultClasses";
import { accessibleRecordsPlugin } from "@casl/mongoose";

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

function hashPassword(password: string): string {
    if (!password) return null;  
    return Bcrypt.hashSync(password, Bcrypt.genSaltSync(10));
};


export interface IUser extends TimeStamps, Base {};

@pre<IUser>("save", function(next) {
    
    if (!this.isModified("password")) {
        return next();
    }
    
    this.password = hashPassword(this.password);
    
    return next();
})
@pre<IUser>("findOneAndUpdate", function() {
    const password = hashPassword(this.getUpdate().$set.password);
    
    if (!password) {
        return;
    }
    
    this.findOneAndUpdate({}, { password: password });
})
@plugin(accessibleRecordsPlugin)
@modelOptions({ options: { customName: 'User' } })
export class IUser {
    @prop()
    public __ROOT__?  : boolean;

    @prop({ required: true })
    public firstname! : string;

    @prop({ required: true })
    public lastname!  : string;

    @prop({ required: true, unique : true })
    public email!     : string;

    @prop({ required: true })
    public password!  : string;

    @prop({ ref: IOrganisation, required : true })
    public organisation! : Ref<IOrganisation>;

    @arrayProp({ type : String, enum : Object.keys(Role).filter(k => typeof Role[k as any] === "number")})
    public roles     : Array<keyof typeof Role>;

    public validatePassword(this: DocumentType<IUser>, requestPassword: string ) {
        return Bcrypt.compareSync(requestPassword, this.password);
    };

    public hasRole(this: DocumentType<IUser>, role : keyof typeof Role | Array<keyof typeof Role>) {
        if(typeof role === "string"){
          return (this as IUser).roles.indexOf(role) > -1;
        } else if (role.length > 1){
          return role.some(r =>(this as IUser).roles.indexOf(r) > -1);
        }
    };

    public isRoot(this: DocumentType<IUser>) {
        return (this as IUser).__ROOT__;
    };

    public getSession(this: DocumentType<IUser>) {
        const session = {
          _id       : this._id.toString(),
          firstname : this.firstname,
          lastname  : this.lastname,
          email     : this.email,
          roles     : this.roles,
        } as UserSession;
      
        //Initialise user abilities and store in session
        const { rules, can, cannot } = AbilityBuilder.extract();
        getAbilities.forEach(getAbility=>getAbility(this, can, cannot));
        session.abilities = packRules(rules);
      
        return session;
    }      
};




export const IUserModel = getModelForClass(IUser, { schemaOptions: { timestamps: true, collection : "users" } });

export type UserSession = {
    _id       : string;
    email     : string;
    firstname : string;
    lastname  : string;
    roles     : Array<keyof typeof Role>;
    abilities : Array<PackedRule>;
};


export type SetupServer = {
    email     : string;
    organisation : string;
    password  : string;
};

export type NewUser = {
    email           : string;
    organisation    : string;
    firstname       : string;
    lastname        : string;
    password        : string;
    roles           : Array<Role>;
};
  
export type UpdateUser = {
    _id       : string;
    email?    : string;
    firstname?: string;
    lastname? : string;
    password? : string;
    roles?     : Array<Role>;
  };
