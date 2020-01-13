import React, {FunctionComponent} from 'react';

import { shouldUpdate } from 'recompose';
import CompareFields from "components/Fields/compare";

import {
    EuiFieldText,
    EuiFormRow
} from '@elastic/eui';

import { Fieldprops } from './types';

type FormState = {
    address : string;
};

const AddressField : FunctionComponent<Fieldprops<FormState>> = ({values, errors, touched, handleChange, handleBlur, isFirst}) => <>
<EuiFormRow
    label       = "Address *"
    isInvalid   = {!!errors.address && !!touched.address}
    error       = {errors.address}
    >
    <EuiFieldText
        name        = "address"
        value       = {values.address}
        autoFocus   = {!!isFirst}
        onChange    = {handleChange}
        onBlur      = {handleBlur}
        isInvalid   = {!!errors.address && !!touched.address}
        placeholder = "Enter your address"
        data-cy     = "addressField"
    />
    </EuiFormRow >
</>

export default shouldUpdate(CompareFields(["address"]))(AddressField);