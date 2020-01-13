import React from 'react';
import { Route } from 'react-router-dom';

import { history } from 'store';

import Loadable from 'react-loadable';
import { LoadableSpinner } from 'components/Spinner';
import { EuiIcon } from '@elastic/eui';

const UserList = Loadable({
    loader: () => import('./List'),
    loading: LoadableSpinner
});

const UserForm = Loadable({
    loader: () => import('./Form'),
    loading: LoadableSpinner
});

export const Nav = {
    label   : 'Users',
    onClick : () => history.push("/users/"),
    icon    : <EuiIcon type="usersRolesApp"/>
};     

export const Routes = [
    <Route
        key = "userList"
        exact 
        path    = {['/users','/users/']}
        component  = { ()=> <UserList/> }
    />,
    <Route
        key = "userForm"
        exact 
        path    = {['/users/new','/users/new/','/users/:userId','/users/:userId/']}
        component  = { ()=> <UserForm/> }
    />
]