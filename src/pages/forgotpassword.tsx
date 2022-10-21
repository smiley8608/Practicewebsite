import axios from "axios"
import { FormEvent, useState } from "react"
import { useAppDispatch } from "../redux/hook"

export const ForgetPassWord=()=>{
           const [data,setData]= useState({email:''})
            const dispatch=useAppDispatch()
           const submithandler=(e:FormEvent)=>{

            e.preventDefault()
            axios.post('/forgetpassword',{data})
            .then(responce=>{
                console.log(responce.data.result);
                alert(responce.data.message)
                
            })
           }
    return(
        <div>
            <form onSubmit={submithandler}>
                <div>
                    <label>Email</label>
                    <input type={'email'} placeholder={'email'} value={data.email} onChange={(e)=>{setData({...data,email:e.target.value})}} />
                </div>
                <button>Submit</button>
            </form>
        </div>
    )
}