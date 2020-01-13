import React, { FunctionComponent } from 'react';

import { withRouter, RouteComponentProps } from "react-router-dom";

import ContentLoader from 'react-content-loader';

import { EuiPanel, EuiFlexGroup, EuiFlexItem, EuiTitle } from "@elastic/eui";

import { capitalCase } from "change-case";
import { IOrganisation } from './type';

export const OverviewPlaceholder = () => <ContentLoader>
    <EuiPanel>
        <EuiFlexGroup direction="column">
            <EuiFlexItem>
                <EuiFlexGroup alignItems="center">
                    <EuiFlexItem grow={false}>
                        <rect x="0" y="0" rx="5" ry="5" width="70" height="70" />
                    </EuiFlexItem>
                    <EuiFlexItem>
                        <rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
                        <rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
                    </EuiFlexItem>
                </EuiFlexGroup>
            </EuiFlexItem>
            <EuiFlexItem>
                <rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
                <rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
                <rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
            </EuiFlexItem>
        </EuiFlexGroup>
    </EuiPanel>
</ContentLoader>

type Props = IOrganisation & RouteComponentProps;

const OverviewContainer : FunctionComponent<Props> = ({ history, name, }) => <>
    <EuiPanel onClick={() => history.push(`/organisations/${name}`)} style={{position:"relative"}}>
        <EuiFlexGroup direction="column">
            <EuiFlexItem>
                <EuiFlexGroup alignItems="center">
                    {/* {logo ? <EuiFlexItem grow={false}><Logo s3File={logo.location} size={60}/></EuiFlexItem> : undefined} */}
                    <EuiFlexItem><EuiTitle size="s" ><h5>{capitalCase(name)}</h5></EuiTitle></EuiFlexItem>
                </EuiFlexGroup>
            </EuiFlexItem>
            {/* {overview?<EuiFlexItem><EuiText size="m">{overview}</EuiText></EuiFlexItem> : null} */}
        </EuiFlexGroup>
    </EuiPanel>
</>

export const Overview = withRouter(OverviewContainer);