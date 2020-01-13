import React, { Component, MouseEvent, ComponentType } from "react";
import { RouteComponentProps } from "react-router";
import { withRouter } from 'react-router-dom';
import { createLocation, LocationDescriptor } from 'history';

const isModifiedEvent = (event : MouseEvent) => !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);

const isLeftClickEvent = (event : MouseEvent) => event.button === 0;

let router : RouteComponentProps;
export const registerRouter = (reactRouter : RouteComponentProps) => { router = reactRouter };

/**
 * The logic for generating hrefs and onClick handlers from the `to` prop is largely borrowed from
 * https://github.com/ReactTraining/react-router/blob/v3/modules/Link.js.
 */
export const getRouterLinkProps = ( to : string | LocationDescriptor ) => {
  const location = typeof to === "string"
    ? createLocation(to, null, undefined, router.history.location)
    : to;

  const href = router.history.createHref(location);

  const onClick = ( event : MouseEvent<HTMLElement> ) => {
    if (event.defaultPrevented) {
      return;
    }
    
    // If target prop is set (e.g. to "_blank"), let browser handle link.
    if ((event.target as HTMLElement).getAttribute('target')) {
      return;
    }

    if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
      return;
    }
    
    // Prevent regular link behavior, which causes a browser refresh.
    event.preventDefault();
    router.history.push(location);
  };

  return {href, onClick}
};


export const extractRouter = ( onRoute : Function ) => ( WrappedComponent : ComponentType ) => withRouter (
  class extends Component<RouteComponentProps & any> {
    componentDidMount() {
      const { match, location, history } = this.props;
      const router = { route: { match, location }, history };
      onRoute(router);
    }

    render() {
      const p = this.props;
      return <WrappedComponent {...p} />
    }
  }
);