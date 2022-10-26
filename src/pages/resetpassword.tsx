import axios from "axios";
import { FormEvent, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

export const ResetPassword = () => {
    const [data,setData]=useState({newpassword:'',conformpassword:''})
  const { token } = useParams();
  const navigate= useNavigate()
//   console.log(token);
//   const concate=`/resetpassword/${token}`
//   console.log(concate);
  
  const submithandler=(e:FormEvent)=>{
    e.preventDefault()
    axios.post(`/resetpassword/${token}`,{data})
    .then(responce=>{
        console.log(responce);
        alert(responce.data.message)
        navigate('/')
    })
    .catch()
  }

  return (
    <div className="tw-flex tw-justify-center tw-mt-8">
      <form onSubmit={submithandler}>
        <div className="tw-mb-3">
          <label>New Password</label> <br />
          <input
          className="tw-bg-slate-500 tw-text-white tw-p-3 tw-rounded-lg"
            type={"password"}
            placeholder={"password"}
            value={data.newpassword}
            onChange={(e) => {
              setData({ ...data, newpassword: e.target.value });
            }}
          />
        </div>
        <div className="tw-mb-3">
          <label>Conform Password</label><br />
          <input
          className="tw-bg-slate-500 tw-text-white tw-p-3 tw-rounded-lg"
            type={"password"}
            placeholder={"password"}
            value={data.conformpassword}
            onChange={(e) => {
              setData({ ...data,conformpassword:e.target.value });
            }}
          />
        </div>
        <button className="tw-bg-slate-500 tw-p-2 tw-rounded-lg ">Submit</button>
      </form>
    </div>
  );
};
