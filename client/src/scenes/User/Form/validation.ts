import * as Yup from 'yup';
import { FormState } from "./types";
import { Roles } from '../type';

export default Yup.object().shape<FormState>({
    _id : Yup.string().notRequired(),
    email : Yup.string()
        .email("Not a valid email")
        .required('Required')
        .trim(),
    organisation : Yup.lazy( value => value && Yup.object({
        _id : Yup.string().required('Requires an Organisation'),
        name : Yup.string().strip(true)
    })),
    firstname : Yup.string().required(),
    lastname : Yup.string().required(),
    roles   : Yup.array()
        .of(Yup.mixed().oneOf(Roles))
        .required('Requires at least 1'),
});