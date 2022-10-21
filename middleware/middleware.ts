
import express = require('express')
import { updatedRequest, userProps } from '../types'
import dotenv from 'dotenv'
import Jwt, { Secret } from 'jsonwebtoken'
import { userModel } from '../models/userModel'
import mongoose from 'mongoose'
dotenv.config()
const middlerware = (req: updatedRequest, res: express.Response, next: express.NextFunction) => {

    const token = req.headers['jwt-token'] as string
    const envsecret = process.env.Token_securt as Secret
    console.log('code');
    
    if (token && envsecret) {

        try {

            let verify = Jwt.verify(token, envsecret)
            let decoded: any = Jwt.decode(token)
            if (req.path === '/signup' || req.path === '/login') {
               return res.json({message:'entry resticted'})
                
            } else if (req.path !== '/signup' && req.path !== '/login' && req.path !== '/forgetpassword') {
                console.log('ijhh');
                
                userModel.findById(decoded.id)
                    .then(ress => {
                        console.log(ress);
                        
                         req.User = ress as unknown as userProps
                        next()
                    })
                    .catch(err=>{
                        console.log(err);
                        
                    })
            }
        } catch (err) {
            if (req.path === '/signup' || req.path === '/login') {
                next()
            } else {
                return
            }

        }

    } else {
        if (req.path === '/signup' || req.path === '/login'||req.path==='/forgetpassword') {
            console.log('shh');
            
             next()
        } else {
            return res.json({ Auth: false, User: null })
        }
    }

}

export default middlerware