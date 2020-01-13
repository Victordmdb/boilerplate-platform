import {
    all,
    fork,
    put,
    takeEvery,
    select
} from 'redux-saga/effects';

import {
    userSignIn,
    userSignUp,
    userSignOut,
    refreshToken
} from "./actions";

import { push } from 'connected-react-router';

import axios from "axios";
import { IUser } from 'scenes/User/type';
import { AuthError } from './types';
import { State } from 'modules/reducers';
import Cookies from 'js-cookie';

export function errorHandler( error: AuthError ) {
    if (!error.data) return 'An error occurred';
    if (error.status === 401){
        // yield put(userSignOut());
        return 'You are not authorized to do this. Please login and try again.';
    };
  
    if (error.data.error)  return error.data.error;
    if (error.data) return error.data;
};

function* signInUser ( action : ReturnType<typeof userSignIn.request>) {
    const { email, password } = action.payload;
    try{
        const { data } = yield axios.post<IUser>(`${process.env.REACT_APP_API_URL}/users/login`, { email, password }, { withCredentials : true });

        const Authorization = Cookies.get('authToken');
        if(!Authorization){
            throw ( new Error("Failed to log in." ));
        } else {
            axios.defaults.headers.common.Authorization = `Bearer ${Authorization}`;    
        };

        yield put(userSignIn.success(data));
        yield put(push('/'));
    } catch (error) {
        yield put (userSignIn.failure (error.response ? error.response.data.message : errorHandler(error)));
    }
};

export const getUser = (state : State) => state.auth.user;

function* refreshUserSession ( action : ReturnType<typeof refreshToken.request> ) {
    try {
        const Authorization = Cookies.get('authToken');
        if(!Authorization){
            yield put (refreshToken.failure ( "Please log in." ));
            yield put(push('/login'));
            return;
        } else {
            axios.defaults.headers.common.Authorization = `Bearer ${Authorization}`;    
        };        
        
        const { data } = yield axios.get(`${process.env.REACT_APP_API_URL}/users/refresh`, { withCredentials : true });
        
        yield put(refreshToken.success(data));

        const user = yield select(getUser);
        
        if(!user){
            const { data } = yield axios.get(`${process.env.REACT_APP_API_URL}/users/info`, { withCredentials : true });
            yield put(userSignIn.success(data));
            
        };

        yield put(push('/'));
    } catch (error) {
        yield put (refreshToken.failure (error.response ? error.response.data.message : errorHandler(error)));
    }
};



export function* signUpUser( action : ReturnType<typeof userSignUp.request> ) {
    const { email, firstname, lastname, password } = action.payload;
    try {
        yield axios.post(`${process.env.REACT_APP_API_URL}/users`, { email, firstname, lastname, password });
    } catch (error) {
        yield put (userSignUp.failure (errorHandler(error)));
    }
};
  
export function* logoutUser() {
    try {
        yield put(userSignOut.success());
        yield put(push('/'));
    } catch (error) {
        yield put (userSignOut.failure (errorHandler(error)));
    }
};


export function* loginUserRequest () {
    yield takeEvery ( userSignIn.request, signInUser );
};

export function* registerUserRequest () {
    yield takeEvery ( userSignUp.request, signUpUser );
};

export function* logoutUserRequest () {
    yield takeEvery ( userSignOut.request, logoutUser );
};

export function* refreshSessionRequest () {
    yield takeEvery ( refreshToken.request, refreshUserSession );
};


export default function* rootSaga () {
    yield all ([
        fork (loginUserRequest),
        fork (registerUserRequest),
        fork (logoutUserRequest),
        fork (refreshSessionRequest),
    ]);
};
