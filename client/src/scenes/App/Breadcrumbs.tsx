
import React, { FunctionComponent } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
const { EuiHeaderBreadcrumbs } = require('@elastic/eui/lib/components/header');

const Breadcrumbs : FunctionComponent<RouteComponentProps> = ({ history, location }) => {
    let parts = location.pathname.split("/");
    const currentLocation = parts[parts.length-1];
    parts = parts.slice(1, parts.length-1);
    let paths = parts.map((part, partIndex, parts) => {
        const path = ['', ...parts.slice(0, partIndex+1)].join("/");
        return {
            text: part,
            onClick: () => history.push(path),
        }
    });

    paths = paths.concat({text: currentLocation, onClick: ()=>null});

    return <EuiHeaderBreadcrumbs responsive={true} breadcrumbs={paths} />;
}

export default withRouter(Breadcrumbs);