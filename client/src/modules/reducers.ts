import { combineReducers } from 'redux';
import { History } from "history"
import AuthReducer, { State as AuthState, InitialState as AuthInitState} from './auth/reducers';
import GeneralReducer, { State as GeneralState, InitialState as GeneralInitState} from './general/reducers';

import { connectRouter, RouterState  } from 'connected-react-router'

export type State = {
    readonly auth        : AuthState;
    readonly general     : GeneralState;
    readonly router      : RouterState;
}

export const InitialState = {
    auth    : AuthInitState,
    general : GeneralInitState
} as State

const rootReducer = ( history : History ) => combineReducers ({
    auth    : AuthReducer,
    general : GeneralReducer,
    router  : connectRouter(history)
});

export default rootReducer;