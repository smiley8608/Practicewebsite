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
import { useAppSelector } from './redux/hook';
import { useAppDispatch } from './redux/hook';
import axios from 'axios';

function App() {
  const dispatch=useAppDispatch()
  const auth=useAppSelector(state=>state.User.Auth)
  useEffect(()=>{
       const token= localStorage.getItem('jwt-token')
       axios.defaults.headers.common['jwt-token']=token
  })
  return (
    <div>
      <BrowserRouter>
      <Navbar />
     <Routes>
      <Route path='/' index element={<Home />}></Route>
      <Route path='/signup' index element={<SignUp />}></Route>
      <Route path='/signout' index element={<SignOut />}></Route>
      <Route path='/login' index element={<LogIn />}></Route>
      <Route path='/forgetpassword' index element={<ForgetPassWord />}></Route>
      <Route path='/changepassword' index element={<ChangePassword />}></Route>

      </Routes> 
      </BrowserRouter>
     
    </div>
  );
}

export default App;
