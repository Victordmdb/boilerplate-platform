export interface SignIn {
    email       : string;
    password    : string;
};

export interface SetUp {
    email           : string;
    password        : string;
    organisation    : string;
};

export interface AuthError {
    data        : any;
    status      : number;
    response    : any;
};
