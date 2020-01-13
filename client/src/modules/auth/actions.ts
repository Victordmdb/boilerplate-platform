import { createAction, createAsyncAction } from 'typesafe-actions';
import { IUser, NewUser, UpdatedUser } from 'scenes/User/type';
import { SignIn, AuthError } from './types';

export const userSignIn = createAsyncAction( 
    "SIGNIN_USER_REQUEST",
    "SIGNIN_USER_SUCCESS",
    "SIGNIN_USER_FAILURE"
) <SignIn, IUser, AuthError>();

export const userEdit = createAsyncAction( 
    "EDIT_USER_REQUEST",
    "EDIT_USER_SUCCESS",
    "EDIT_USER_FAILURE"
) <UpdatedUser, IUser, Error>();

export const userSignUp = createAsyncAction( 
    "SIGNUP_USER_REQUEST",
    "SIGNUP_USER_SUCCESS",
    "SIGNUP_USER_FAILURE"
) <NewUser, IUser, Error>();

export const userSignOut = createAsyncAction( 
    "SIGNOUT_USER_REQUEST",
    "SIGNOUT_USER_SUCCESS",
    "SIGNOUT_USER_FAILURE"
) <undefined, undefined, Error>();

type TokenPayload = {
    token : string;
    expiresAt : string;
};

export const refreshToken = createAsyncAction( 
    "REFRESH_TOKEN_REQUEST",
    "REFRESH_TOKEN_SUCCESS",
    "REFRESH_TOKEN_FAILURE"
) <undefined, TokenPayload, string>();

export const setInitRoute = createAction('SET_INITROUTE', ( route : string ) => route )();