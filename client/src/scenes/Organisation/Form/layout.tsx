import React, { FunctionComponent } from 'react';

import { FormikProps } from 'formik';
import { FormState, FormProps } from "./types";

import {
    EuiPageContent,
    EuiPageContentBody,
    EuiPageHeader,
    EuiPageHeaderSection,
    EuiTitle,
    EuiButton,
    EuiForm,
    EuiFlexGroup,
    EuiFlexItem,
} from '@elastic/eui';

import Email from 'components/Fields/Email';
import Name from 'components/Fields/Name';
import Address from 'components/Fields/Address';
import { capitalCase } from "change-case";

const OrganisationFormContainer : FunctionComponent<FormikProps<FormState> & FormProps> = (props) => {
        const {
            values,
            touched,
            errors,
            handleChange,
            handleBlur,
            submitForm,
            isSubmitting,
            handleSubmit,
            organisation,
            loading
        } = props

        const {
            email,
            address,
            name,
        } = values;

        return <>
        <EuiPageHeader >
            <EuiFlexGroup gutterSize="s" justifyContent="center" >
                <EuiPageHeaderSection>
                        <EuiTitle size="l" >
                            <h1>{organisation ? `Modify ${capitalCase(organisation.name)}` : "Create an Organisation"}</h1>
                        </EuiTitle>
                </EuiPageHeaderSection>
            </EuiFlexGroup>
        </EuiPageHeader>
        <EuiPageContent horizontalPosition="center">
            <EuiPageContentBody style={{maxWidth:600}}>
                <EuiForm><form onSubmit={handleSubmit}>
                    <EuiFlexGroup direction="column">                
                        <EuiFlexItem>
                            <Name
                                isFirst
                                values       = {{name}}
                                errors       = {{name:errors.name}}
                                touched      = {{name:touched.name}}
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
                            <Address
                                values       = {{address}}
                                errors       = {{address:errors.address}}
                                touched      = {{address:touched.address}}
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
                                isLoading   = {isSubmitting || loading }
                                fill>
                                { organisation ? "Update" : "Create" }
                            </EuiButton>
 
                        </EuiFlexItem>
                    </EuiFlexGroup>
                </form></EuiForm>
            </EuiPageContentBody>
        </EuiPageContent>
    </>
};

export default OrganisationFormContainer;