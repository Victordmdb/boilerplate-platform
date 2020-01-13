import React, { FunctionComponent } from 'react';
import { FormikProps } from 'formik';
import { FormState, FormProps } from "./types";

import {
    EuiButton,
    EuiForm,
    EuiFlexGroup,
    EuiFormRow,
    EuiFlexItem,
    EuiFieldText,
    EuiCallOut
} from '@elastic/eui';

import Password from 'components/Fields/Password';
import VerifyPassword from 'components/Fields/VerifyPassword';
import Email from 'components/Fields/Email';

const SignInFormContainer : FunctionComponent<FormikProps<FormState> & FormProps> = (props) => {
        const {
            values,
            touched,
            errors,
            error,
            handleChange,
            handleBlur,
            submitForm,
            isSubmitting,
            handleSubmit,
            forgotPassword,
            initRoot
            // setForgotPassword,
            // initiateForgotPassword,
        } = props

        const {
            email,
            password,
            verifyPassword
        } = values;


        return <EuiForm><form onSubmit={handleSubmit}>
                    <EuiFlexGroup direction="column">
                        {initRoot && <EuiFlexItem>
                            <EuiFormRow
                                label       = "Organisation Name *"
                                isInvalid   = {!!errors.organisation && !!touched.organisation}
                                error       = {errors.organisation}
                                >
                                <EuiFieldText
                                    autoFocus
                                    name        = "organisation"
                                    value       = {values.organisation}
                                    onChange    = {handleChange}
                                    onBlur      = {handleBlur}
                                    isInvalid   = {!!errors.organisation}
                                    placeholder = "Enter name of organisation"
                                    />
                            </EuiFormRow >
                        </EuiFlexItem>}

                        <EuiFlexItem>
                            <Email
                                values       = {{email}}
                                errors       = {{email:errors.email}}
                                touched      = {{email:touched.email}}
                                handleChange = {handleChange}
                                handleBlur   = {handleBlur}
                                isFirst      = {!initRoot}
                                />
                        </EuiFlexItem>

                        <EuiFlexItem>
                            <Password
                                values       = {{password}}
                                errors       = {{password:errors.password}}
                                touched      = {{password:touched.password}}
                                handleChange = {handleChange}
                                handleBlur   = {handleBlur}/>
                        </EuiFlexItem>

                        {initRoot && <EuiFlexItem>
                            <VerifyPassword
                                values       = {{verifyPassword : verifyPassword?verifyPassword:""}}
                                errors       = {{verifyPassword:errors.verifyPassword}}
                                touched      = {{verifyPassword:touched.verifyPassword}}
                                handleChange = {handleChange}
                                handleBlur   = {handleBlur}
                                />
                        </EuiFlexItem>}

                        {error && <EuiFlexItem><EuiCallOut iconType="alert" color="danger" title={error}/></EuiFlexItem>}
                        
                        <EuiFlexItem>
                            <EuiButton 
                                type    = "submit"
                                onClick = {submitForm}
                                color   = "primary"
                                className = "text-upperasset"
                                isLoading = {isSubmitting || props.loader}
                                fill
                                >
                                {initRoot ? "Create" : forgotPassword ? "Reset" : "Sign In"}
                            </EuiButton>  
                        </EuiFlexItem>
                    </EuiFlexGroup>
                </form></EuiForm>
};

export default SignInFormContainer;