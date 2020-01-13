import {
    all,
    fork,
    put,
    takeEvery
} from 'redux-saga/effects';

import {
    initServer,
    checkServer,
    initRootAccount
} from "./actions";

import axios from "axios";
import { userSignIn } from 'modules/auth/actions';

enum ServerStatus {
    OFFLINE,
    SET_ROOT,
    AVAILABLE
};

function* checkServerConnection ( action : ReturnType<typeof checkServer.request> ) {
    try{
        const { data } = yield axios.get<ServerStatus>(`${process.env.REACT_APP_API_URL}/status`);
        if(data === ServerStatus[ServerStatus.SET_ROOT]){
            yield put(initRootAccount(true));
        } else if(data === ServerStatus[ServerStatus.OFFLINE]){
            yield put (checkServer.failure (new Error("Server not available")));
            return;
        };

        yield put (checkServer.success ());

    } catch (error) {
        yield put (checkServer.failure (error));
    }
};

export function* initializeServer( action : ReturnType<typeof initServer.request> ) {
    const { email, organisation, password } = action.payload;
    try {
        const { data } = yield axios.post(`${process.env.REACT_APP_API_URL}/init`, { email, organisation, password });
        yield put(initServer.success(data.user));
        yield put(userSignIn.request({email, password}));
    } catch (error) {
        yield put (initServer.failure (error));
    }
};
  
export function* initServerRequest () {
    yield takeEvery ( initServer.request, initializeServer );
};

export function* checkServerRequest () {
    yield takeEvery ( checkServer.request, checkServerConnection );
};

export default function* rootSaga () {
    yield all ([
        fork (initServerRequest),
        fork (checkServerRequest),
    ]);
};
