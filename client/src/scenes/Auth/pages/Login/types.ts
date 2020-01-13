import { mapStateToProps, dispatchProps } from "./form";

export type FormProps = ReturnType<typeof mapStateToProps> & typeof dispatchProps & {
    email? : string;
    tempPwd? : string;
};

export type FormState = {
    email           : string;
    password        : string;
    organisation?   : string;
    verifyPassword? : string;
};