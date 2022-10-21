import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useAppSelector } from "../redux/hook"


export const Navbar=()=>{
   const auth= useAppSelector((state)=>state.User.Auth)
    useEffect(()=>{

    })

    return(
        <div className="tw-bg-blue-500 tw-w-full tw-flex tw-p-6 tw-justify-end tw-gap-x-6">
            <Link to="/">Home</Link>
            {
                auth ? <>
                <Link to="/changepassword">changePassword</Link>
                <Link to="/signout">SignOut</Link>
                </>
                
                :<>
                <Link to="/signup">SignIn</Link>
                <Link to="/login">LogIn</Link>
                <Link to="/forgetpassword">ForgetPassWord</Link>
                </>
            }

        </div>
    )
}