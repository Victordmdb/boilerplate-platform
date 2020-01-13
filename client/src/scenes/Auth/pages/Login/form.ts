import { withFormik } from 'formik';
import { connect } from 'react-redux';

import Layout from "./layout";
import Validate from "./validation";
import { State } from 'modules/reducers';

import Modules from 'modules/actions';

import { FormState, FormProps } from "./types";

export const mapStateToProps = ({ auth, general } : State ) => {
    const { forgotPassword, error } = auth;
    const { loader, serverConnected, initRoot } = general;
    return { forgotPassword, loader, serverConnected, initRoot, error }
};

export const dispatchProps = {
    userSignIn : Modules.auth.userSignIn.request,
    initServer : Modules.general.initServer.request
    // initiateForgotPassword : initiateForgotPassword.request,
    // completeForgotPassword : completeForgotPassword.request,
    // setForgotPassword : setForgotPassword,
}

const SignInForm =  withFormik<FormProps, FormState>({
    mapPropsToValues: ({email,tempPwd}) => ({
        email: email ? email : "",
        password: tempPwd ? tempPwd : "",
        verifyPassword : "",
    }),
    validationSchema : (props : FormProps) => Validate(props),
    enableReinitialize : true,
    handleSubmit: (formData, { props, setSubmitting }) => {
        setSubmitting(true);
        Validate(props).validate(formData, {stripUnknown : true}).then( ({ email, password, organisation }) => {
            if (props.initRoot && email && password && organisation){
                props.initServer({ email, password, organisation });
            } else if(email && password){
                props.userSignIn ({ email, password });
            } else {
                throw Error("Fields Missing");
            };

            setSubmitting(false);  
        });
    },  
    displayName: 'SignInForm',
  })(Layout);

export default connect (mapStateToProps, dispatchProps) (SignInForm);