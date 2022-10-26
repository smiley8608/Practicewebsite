import axios from "axios"
import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../redux/hook"
import { setInitialState } from "../redux/userslice"



export const LogIn=()=>{
   const [data,setData]= useState({email:'',password:''})
    const dispatch= useAppDispatch()
    const navigate= useNavigate()
   const submithandler=(e:FormEvent)=>{
    e.preventDefault()
    axios.post('/login',{data})
    .then(success=>{
        dispatch(setInitialState({User:success.data.Userresult,Auth:success.data.Auth}))
        localStorage.setItem('jwt-token',success.data.tkn)
        alert(success.data.message)
        navigate('/')
    })
   }
    return(
        <div className="tw-flex tw-justify-center tw-mt-9">
            <form  onSubmit={submithandler}>
                <div className="tw-mb-3 tw-space-y-2">
                    <label>Email</label><br />
                    <input className="tw-bg-slate-500 tw-text-white tw-p-3 tw-rounded-lg" type={'email'} placeholder={'Email'} value={data.email} onChange={(e)=>{setData({...data,email:e.target.value})}} />
                </div>
                <div className="tw-mb-3 tw-space-y-2">
                    <label>Password</label><br />
                    <input className="tw-bg-slate-500 tw-text-white tw-p-3 tw-rounded-lg" type={'password'} placeholder={'password'} value={data.password} onChange={(e)=>{setData({...data,password:e.target.value})}} />
                </div>
                <button className="tw-bg-slate-500 tw-p-2 tw-rounded-lg ">Submit</button>
            </form>
        </div>
    )
}