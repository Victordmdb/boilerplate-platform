import { AbilityBuilderParts } from '@casl/ability';
import { IUser } from '../user/type';
import { DocumentType } from '@typegoose/typegoose';

export const getAbilities = ( user : DocumentType<IUser>, allow : AbilityBuilderParts["can"], forbid : AbilityBuilderParts["cannot"] ) => {
  if(user.isRoot()){
    allow ( "manage", "Organisation" );
  } else if(user.hasRole(["ADMIN", "MANAGER"])) {
    allow ( ["read","update"], "Organisation", { organisation : user.organisation.toString() }  );
  } else {
    allow ( "read", "Organisation", { organisation : user.organisation.toString() } );
  }
  allow ( "read", "Organisation", ["_id","name"]);
};

export default getAbilities;