export interface singupModel{
    email: string,
    username: string,
    name: string,
    password: string,
    birthday: Date,
}

export interface AuthResData{
    user_id?: string,
    email: string,
    name?: string,
    birthday?: Date,
    username: string,
    token?: string,
   
}

export interface AuthResData2{
    user_id: string,
    email: string,
    name?: string,
    birthday?: Date,
    username: string,
    token?: string,
   
}

export interface loginModel{
    email: string,
    password: string
}

export interface forgotPasswordModel{
    email: string
}

export interface ChangePasswordModel{
    user_id?: string,
    email: string,
    new_password: string,
    old_password: string,
}

export interface ChangeResData{
    email: string,
    new_password: string,
    old_password: string,
}


export interface NewPasswordResData{
    token: string,
    uidb64: string,
    password: string,
}

export interface NewPasswordModel{
    user_id?: string,
    token: string,
    uidb64: string,
    password: string,
}

export class User{
    constructor(
        public user_id: string,
        public email: string,
        public username: string,
        public name: string,
        public token: string,
        public birthday: Date,
    ){}

    }