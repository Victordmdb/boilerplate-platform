import { AbilityBuilderParts } from '@casl/ability';
import { IUser } from './type';
import { DocumentType } from '@typegoose/typegoose';

export const getAbilities = ( user : DocumentType<IUser>, allow : AbilityBuilderParts["can"], forbid : AbilityBuilderParts["cannot"] ) => {
  if(user.isRoot()){
    allow ( "manage", "User" );
  } else if(user.hasRole(["ADMIN", "MANAGER", "SUPPORT"])) {
    allow ( ["crud"], "User", { organisation : user.organisation.toString() }  );
  } else {
    allow ( ["read","update"], "User", { _id : user._id.toString() } );
    allow ( "read", "User", { organisation : user.organisation.toString() } );
  }
  allow ( "read", "User", ["_id","name"]);
};

export default getAbilities;