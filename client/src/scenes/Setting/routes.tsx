import React from 'react';
import { Route } from 'react-router-dom';

import { history } from 'store';

import Loadable from 'react-loadable';
import { LoadableSpinner } from 'components/Spinner';
import { EuiIcon } from '@elastic/eui';

const SettingsPage = Loadable({
    loader: () => import('./Page'),
    loading: LoadableSpinner
});

export const Nav = {
    label   : 'Settings',
    onClick : () => history.push("/settings"),
    icon    : <EuiIcon type="managementApp"/>
};     

export const Routes = [
    <Route
        key = "settings"
        exact 
        path    = {['/settings','/settings/']}
        component  = { ()=> <SettingsPage/> }
    />
]