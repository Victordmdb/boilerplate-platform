import React, { useState, useMemo } from 'react';

import { Overview, OverviewPlaceholder } from "./Card";

import { RouteComponentProps, withRouter } from 'react-router-dom';


import {
    EuiFlexGrid,
    EuiFlexItem,
    EuiTitle,
    EuiButton,
    EuiCallOut,
    EuiFlexGroup
} from '@elastic/eui';
import { OrganisationData, IOrganisation } from './type';
import TextFilter from 'components/Fields/Text';
import { useQuery } from 'react-fetching-library';

type Props = RouteComponentProps;

const Items = ({ history } : Props) => {
    const [text, setText] = useState("")
    const action = useMemo(()=>OrganisationData({text}), [text]);
    const { error, loading, payload } = useQuery<Array<IOrganisation> | Error>(action);

    return  <EuiFlexGroup direction="column">
                <EuiFlexItem grow={false}>
                    <EuiFlexGroup>
                        <EuiFlexItem grow={false}>
                            <EuiTitle>
                                <h2>Organisations</h2>
                            </EuiTitle>
                        </EuiFlexItem>
                        <EuiFlexItem>
                            <TextFilter
                                values          = {{text}}
                                errors          = {{text:""}}
                                touched         = {{text:true}}
                                handleChange    = {()=>{}}
                                handleBlur      = {()=>{}}
                                setFieldValue   = {setText}/>
                        </EuiFlexItem>
                        <EuiFlexItem  grow={false}>
                        {history ? <EuiButton onClick={() => history.push("/organisations/new")} iconType="plusInCircle">Create</EuiButton> : null}
                        </EuiFlexItem>
                    </EuiFlexGroup>
                </EuiFlexItem>
                <EuiFlexItem>
                    {error && payload && "message" in payload && <EuiCallOut className="border" color="danger">{payload.message}</EuiCallOut>}
                    <EuiFlexGrid columns={4}>{  
                        loading ? Array(8).fill(0).map((_,idx)=>
                            <EuiFlexItem key={idx} style={{ width: 300 }} grow={false}>
                                <OverviewPlaceholder/>
                            </EuiFlexItem>) : 
                            payload && "length" in payload ? payload.map( organisation =>
                            <EuiFlexItem key = {organisation._id} style={{ width: 300 }} grow={false}>
                                <Overview {...organisation}/>
                            </EuiFlexItem>) :
                        <EuiCallOut title="No organisations available" color="warning" iconType="cross"/>
                    }</EuiFlexGrid>
                </EuiFlexItem>
            </EuiFlexGroup>
};


export default withRouter(Items);