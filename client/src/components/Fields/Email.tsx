import React, {FunctionComponent} from 'react';

import { shouldUpdate } from 'recompose';
import CompareFields from "components/Fields/compare";

import {
    EuiFieldText,
    EuiFormRow
} from '@elastic/eui';

import { Fieldprops } from './types';

type FormState = {
    email : string;
};

const EmailField : FunctionComponent<Fieldprops<FormState>> = ({values, errors, touched, handleChange, handleBlur, isFirst}) => <>
<EuiFormRow
    label       = "Email *"
    isInvalid   = {!!errors.email && !!touched.email}
    error       = {errors.email}
    >
    <EuiFieldText
        name        = "email"
        autoFocus   = {!!isFirst}
        value       = {values.email}
        onChange    = {handleChange}
        onBlur      = {handleBlur}
        isInvalid   = {!!errors.email && !!touched.email}
        placeholder = "Enter your email"
        data-cy     = "emailField"
    />
    </EuiFormRow >
</>

export default shouldUpdate(CompareFields(["email"]))(EmailField);