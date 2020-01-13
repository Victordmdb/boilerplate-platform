import { prop, getModelForClass, Ref, arrayProp, modelOptions } from '@typegoose/typegoose';
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { IUser } from "../user/type";
import { IOrganisation } from '../organisation/type';

export interface IRevision extends TimeStamps, Base {};

export class IRevision {
    assetId        : string;
};

enum State {
    PENDING_ACCESSION,
    PENDING_TRIAGE,    
    PENDING_DIAGNOSIS,    
    PENDING_REQUISITION
};

export interface IReport extends TimeStamps, Base {};

@modelOptions({ options: { customName: 'Report' } })
export class IReport {
    description   : string;
};

export interface IAsset extends TimeStamps, Base {}

@modelOptions({ options: { customName: 'Asset' } })
export class IAsset {
    @prop({ unique : true, required : true })
    public assetId        : string;

    @prop({ ref: "Organisation", required : true })
    public organisation! : Ref<IOrganisation>;

    @prop({ ref: "User", required : true })
    public createdBy! : Ref<IUser>;

    @prop({ ref: "User" })
    public verifiedBy : Ref<IUser>;

    @prop({ ref: "User" })
    public assignedBy : Ref<IUser>;

    @prop({ ref: "User" })
    public assignedTo : Ref<IUser>;

    //Array of specialists invited by the assigned specialist
    @arrayProp({ itemsRef: "User" })
    public invitedView : Array<Ref<IUser>>;

    @prop({ ref: IReport })
    public report : Ref<IReport>;

    //Revisions are save as subdocuments, not in a separate collection
    @arrayProp({ _id: false, itemsRef: IRevision })
    public revisions : Array<IRevision>;

    @prop({ 
        type : String,
        enum : Object.keys(State).filter(k => typeof State[k as any] === "number"),
        default: State[State.PENDING_REQUISITION]
    })
    public state     : keyof typeof State;

    @prop({ ref: "User" })
    public supportAgent : Ref<IUser>;
};

export const IAssetModel = getModelForClass(IAsset, { schemaOptions: { timestamps: true, collection : "assets" } });

