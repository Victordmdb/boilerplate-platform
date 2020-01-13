import { createContext } from 'react';
import { createContextualCan } from '@casl/react';

import {clone} from "lodash";
 
export const AbilityContext = createContext({});
export const Can = createContextualCan(AbilityContext.Consumer);

export const MapFields = (document : any) => {
    const newDoc = clone(document);
    if(newDoc.ownedBy) newDoc.ownedBy =  newDoc.ownedBy._id;
    if(newDoc.createdBy) newDoc.createdBy =  newDoc.createdBy._id;
    return newDoc;
};