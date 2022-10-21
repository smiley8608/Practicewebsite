import axios from "axios"
import { FormEvent, useState } from "react"


const ResetPassword=()=>{
    const [data,setData]=useState({newpassword:'',conformpassword:''})
    
    

    const submithandler =(e:FormEvent)=>{
        e.preventDefault()
       
    }

    return(
        <div>
            <form onSubmit={submithandler}>
                <div>
                    <label>New Password</label>
                    <input type={'password'} placeholder={"password"} value={data.newpassword} onChange={(e)=>{setData({...data,newpassword:e.target.value})}} />
                </div>
                <div>
                    <label>Conform Password</label>
                    <input type={'password'} placeholder={"password"} value={data.conformpassword} onChange={(e)=>{setData({...data,conformpassword:e.target.value})}} />
                </div>
                <button>Submit</button>
            </form>
        </div>
    )
}