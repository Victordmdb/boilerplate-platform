import React, { FunctionComponent } from 'react';

import { FormikProps } from 'formik';
import { FormState, FormProps } from "./types";

import {
    EuiButton,
    EuiForm,
    EuiFlexGroup,
    EuiFlexItem
} from '@elastic/eui';

import Email from 'components/Fields/Email';
import Organisation from 'components/Fields/Organisation';
import Name from 'components/Fields/FullName';
import { connect } from 'react-redux';
import { State } from 'modules/reducers';

const mapStateToProps = ({ auth } : State) => {
    const { user } = auth;
    return { user }
};

type Props = FormikProps<FormState> & FormProps & ReturnType<typeof mapStateToProps>;

const SignInForm : FunctionComponent<Props> = (props) => {
        const {
            values,
            touched,
            errors,
            handleChange,
            handleBlur,
            setFieldValue,
            submitForm,
            isSubmitting,
            handleSubmit,
            loading,
            user
        } = props;

        const {
            _id,
            firstname,
            lastname,
            // roles,
            email,
            organisation,
        } = values;


        return <EuiForm><form onSubmit={handleSubmit}>
            <EuiFlexGroup direction="column">
                {/* <Can I="create" an="Organisation"> */}
                { user.roles.includes("ADMIN") && <EuiFlexItem>
                        <Organisation
                            values       = {{organisation}}
                            errors       = {{organisation : errors.organisation}}
                            touched      = {{organisation : touched.organisation}}
                            setFieldValue = {v => setFieldValue("organisation",v)}
                            handleChange = {handleChange}
                            handleBlur   = {handleBlur}
                            />
                    </EuiFlexItem>}
                {/* </Can> */}
                
                <EuiFlexItem>
                    <Name
                        values       = {{firstname, lastname}}
                        errors       = {{firstname:errors.firstname, lastname:errors.lastname}}
                        touched      = {{firstname:touched.firstname, lastname:touched.lastname}}
                        handleChange = {handleChange}
                        handleBlur   = {handleBlur}
                        />
                </EuiFlexItem>

                <EuiFlexItem>
                    <Email
                        values       = {{email}}
                        errors       = {{email:errors.email}}
                        touched      = {{email:touched.email}}
                        handleChange = {handleChange}
                        handleBlur   = {handleBlur}
                        />
                </EuiFlexItem>

                <EuiFlexItem>
                    <EuiButton  
                        onClick     = {submitForm}
                        color       = "primary"
                        className   = "text-upperasset"
                        type        = "submit"
                        data-cy     = "submit"
                        isLoading   = { isSubmitting || loading }
                        fill>
                        { _id ? "Update" : "Create" }
                    </EuiButton>
                </EuiFlexItem>
            </EuiFlexGroup>
        </form></EuiForm>
};

const SignInFormContainer = connect(mapStateToProps)(SignInForm);


export default SignInFormContainer;