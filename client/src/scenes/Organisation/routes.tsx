import React from 'react';
import { Route } from 'react-router-dom';

import { history } from 'store';

import Loadable from 'react-loadable';
import { LoadableSpinner } from 'components/Spinner';
import { EuiIcon } from '@elastic/eui';

const OrganisationForm = Loadable({
    loader: () => import('./Form'),
    loading: LoadableSpinner
});

const OrganisationGrid = Loadable({
    loader: () => import('./Grid'),
    loading: LoadableSpinner
});

const OrganisationPage = Loadable({
    loader: () => import('./Page'),
    loading: LoadableSpinner
});


export const Nav = {
    label   : 'Organisations',
    onClick : () => history.push("/organisations"),
    icon    : <EuiIcon type="spacesApp"/>
};     

export const Routes = [
    <Route
        key = "organisations"
        exact 
        path    = {['/organisations','/organisations/']}
        component  = { ()=> <OrganisationGrid/> }
    />,
    <Route
    key = "organisationForm"
    exact 
    path    = {['/organisations/new','/organisations/new/','/organisations/:organisationName/edit','/organisations/:organisationName/edit/']}
    component  = { ()=> <OrganisationForm/> }
    />,
    <Route
        key = "organisationPage"
        exact 
        path    = {['/organisations/:organisationName','/organisations/:organisationName/']}
        component  = { ()=> <OrganisationPage/> }
    />
]