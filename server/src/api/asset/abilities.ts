import { AbilityBuilderParts } from '@casl/ability';
import { IUser } from '../user/type';
import { DocumentType } from '@typegoose/typegoose';

export const getAbilities = ( user : DocumentType<IUser>, allow : AbilityBuilderParts["can"], forbid : AbilityBuilderParts["cannot"] ) => {
    if(user.isRoot()){
        allow ( "manage", "Asset" );
    } else if(user.hasRole("REQUESTOR")) {
        allow ( "crud", "Asset", { createdBy : user._id.toString() } );
    } else if(user.hasRole(["VERIFIER","ASSIGNER"])) {
        allow ( ["read","update"], "Asset", { organisation : user.organisation.toString() } );
    } else if(user.hasRole("SPECIALIST")) {
        allow ( ["read","update"], "Asset", { assignedTo : user._id.toString() } );
    } else if(user.hasRole("SUPPORT")) {
        allow ( ["read","update"], "Asset", { supportAgent : user._id.toString() } );
    } else {
        allow ( "read", "Asset", { asset : user.organisation.toString() } );
    }
    allow ( "read", "Asset", ["_id","name"]);
};

export default getAbilities;