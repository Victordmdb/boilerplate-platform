import React, {FunctionComponent, CSSProperties } from 'react';
import { EuiCallOut } from "@elastic/eui";
import {LoadingComponentProps} from 'react-loadable';

import { DoubleBounce } from "styled-spinkit";

const fullPageCenter = {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
} as CSSProperties;

type SpinnerProps = {
    loading ? : boolean;
    fullPage ? : boolean;
    error? : Error;
}

const LoadingSpinner : FunctionComponent<SpinnerProps>= ({fullPage, error}) =>{
    if(error) console.error(error);
    return <>
        <div style={fullPage ? fullPageCenter : undefined}>
            {error? <EuiCallOut title="Sorry, there was an error" color="danger" iconType="alert">{error.message}</EuiCallOut> : <DoubleBounce size = {30} color = "#230939" />}
        </div>
    </>
};

type LoadableProps = LoadingComponentProps & SpinnerProps

export const LoadableSpinner : FunctionComponent<LoadableProps> = ({error, timedOut, pastDelay, isLoading, retry, ...props}) => {
    if(error){
        return <EuiCallOut title="Sorry, there was an error loading the component" color="danger" iconType="alert">{error.message}</EuiCallOut>;
    }
    if(timedOut) return <EuiCallOut title="Sorry, loading page timed out" color="danger" iconType="alert"/>
    return <LoadingSpinner {...props} fullPage/>
} 

export default LoadingSpinner;