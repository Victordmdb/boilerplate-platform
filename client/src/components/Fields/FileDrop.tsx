import React, { FunctionComponent } from 'react';

import { Fieldprops } from './types';

import { shouldUpdate } from 'recompose';
import CompareFields from "components/Fields/compare";

import { EuiFormRow } from "@elastic/eui";

const { EuiFilePicker } = require ("@elastic/eui/lib/components/form/file_picker/file_picker");

type FormState = {
  file : File | undefined;
};

// const EmptyField : FunctionComponent = () => <EuiFlexGroup justifyContent="spaceAround" direction="column" alignItems="center">
//   <EuiFlexItem>
//     <EuiIcon type="broom" size="xxl"/>
//   </EuiFlexItem>
//   <EuiFlexItem>
//     <EuiText size="m">Drop a file</EuiText>
//   </EuiFlexItem>
// </EuiFlexGroup>

const FileField : FunctionComponent<Fieldprops<FormState>> = ({values, errors, touched, setFieldValue, handleBlur, isFirst}) => <>
  <EuiFormRow
    isInvalid   = {!!errors.file && !!touched.file}
    error       = {errors.file}
  >
    <EuiFilePicker
      id        = "fileuploader"
      initialPromptText = "Select or drag and drop a file"
      autoFocus   = {!!isFirst}
      error     = {errors&&errors.file}
      touched   = {touched&&touched.file}
      onBlur    = {handleBlur}
      onChange  = {(files : FileList) => setFieldValue && files.length && setFieldValue(files[0])}
      data-cy     = "fileField"
      />
  </EuiFormRow>
</>

export default shouldUpdate(CompareFields(["file"]))(FileField);
