import { createAction, createAsyncAction } from 'typesafe-actions';
import { SetUp } from 'modules/auth/types';
import { IUser } from 'scenes/User/type';

export const showLoader = createAction('SET_LOADER')();
export const hideLoader = createAction('UNSET_LOADER')();

export const initServer = createAsyncAction( 
    "INIT_SERVER_REQUEST",
    "INIT_SERVER_SUCCESS",
    "INIT_SERVER_FAILURE"
) <SetUp, IUser, Error>();

export const checkServer = createAsyncAction( 
    "CHECK_SERVER_REQUEST",
    "CHECK_SERVER_SUCCESS",
    "CHECK_SERVER_FAILURE"
) <undefined, undefined, Error>();

export const initRootAccount = createAction('INIT_ROOT_ACCOUNT', ( mustInit : boolean ) => mustInit)();
