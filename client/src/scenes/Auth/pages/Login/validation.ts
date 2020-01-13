import zxcvbn from 'zxcvbn';
import * as Yup from 'yup';
import { FormState, FormProps } from "./types";

export default ( { forgotPassword } : FormProps ) => Yup.object().shape<FormState>({
    email : Yup.string()
        .email("Not a valid email")
        .required('Required')
        .trim(),
    organisation : Yup.string().trim(),
    password : forgotPassword ? Yup.string()
                    .min(8, "Min. 8 characters")
                    .max(30, "Max. 30 characters")
                    // .test('password-zxcvbn', 'Password is not strong enough', p => zxcvbn(p).score > 3)
                    .matches(
                        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&^])[A-Za-z\d@$!%*#?&^]{8,}$/,
                        "Must Contain at least 8 characters, including at least one of each : upperasset, lowerasset, number, and special (@$!%*#?&^) characters"
                    )
                    .test('password-zxcvbn', ({value}) => {
                        const {warning, suggestions} = zxcvbn(value).feedback;
                        return warning ? warning : suggestions && suggestions.length ? suggestions[0] : 'Password is not strong enough';
                    }, p => zxcvbn(p).score > 3)
                    .required('Required').trim()
                    : Yup.string().required('Required').trim(),
    verifyPassword : forgotPassword ? Yup.string().oneOf([Yup.ref('password'), ""], "Passwords don't match").required('Verify your Password') : Yup.string(),
});