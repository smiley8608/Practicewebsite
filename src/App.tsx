import React, { useEffect } from 'react';
import './App.css';
import { Navbar } from './component/navbar';
import {BrowserRouter,Route, Routes} from 'react-router-dom'
import { Home } from './pages/home';
import { SignUp } from './pages/signup';
import { SignOut } from './pages/signout';
import { LogIn } from './pages/login';
import { ForgetPassWord } from './pages/forgotpassword';
import { ChangePassword } from './pages/changepassword';
import axios from 'axios';
import { ResetPassword } from './pages/resetpassword';


function App() {
 
  
  useEffect(()=>{
       const token= localStorage.getItem('jwt-token')
       axios.defaults.headers.common['jwt-token']=token
  })
  return (
    <div>
      <BrowserRouter>
      <Navbar />
     <Routes>
      <Route path='/' index element={<Home />} />
      <Route path='/signup' index element={<SignUp />} />
      <Route path='/signout' index element={<SignOut />} />
      <Route path='/resetpassword/:token' element={<ResetPassword />} />
      <Route path='/login' index element={<LogIn />} />
      <Route path='/forgetpassword' index element={<ForgetPassWord />} />
      <Route path='/changepassword' index element={<ChangePassword />} />

      </Routes> 
      </BrowserRouter>
     
    </div>
  );
}

export default App;
