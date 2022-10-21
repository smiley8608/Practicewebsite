import { FormEvent, useEffect, useState } from "react"
import {UserTypes} from '../types'
import { useAppDispatch,useAppSelector } from "../redux/hook" 
import axios from "axios"
import { setInitialState } from "../redux/userslice"
import { useNavigate } from "react-router-dom"


export const SignUp=()=>{
    const dispatch=useAppDispatch()
   const auth= useAppSelector(state=>state.User.Auth)
    const [data,setData]= useState<UserTypes>({username:'',email:'',password:'',conformPassword:''})
    const navigate=useNavigate()
    
    const submitHandler=(e:FormEvent)=>{
        e.preventDefault()
        if(!auth){
            axios.post('/signup',{data})
            .then(responce=>{
                dispatch(setInitialState({User:responce.data.Userresult,Auth:responce.data.auth}))
                localStorage.setItem('jwt-token',responce.data.tkn)
                alert(responce.data.message)
                navigate('/login')
            })
            .catch(err=>{
                console.log(err);
                
            })
        }

    }

    return(
        <div className="tw-flex tw-justify-center tw-mt-7">
           <form onSubmit={submitHandler}>
            <div className="tw-gap-y-2 tw-mb-3">
                <label>Username</label><br />           
                <input className="tw-bg-slate-500 tw-text-white" type={'text'} placeholder={'username'} value={data.username} onChange={(e)=>{setData({...data,username:e.target.value})}} />
            </div>
            <div className="tw-gap-y-2 tw-mb-3">
                <label>Email</label><br />           
                <input  className="tw-bg-slate-500 tw-text-white"  type={'email'} placeholder={'email'} value={data.email} onChange={(e)=>{setData({...data,email:e.target.value})}}/>
            </div>
            <div className="tw-gap-y-2 tw-mb-3">
                <label>Password</label><br />           
                <input className="tw-bg-slate-500 tw-text-white"  type={'password'} placeholder={'password'} value={data.password} onChange={(e)=>{setData({...data,password:e.target.value})}}/>
            </div>
            <div className="tw-gap-y-2 tw-mb-3">
                <label>Conform Password</label> <br></br>
                <input  className="tw-bg-slate-500 tw-text-white"   type={'password'} placeholder={'ConformPassword'} value={data.conformPassword} onChange={(e)=>{setData({...data,conformPassword:e.target.value})}} />
            </div>
            <button className="tw-bg-slate-500 tw-p-2 tw-rounded-lg">Submit</button>
           </form>
        </div>
    )
}