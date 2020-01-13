import React, { FunctionComponent } from 'react';
import {Switch, Route, Redirect } from 'react-router-dom';

import {Routes as AuthRoutes} from "scenes/Auth/routes";
import {Routes as DashboardRoutes} from "scenes/Dashboard/routes";

import {Routes as OrganisationRoutes} from "scenes/Organisation/routes";
import {Routes as UserRoutes} from "scenes/User/routes";
import {Routes as SettingRoutes} from "scenes/Setting/routes";

import {Routes as AssetRoutes} from "scenes/Asset/routes";

import ErrorPage from "components/NotFound";

import { Ability } from '@casl/ability';

// import { TransitionGroup, CSSTransition } from "react-transition-group";

export const Default = () =>    <Switch>
                                    {AuthRoutes}
                                    <Redirect  from= "/" to  = "/login" />
                                    <Route component = { ErrorPage }/>
                                </Switch>

type Props = {
    abilities : Ability
};

const AuthenticatedContainer : FunctionComponent<Props> = ({abilities}) => {
    let Routes = [] as Array<JSX.Element>;
    Routes = Routes.concat(DashboardRoutes);
    if (abilities.can("read", "Organisation")) Routes = Routes.concat(OrganisationRoutes);
    if (abilities.can("manage", "User")) Routes = Routes.concat(UserRoutes);
    if (abilities.can("manage", "Setting")) Routes = Routes.concat(SettingRoutes);
    if (abilities.can("create", "Asset")) Routes = Routes.concat(AssetRoutes);

    return <Switch>
                {Routes}
                <Route component = { ErrorPage }/>
            </Switch>
                    
}

export const Authenticated = AuthenticatedContainer;