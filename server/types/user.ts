export interface IRegisterUser {
    username: string, // s anstatt S
    mail: string,
    password: string
}

export interface IAccount {
    accountId: number,
    username: string,
    email: string,
    registeredAt: Date
    updatedAt: Date
    setup: boolean,
    isAdmin: boolean
    descripton?: string
}

export interface ICredentials{
    credentialId: number,
    accountId: number,
    password: string,
    updatedAt: Date
}

export interface ICreatedUserPromise {
    account: IAccount ,
    credentials: ICredentials
}

export enum AccountType {
    LOCAL,
    STRAVA,
    GOOGLE
}