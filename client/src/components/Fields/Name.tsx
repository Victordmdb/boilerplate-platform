import React, {FunctionComponent} from 'react';

import { shouldUpdate } from 'recompose';
import CompareFields from "./compare";

import {
    EuiFieldText,
    EuiFormRow,
} from '@elastic/eui';

import { Fieldprops } from './types';

type FormState = {
    name : string;
};

const NameField :FunctionComponent<Fieldprops<FormState>> = ({values, errors, touched, handleChange, handleBlur, isFirst}) => <>
    <EuiFormRow
        label       = "Name *"
        isInvalid   = {!!errors.name && !!touched.name}
        error       = {errors.name}
        >
        <EuiFieldText
            name        = "name"
            autoFocus   = {!!isFirst}
            value       = {values.name}
            onChange    = {handleChange}
            onBlur      = {handleBlur}
            isInvalid   = {!!errors.name && !!touched.name}
            placeholder = "Enter your Name"
            data-cy     = "nameField"
            />
    </EuiFormRow >
</>

export default shouldUpdate(CompareFields(["name"]))(NameField);