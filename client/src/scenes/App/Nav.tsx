import React, { FunctionComponent, MutableRefObject } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Nav as DashboardNav } from "scenes/Dashboard/routes";

import { Nav as OrganisationNav } from "scenes/Organisation/routes";
import { Nav as UserNav } from "scenes/User/routes";
import { Nav as SettingNav } from "scenes/Setting/routes";

import { Nav as AssetNav } from "scenes/Asset/routes";

import { Can } from './AbilityContext';

const {
    EuiNavDrawer,
    EuiNavDrawerGroup
} = require('@elastic/eui/lib/components/nav_drawer');

type NavProps = {
    navRef : MutableRefObject<any>;
} & RouteComponentProps;

const Nav :  FunctionComponent<NavProps> = ({match, navRef}) => <>
    <EuiNavDrawer style={{zIndex: 6000}} ref={(r : any) => (navRef.current = r)}>
        { <EuiNavDrawerGroup listItems={[DashboardNav]}/> }
        <Can I="manage" a="Organisation">{() => <EuiNavDrawerGroup listItems={[OrganisationNav]}/>}</Can>
        <Can I="manage" a="User">{() => <EuiNavDrawerGroup listItems={[UserNav]}/>}</Can>
        <Can I="manage" a="Setting">{() => <EuiNavDrawerGroup listItems={[SettingNav]}/>}</Can>
        <Can I="update" a="Asset">{() => <EuiNavDrawerGroup listItems={[AssetNav]}/>}</Can>
    </EuiNavDrawer>
</>;

export default withRouter(Nav);