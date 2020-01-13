import React, {FunctionComponent} from 'react';

import { shouldUpdate } from 'recompose';
import CompareFields from "./compare";

import {
    EuiFieldSearch,
} from '@elastic/eui';

import { Fieldprops } from './types';

type FormState = {
    text : string;
};

const TextField :FunctionComponent<Fieldprops<FormState>> = ({values, errors, touched, handleChange, handleBlur, isFirst}) => <>
    <EuiFieldSearch
        name        = "text"
        fullWidth   = {true}
        autoFocus   = {!!isFirst}
        value       = {values.text}
        onChange    = {handleChange}
        onBlur      = {handleBlur}
        isInvalid   = {!!errors.text && !!touched.text}
        placeholder = "Enter your Text"
        data-cy     = "textField"
        />
</>

export default shouldUpdate(CompareFields(["text"]))(TextField);