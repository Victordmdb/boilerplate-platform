import React, {FunctionComponent} from 'react';

import { shouldUpdate } from 'recompose';
import CompareFields from "components/Fields/compare";

import {
    EuiTextArea,
    EuiFormRow
} from '@elastic/eui';

import { Fieldprops } from './types';

type FormState = {
    description : string;
};

const DescriptionField : FunctionComponent<Fieldprops<FormState>> = ({values, errors, touched, handleChange, handleBlur, isFirst}) => <>
<EuiFormRow
    label       = "Description"
    isInvalid   = {!!errors.description && !!touched.description}
    error       = {errors.description}
    >
    <EuiTextArea
        name        = "description"
        value       = {values.description}
        autoFocus   = {!!isFirst}
        onChange    = {handleChange}
        onBlur      = {handleBlur}
        isInvalid   = {!!errors.description && !!touched.description}
        placeholder = "Enter your description"
        data-cy     = "descriptionField"
        />
    </EuiFormRow >
</>

export default shouldUpdate(CompareFields(["description"]))(DescriptionField);