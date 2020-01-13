import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';

import {
    showLoader,
    hideLoader,
} from 'modules/general/actions';

import LoadingSpinner from 'components/Spinner';

import logo from 'assets/logo.png';
import { State } from 'modules/reducers';

import { RouteChildrenProps } from 'react-router';

import Form from "./form";

import {
    EuiPage,
    EuiPageBody,
    EuiPageContent,
    EuiPageContentBody,
    EuiPageContentHeader,
    EuiPageContentHeaderSection,
    EuiTitle,
    EuiCallOut,
} from '@elastic/eui';
import { EuiSpacer } from '@elastic/eui';

const Img = require('react-image');

const mapStateToProps = ({ general } : State) => {
    const { loader, alertMessage, showMessage, initRoot } = general;
    return { loader, alertMessage, showMessage, initRoot }
};

const dispatchProps = {
    showLoader,
    hideLoader,
};


type Props = ReturnType<typeof mapStateToProps> & typeof dispatchProps & RouteChildrenProps;

const SignIn : FunctionComponent<Props> = ({ initRoot, showMessage, alertMessage, location }) => {
    let email = new URLSearchParams(location.search).get("email") as string;
    let tempPassword = new URLSearchParams(location.search).get("pwd") as string;

    return <>
        <EuiPage style={{width: "100%", height:"100%"}}>
            <EuiPageBody>
                <EuiPageContent  verticalPosition="center" horizontalPosition="center">
                    <EuiPageContentHeader>
                        <EuiPageContentHeaderSection style={{alignItems:"center",justifyContent:"center"}}>
                            <Img style ={{maxWidth: 100}} src={logo} loader = {<LoadingSpinner/>}/>
                        </EuiPageContentHeaderSection>
                        <EuiPageContentHeaderSection style={{alignItems:"center",justifyContent:"center"}}>
                            <EuiTitle>
                                <h2>{initRoot ? "Create Root Account" : "Welcome" }</h2>
                            </EuiTitle>
                        </EuiPageContentHeaderSection>
                    </EuiPageContentHeader>
                    <EuiPageContentBody>
                        <Form email={email} tempPwd={tempPassword}/>

                        {alertMessage ?<>
                            <EuiSpacer/>
                            <EuiCallOut color="warning">
                                {alertMessage}
                            </EuiCallOut>
                        </> : null}
                    </EuiPageContentBody>
                </EuiPageContent>
            </EuiPageBody>
        </EuiPage>
    </>;
}



export default connect (mapStateToProps, dispatchProps) (SignIn);