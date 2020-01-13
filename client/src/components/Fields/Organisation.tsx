
import React, { useState, FunctionComponent, useMemo } from 'react';
import { shouldUpdate } from "recompose";
import CompareFields from "./compare";

import { EuiFormRow, EuiComboBox } from "@elastic/eui";

import { capitalCase } from "change-case";
import { IOrganisation, OrganisationData } from 'scenes/Organisation/type';
import { useQuery } from 'react-fetching-library';
import { Fieldprops } from './types';

type FormState = {
    organisation : Partial<IOrganisation>;
}

type OwnProps = Fieldprops<FormState>;

const MapToOption : (orgs : Array<IOrganisation>) => Array<any> = (orgs) => orgs.map(({_id,name})=>({label:capitalCase(name),_id}));

const OrganisationField : FunctionComponent<OwnProps> = ({ values : { organisation }, errors, touched, setFieldValue, handleBlur }) =>{
    const [text, setText] = useState("");
    const action = useMemo(() => OrganisationData({text}), [text])
    const { payload, loading, error } = useQuery<Array<IOrganisation>>(action);
    return <>
    <EuiFormRow
        label       = "Organisation *"
        isInvalid   = {errors && !!errors.organisation && touched && !!touched.organisation}
        error       = {(errors && errors.organisation) || error}
        >
        <EuiComboBox
            placeholder = "Select organisation..."
            singleSelection = {{ asPlainText: true }}
            isLoading   = {loading}
            async
            onChange    = {s => setFieldValue && setFieldValue(s.length ? {name:s[0].label,_id:(s[0] as any)._id} as IOrganisation : {})}
            onBlur      = {handleBlur}
            selectedOptions    = {organisation && organisation._id ? [{label:capitalCase(organisation.name as string),_id:organisation._id}] : []}
            options     = {payload ? MapToOption(payload) : []}
            onSearchChange = { setText }
            data-cy     = "organisationField"
            />
    </EuiFormRow >
</>
};

export default shouldUpdate(CompareFields(["organisation"]))(OrganisationField);