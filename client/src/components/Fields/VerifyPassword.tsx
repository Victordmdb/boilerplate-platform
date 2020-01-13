import React, {FunctionComponent} from 'react';

import { shouldUpdate } from 'recompose';
import CompareFields from "components/Fields/compare";

import {
    EuiFieldPassword,
    EuiFormRow
} from '@elastic/eui';

import { Fieldprops } from './types';

type FormState = {
    verifyPassword : string;
};

const VerifyPasswordField : FunctionComponent<Fieldprops<FormState>> = ({values, errors, touched, handleChange, handleBlur}) => <>
    <EuiFormRow 
        label       = "Verify Password"
        isInvalid   = {!!errors.verifyPassword && !!touched.verifyPassword}
        error       = {errors.verifyPassword}
        >
            <EuiFieldPassword
                name        = "verifyPassword"
                type        = "password"
                onChange    = {handleChange}
                onBlur      = {handleBlur}
                placeholder = "Verify Password"
                value       = {values.verifyPassword}
                className   = "form-control form-control-lg"
                data-cy     = "verifypasswordField"
            />
    </EuiFormRow >
</>

export default shouldUpdate(CompareFields(["verifyPassword"]))(VerifyPasswordField);