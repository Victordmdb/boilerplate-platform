import React, {FunctionComponent} from 'react';

import { shouldUpdate } from 'recompose';
import CompareFields from "components/Fields/compare";

import {
    EuiFieldPassword,
    EuiFormRow
} from '@elastic/eui';

import { Fieldprops } from './types';

type FormState = {
    password : string;
};

const PasswordField :FunctionComponent<Fieldprops<FormState>> = ({values, errors, touched, handleChange, handleBlur, isFirst}) => <>
    <EuiFormRow 
        label       = "Password *"
        isInvalid   = {!!errors.password && !!touched.password}
        error       = {errors.password}
    >
        <EuiFieldPassword
            name        = "password"
            type        = "password"
            autoFocus   = {!!isFirst}
            onChange    = {handleChange}
            onBlur      = {handleBlur}
            placeholder = "Password"
            value       = {values.password}
            className   = "form-control form-control-lg"
            data-cy     = "passwordField"
            />
    </EuiFormRow >
</>

export default shouldUpdate(CompareFields(["password"]))(PasswordField);