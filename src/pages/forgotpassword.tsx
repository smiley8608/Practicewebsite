import axios from "axios"
import { FormEvent, useState } from "react"


export const ForgetPassWord=()=>{
           const [data,setData]= useState({email:''})
          
           const submithandler=(e:FormEvent)=>{

            e.preventDefault()
            axios.post('/forgetpassword',{data})
            .then(responce=>{
             

                console.log(responce.data.result);
                alert(responce.data.message)
                
            })
           }
    return(
        <div className="tw-flex tw-justify-center">
            <form onSubmit={submithandler}>
                <div className="tw-mb-3 tw-mt-9">
                    <label>Email</label><br />
                    <input className="tw-bg-slate-500 tw-text-white tw-p-3 tw-rounded-lg" type={'email'} placeholder={'email'} value={data.email} onChange={(e)=>{setData({...data,email:e.target.value})}} />
                </div>
                <button className="tw-bg-slate-500 tw-p-2 tw-rounded-lg ">Submit</button>
            </form>
        </div>
    )
}