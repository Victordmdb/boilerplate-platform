import * as Yup from 'yup';
import { FormState } from "./types";

export default Yup.object().shape<FormState>({
    _id : Yup.string().notRequired(),
    email : Yup.string()
        .email("Not a valid email")
        .required('Required')
        .trim(),
    name : Yup.string().required(),
    address : Yup.string().required()
});