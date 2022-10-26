import axios from "axios"
import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"




export const ChangePassword=()=>{
       const[data,setData]= useState({oldpassword:'',newpassword:'',conformnewpassword:''})
        
        const navigate=useNavigate()
       const submithandler=(e:FormEvent)=>{
        e.preventDefault()
        axios.post('/changepassword',{data})
        .then(success=>{
            alert(success.data.message)
            navigate('/')

        })
       }
    return(
        <div className="tw-flex tw-justify-center tw-mt-9">
            <form onSubmit={submithandler}>
                <div className="tw-mb-3 tw-space-y-2">
                    <label>OldPassword</label><br />
                    <input className="tw-bg-slate-500 tw-text-white tw-p-3 tw-rounded-lg" type={'password'} placeholder={'Oldpassword'} value={data.oldpassword} onChange={(e)=>{setData({...data,oldpassword:e.target.value})}}/>
                </div>
                <div className="tw-mb-3 tw-space-y-2">
                    <label>New Password</label><br />
                    <input className="tw-bg-slate-500 tw-text-white tw-p-3 tw-rounded-lg" type={'password'} placeholder={'newpassword'} value={data.newpassword} onChange={(e)=>{setData({...data,newpassword:e.target.value})}}/>
                </div>
                <div className="tw-mb-3 tw-space-y-2">
                    <label>Conform newPassword</label><br />
                    <input className="tw-bg-slate-500 tw-text-white tw-p-3 tw-rounded-lg" type={'password'} placeholder={'confrompassword'} value={data.conformnewpassword} onChange={(e)=>{setData({...data,conformnewpassword:e.target.value})}} />
                </div>
                <button className="tw-bg-slate-500 tw-p-2 tw-rounded-lg ">submit</button>
            </form>
        </div>
    )
}