import React, { FunctionComponent, useRef } from 'react';
import { connect } from 'react-redux';

import Nav from './Nav';
import { Default as DefaultRoutes, Authenticated as AuthRoutes } from './routes';
import Helmet from 'react-helmet';

import '@elastic/eui/dist/eui_theme_light.css';
import './theme.scss';
import '@elastic/charts/dist/theme_light.css';
import 'react-perfect-scrollbar/dist/css/styles.css';

import { isIOS, isMobile } from 'react-device-detect';

import { State } from "modules/reducers";


import { AbilityContext } from './AbilityContext';
import { Ability } from '@casl/ability';
import { unpackRules } from '@casl/ability/extra';

import Header from "./Header";

import {
    EuiPage,
    EuiPageBody,
} from '@elastic/eui';

import { isEmpty } from 'utils/helpers';

import actions from 'modules/actions';

const mapStateToProps = ({ auth }:State) => {
    const { user } = auth;
    return { user }
};

const dispatchProps = {
    userSignIn : actions.auth.userSignIn.request,
    checkServer : actions.general.checkServer.request,
    refreshToken : actions.auth.refreshToken.request
};


type AppProps = ReturnType<typeof mapStateToProps> & typeof dispatchProps;

const AppContainer : FunctionComponent<AppProps> = ({ user, checkServer, refreshToken }) => {
    checkServer();
    refreshToken();

    const navRef = useRef<any>(null!);
    
    //set default height and overflow for iOS mobile Safari 10+ support.
    if (isIOS && isMobile) {
        document.body.classList.add('ios-mobile-view-height')
    } else if (document.body.classList.contains('ios-mobile-view-height')) {
        document.body.classList.remove('ios-mobile-view-height')
    };

    if ( !user || isEmpty(user) || !user.abilities ){
        return <DefaultRoutes/>
    };

    

    const abilities = new Ability( unpackRules(user.abilities), {
        subjectName :  (subject) => {
            if (!subject || typeof subject === 'string') {
                return subject;
            }
            return subject.__typename;
        }
    });


    return <AbilityContext.Provider value={abilities}>
                <Helmet titleTemplate="%s">
                    <title>Prototype Platform</title>
                    <meta charSet="utf-8"/>
                    <meta http-equiv='X-UA-Compatible' content= 'IE=edge'/>
                    <meta name='viewport' content='width=device-width, initial-scale=1'/>
                </Helmet>
                <Header navRef={navRef}/>
                <Nav navRef={navRef}/>
                <EuiPage className="euiNavDrawerPage" style={{paddingTop: 60, height:"100%", maxWidth:"100%"}}>
                    {user.roles.includes("ADMIN") && <div>I'm an admin</div>}
                    <EuiPageBody className="euiNavDrawerPage__pageBody" style={{paddingTop: 10, height:"100%",position:"relative"}}>
                        <AuthRoutes abilities={abilities}/>
                    </EuiPageBody>
                </EuiPage>
            </AbilityContext.Provider>
};

const App = connect(mapStateToProps, dispatchProps)(AppContainer);

export default () => <App/>