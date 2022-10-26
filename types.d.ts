import express = require('express')
interface userProps {
    _id:string,
    username:string,
    email:string,
    password:string
}
export interface updatedRequest extends express.Request{
    User:userProps|null,
    Auth:boolean
}
export interface Routertypes extends express.IRouter {
    post:(path:string,...middleware:any)=>void
} 
export interface Mailerprops {
    result:string,
    email:string|any
}