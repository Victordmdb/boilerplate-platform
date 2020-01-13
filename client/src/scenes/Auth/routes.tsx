import React from 'react';
import { Route } from 'react-router-dom';

import Loadable from 'react-loadable';
import { LoadableSpinner } from 'components/Spinner';

const LoginPage = Loadable({
    loader: () => import('./pages/Login'),
    loading: LoadableSpinner
});

export const Routes = [
    <Route
        key = "login"
        exact 
        path    = {['/login','/login/']}
        component  = { LoginPage }
    />
]