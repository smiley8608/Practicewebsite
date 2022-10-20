
export interface UserTypes {
    username: string,
    email: string,
    password: string,
    conformpassword: string
}

export interface InitialStateTypes {
    user: UserTypes|null,
    auth:boolean
}