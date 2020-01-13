import { withFormik } from 'formik';

import Layout from "./layout";
import Validate from "./validation";

import { FormState, FormProps, OwnProps } from "./types";

import withHook from 'hook-hoc';
import { compose } from "lodash/fp";
import { useQuery, useMutation } from "react-fetching-library"
import { IOrganisation, OrganisationData, OrganisationFilter, CreateOrganisation, UpdateOrganisation } from '../type';
import { withRouter } from 'react-router';
import { useMemo, useEffect } from 'react';

export const OrganisationFunctions = ({ match }: OwnProps ) => {
    const name = match.params.organisationName ? match.params.organisationName : undefined;
    const action = useMemo(() => OrganisationData({ name }), [name]);
    const { loading : dataLoading, payload : dataPayload, query, error : dataError } = useQuery<IOrganisation | Error, OrganisationFilter>( action, false );
    
    useEffect(()=>{query()},[name, query]);

    const { loading : createLoading, payload : createPayload, mutate : create, error : createError } = useMutation<IOrganisation | Error, OrganisationFilter>(CreateOrganisation);
    const { loading : updateLoading, payload : updatePayload, mutate : update, error : updateError } = useMutation<IOrganisation | Error, OrganisationFilter>(UpdateOrganisation(dataPayload && "_id" in dataPayload && dataPayload._id));

    return {
        organisation :  (createPayload && "_id" in createPayload) ? createPayload : 
                        (updatePayload && "_id" in updatePayload) ? updatePayload :
                        (dataPayload && "_id" in dataPayload) ? dataPayload : undefined,
        error : (dataError && dataPayload as Error) || (createError && createPayload as Error) || (updateError && updatePayload as Error) || undefined,
        loading : dataLoading || createLoading || updateLoading,
        create,
        update
    };
};

const OrganisationForm =  withFormik<FormProps, FormState>({
    mapPropsToValues: ({ organisation }) => ({
        _id : organisation && organisation._id ? organisation._id : "",
        email : organisation && organisation.email ? organisation.email : "",
        name : organisation && organisation.name ? organisation.name : "",
        address : organisation && organisation.address ? organisation.address : ""
    }),
    validationSchema : Validate,
    enableReinitialize : true,
    handleSubmit: (formData, { props, setSubmitting, setErrors }) => {
        setSubmitting(true);
        Validate.validate(formData, {stripUnknown : true}).then( (fields) => {
            if(fields._id){
                props.update(fields).then(res=>res.payload && "_id" in res.payload && props.history.push(`/organisations/${res.payload.name}`));
            } else if(fields.email&&fields.name&&fields.address){
                props.create (fields).then(res=>res.payload && "_id" in res.payload && props.history.push(`/organisations/${res.payload.name}`));
            } else {
                throw Error("Fields Missing");
            };

            setSubmitting(false);  
        });
    },  
    displayName: 'OrganisationForm',
})(Layout);


export default compose (
    withRouter,
    withHook(OrganisationFunctions)
)(OrganisationForm);