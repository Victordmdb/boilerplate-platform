import { combineReducers } from "redux";
import { createReducer, ActionType } from 'typesafe-actions';

import * as Actions from "./actions";
import * as GeneralActions from "modules/general/actions";

import { IUser } from "scenes/User/type";
import { AuthError } from "./types";
import { initServer } from "modules/general/actions";

const {
    userSignIn,
    userSignOut,
    refreshToken,
    setInitRoute
} = Actions;

export interface State {
  message       : string;
  authenticated : boolean;
  forgotPassword: boolean;
  error         : AuthError | null;
  user          : IUser | null;
  initRoute     : string;
};
  
  // Reducer
export const InitialState : State = {
    message       : '',
    authenticated : false,
    forgotPassword: false,
    error         : null,
    user          : null,
    initRoute     : ""
};

const messageReducer = createReducer<State["message"], ActionType<typeof Actions>>(InitialState.message as string)
  .handleAction( userSignIn.success, () => InitialState.message )
  .handleAction( userSignOut.success, () => InitialState.message );

const errorReducer = createReducer<State["error"], ActionType<typeof Actions>>(InitialState.error as AuthError)
  .handleAction( userSignIn.request, () => InitialState.error )
  .handleAction( userSignIn.success, () => InitialState.error )
  .handleAction( userSignIn.failure, (_, action) => action.payload )
  // .handleAction( refreshSession.failure, (_, action) => action.payload )

const authenticatedReducer = createReducer<State["authenticated"], ActionType<typeof Actions>>(InitialState.authenticated as boolean)
  .handleAction( userSignIn.success, () => true )
  .handleAction( userSignOut.success, () => false );

const userReducer = createReducer<State["user"], ActionType<typeof Actions & typeof GeneralActions>>(InitialState.user as IUser)
    .handleAction( userSignIn.success, ( _, action ) => action.payload )
    .handleAction( initServer.success, ( _, action ) => action.payload )
    .handleAction( refreshToken.failure, () => InitialState.user );

const initRouteReducer = createReducer<State["initRoute"], ActionType<typeof Actions>>(InitialState.initRoute as string)
  .handleAction( setInitRoute, ( _, action ) => action.payload )

export default combineReducers({
    message       : messageReducer,
    error         : errorReducer,
    authenticated : authenticatedReducer,
    user          : userReducer,
    initRoute     : initRouteReducer,
});
  