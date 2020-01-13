import React from 'react';
import { Route } from 'react-router-dom';

import { history } from 'store';

import Loadable from 'react-loadable';
import { LoadableSpinner } from 'components/Spinner';
import { EuiIcon } from '@elastic/eui';

const DashboardPage = Loadable({
    loader: () => import('./view'),
    loading: LoadableSpinner
});

export const Nav = {
    label   : 'Dashboard',
    onClick : () => history.push("/"),
    icon    : <EuiIcon type="dashboardApp"/>
};     

export const Routes = [
    <Route
        key = "dashboard"
        exact 
        path    = {['/','/dashboard','/dashboard/']}
        component  = { ()=> <DashboardPage/> }
    />
]