
export interface UserTypes {
    username: string,
    email: string,
    password: string,
    conformPassword: string
}

export interface InitialStateTypes {
    User: UserTypes|null,
    Auth:boolean
}

export interface mailerprops {
    host:string,
    port:number,
    user:string
}