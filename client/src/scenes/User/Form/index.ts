import { withFormik } from 'formik';

import Layout from "./layout";
import Validate from "./validation";

import { FormState, FormProps, OwnProps } from "./types";

import withHook from 'hook-hoc';
import { compose } from "lodash/fp";
import { useQuery, useMutation } from "react-fetching-library"
import { IUser, UserData, UserFilter, CreateUser, UpdateUser } from '../type';
import { withRouter } from 'react-router';
import { useMemo } from 'react';


export const UserFunctions = ({ match }: OwnProps ) => {
    const _id = match.params.userId ? match.params.userId : null;
    const action = useMemo(() => UserData({ _id }), [_id])  
    const { loading : dataLoading, payload : user, error : dataError } = useQuery<IUser, UserFilter>( action );
    const { loading : createLoading, payload : newUser, mutate : create, error : createError } = useMutation(CreateUser);
    const { loading : updateLoading, payload : updatedUser, mutate : update, error : updateError } = useMutation(UpdateUser);
    return { 
        user : newUser || updatedUser || user,
        error : dataError || createError || updateError,
        loading : dataLoading || createLoading || updateLoading,
        create,
        update
    };
};

const UserForm =  withFormik<FormProps, FormState>({
    mapPropsToValues: ({ user : {email, firstname, lastname, organisation, roles}}) => ({
        email : email ? email : "",
        firstname : firstname ? firstname : "",
        lastname : lastname ? lastname : "",
        roles : roles ? roles : [],
        organisation : organisation ? organisation : ""
    }),
    validationSchema : Validate,
    enableReinitialize : true,
    handleSubmit: (formData, { props, setSubmitting }) => {
        setSubmitting(true);
        Validate.validate(formData, {stripUnknown : true}).then( (fields) => {
            if(fields._id){
                props.update(fields)
            } else if(fields.email&&fields.firstname&&fields.lastname&&fields.organisation&&fields.roles.length){
                props.create (fields);
            } else {
                throw Error("Fields Missing");
            };

            setSubmitting(false);  
        });
    },  
    displayName: 'UserForm',
})(Layout);


export default compose (
    withRouter,
    withHook(UserFunctions)
)(UserForm);