import { FormikErrors, FormikTouched } from "formik";
import { ChangeEvent, FocusEvent } from "react";

export type Fieldprops<T> = {
    type?           : string;
    values          : T;
    errors          : FormikErrors<T>;
    touched         : FormikTouched<T>;
    handleChange    : (event: ChangeEvent<any>) => void;
    handleBlur      : (e: FocusEvent<any>) => void;
    setFieldValue?  : (value : any) => void;
    setFieldError?  : (field : string, value : any) => void;
    setFieldTouched? : (field : string, value : boolean) => void;
    isFirst?        : boolean;
};