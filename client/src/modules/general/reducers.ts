import { combineReducers } from "redux";
import { createReducer, ActionType } from 'typesafe-actions';

import * as Actions from "./actions";
import * as AuthActions from "modules/auth/actions";

const {
    showLoader,
    hideLoader,
    checkServer,
    initServer,
    initRootAccount
} = Actions;

export interface State {
    loader        : boolean;
    showMessage   : boolean;
    alertMessage  : string;
    serverConnected : boolean;
    initRoot      : boolean;
}
  
  // Reducer
export const InitialState : State = {
    loader        : false,
    showMessage   : false,
    alertMessage  : "",
    serverConnected : false,
    initRoot      : false,
};

const loaderReducer = createReducer<State["loader"], ActionType<typeof Actions & typeof AuthActions>>(InitialState.loader as boolean)
  .handleAction( showLoader, () => true )
  .handleAction( hideLoader, () => false )
  .handleAction( AuthActions.userSignIn.request, () => true )
  .handleAction( [AuthActions.userSignIn.success, AuthActions.userSignIn.failure], () => false )
  .handleAction( AuthActions.userSignUp.request, () => true )
  .handleAction( [AuthActions.userSignUp.success, AuthActions.userSignUp.failure], () => false )
  .handleAction( initServer.request, () => true )
  .handleAction( [initServer.success, initServer.failure], () => false );


const serverConnectedReducer = createReducer<State["serverConnected"], ActionType<typeof Actions & typeof AuthActions>>(InitialState.serverConnected as boolean)
  .handleAction( checkServer.success, () => true )
  .handleAction( checkServer.failure, () => false )

const initRootReducer = createReducer<State["initRoot"], ActionType<typeof Actions & typeof AuthActions>>(InitialState.initRoot as boolean)
  .handleAction( initRootAccount, (_, action) => action.payload )

const alertMessageReducer = createReducer<State["alertMessage"], ActionType<typeof Actions & typeof AuthActions>>(InitialState.alertMessage as string)
  .handleAction( [checkServer.failure, initServer.failure], (_, action) => action.payload.message )
  .handleAction( [checkServer.request, checkServer.success, initServer.request, initServer.success], () => InitialState.alertMessage )


export default combineReducers({
  loader          : loaderReducer,
  serverConnected : serverConnectedReducer,
  alertMessage    : alertMessageReducer,
  initRoot        : initRootReducer    
});
  