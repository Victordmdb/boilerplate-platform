import React, {FunctionComponent} from 'react';

import { shouldUpdate } from 'recompose';
import CompareFields from "./compare";

import {
    EuiFieldText,
    EuiFormRow,
    EuiFlexGroup,
    EuiFlexItem
} from '@elastic/eui';

import { Fieldprops } from './types';

type FormState = {
    firstname : string;
    lastname : string;
};

const NameField : FunctionComponent<Fieldprops<FormState>> = ({values, errors, touched, handleChange, handleBlur, isFirst}) => <>
<EuiFlexGroup>
    <EuiFlexItem>
        <EuiFormRow
            label       = "First Name *"
            isInvalid   = {!!errors.firstname && !!touched.firstname}
            error       = {errors.firstname}
            >
            <EuiFieldText
                name        = "firstname"
                value       = {values.firstname}
                autoFocus   = {!!isFirst}
                onChange    = {handleChange}
                onBlur      = {handleBlur}
                isInvalid   = {!!errors.firstname && !!touched.firstname}
                placeholder = "Enter your First Name"
                data-cy     = "firstnameField"
            />
        </EuiFormRow >
    </EuiFlexItem>
    <EuiFlexItem>
        <EuiFormRow
            label       = "Last Name *"
            isInvalid   = {!!errors.lastname && !!touched.lastname}
            error       = {errors.lastname}
            >
            <EuiFieldText
                name        = "lastname"
                value       = {values.lastname}
                onChange    = {handleChange}
                onBlur      = {handleBlur}
                isInvalid   = {!!errors.lastname && !!touched.lastname}
                placeholder = "Enter your Last Name"
                data-cy     = "lastnameField"
            />
        </EuiFormRow >
    </EuiFlexItem>
</EuiFlexGroup>
</>

export default shouldUpdate(CompareFields(["firstname", "lastname"]))(NameField);