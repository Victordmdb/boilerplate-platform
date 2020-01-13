import React, { FunctionComponent } from 'react';

import {
    EuiPageContent,
    EuiPageContentBody,
    EuiPageHeader,
    EuiTitle,
    EuiButtonIcon,
    EuiFlexGroup,
    EuiFlexItem,
} from '@elastic/eui';

import { capitalCase } from "change-case";
import { OrganisationData, IOrganisation, OrganisationFilter } from './type';
import { withRouter, RouteComponentProps } from 'react-router';
import { useQuery } from 'react-fetching-library';
import LoadingSpinner from 'components/Spinner';
import { EuiCallOut } from '@elastic/eui';
import { EuiText } from '@elastic/eui';

type RouteProps = {
    organisationName : string;
};

const OrganisationPage : FunctionComponent<RouteComponentProps<RouteProps>> = ({match, history}) => {
    const name = match.params.organisationName;
    const { loading, payload, error } = useQuery<IOrganisation | Error, OrganisationFilter>( OrganisationData({ name }) );

    if(loading) return <LoadingSpinner fullPage/>;
    if(error && payload && "message" in payload) return <EuiCallOut  color="danger" title={payload.message}/>;
    if(!payload) return <EuiCallOut  color="warning" title="No Organisation data"/>;

    const { address } = payload as IOrganisation;

    return <>
        <EuiPageHeader >
            <EuiFlexGroup gutterSize="s" alignItems="center" >
                <EuiFlexItem grow={false}>
                        <EuiTitle size="l" >
                            <h1>{ `${capitalCase(name)}`}</h1>
                        </EuiTitle>
                </EuiFlexItem>
                <EuiFlexItem grow={false}>
                    {history ? <EuiButtonIcon onClick={() => history.push(`/organisations/${name}/edit`)} iconType="pencil"/> : null}
                </EuiFlexItem>
            </EuiFlexGroup>
        </EuiPageHeader>
        <EuiPageContent horizontalPosition="center">
            <EuiPageContentBody style={{maxWidth:600}}>
                <EuiText>{address}</EuiText>
            </EuiPageContentBody>
        </EuiPageContent>
    </>
};

export default withRouter(OrganisationPage);