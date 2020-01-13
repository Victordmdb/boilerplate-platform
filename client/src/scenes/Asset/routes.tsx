import React from 'react';
import { Route } from 'react-router-dom';

import { history } from 'store';

import Loadable from 'react-loadable';
import { LoadableSpinner } from 'components/Spinner';
import { EuiIcon } from '@elastic/eui';

const AssetList = Loadable({
    loader: () => import('./List'),
    loading: LoadableSpinner
});

export const Nav = {
    label   : 'Assets',
    onClick : () => history.push("/assets"),
    icon    : <EuiIcon type="reportingApp"/>
};     

export const Routes = [
    <Route
        key = "assets"
        exact 
        path    = {['/assets','/assets/']}
        component  = { ()=> <AssetList/> }
    />
]