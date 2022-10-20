
import express = require('express')
import Joi = require('joi')
import { userModel } from '../models/userModel'
import { updatedRequest } from '../types'
import bcrypt from 'bcryptjs'
import Jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const userJoiSchema = Joi.object({
    username: Joi.string().min(5).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{7,30}$")).min(5).max(15).required()
})
export const userValidation = (req: updatedRequest, res: express.Response) => {
    const { username, email, password, conformPassword } = req.body
    if (password === conformPassword) {
        userJoiSchema.validateAsync({ username, email, password })
            .then(joivalidate => {
                userModel.find({ email: email })
                    .then(emailstatus => {
                        if (emailstatus.length > 0) {
                            return res.json({ message: 'please check your email id' })
                        } else {
                            bcrypt.hash(password, 8)
                                .then(hashedpassword => {
                                    userModel.create({ username, email, password: hashedpassword })
                                        .then(result => {
                                            let token
                                            if (process.env.Token_securt) {
                                                token = Jwt.sign({ id: result._id }, process.env.Token_securt)
                                                return res.json({ message: 'Account created successfully', User: result, auth: true, tkn: token })
                                            }
                                        })
                                        .catch(err => {
                                            return res.json({ message: 'account can not created' })
                                        })
                                })
                                .catch(err => {
                                    return res.json({ message: 'Something went wrong' })
                                })
                        }
                    })
                    .catch(err => {
                        return res.json({ message: 'Something went wrong' })
                    })
            })
            .catch(err => {
                return res.json({ message: 'Something went wrong' })
            })

    } else {
        return res.json({ message: 'please check the password' })
    }
}

const loginjoischema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{7,30}$")).min(5).max(15).required()
})

export const logincontroller = (req: updatedRequest, res: express.Response) => {
    const { email, password } = req.body

    loginjoischema.validateAsync({ email, password })
        .then(loginjoi => {
            userModel.findOne({ email: email })
                .then(userStatus => {
                    if (!userStatus) {
                        return res.json({ message: 'Could not find an account !' })
                    } else {
                        bcrypt.compare(password, userStatus.password as string)
                            .then(compPassword => {
                                let token
                                if (process.env.Token_securt) {
                                    token = Jwt.sign({ id: userStatus._id }, process.env.Token_securt)
                                    return res.json({ message: 'Account log in successfully', User: userStatus, Auth: true, tkn: token })
                                }
                            })
                            .catch()
                    }
                })
                .catch()
        })
        .catch()
}
const joipasswordschema = Joi.object({
    oldpassword: Joi.string().pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{7,30}$")),
    newpassword: Joi.string().pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{7,30}$"))
})
export const changepassword = (req: updatedRequest, res: express.Response) => {
    const { oldpassword, newpassword, conformnewpassword } = req.body
    if (newpassword === conformnewpassword) {
        userModel.findOne({ id: req.User?._id })
            .then(responceid => {
                const idpassword = responceid?.password
                bcrypt.compare(oldpassword, idpassword as string)
                    .then(comparepassword => {
                        console.log(comparepassword);
                        if (comparepassword) {
                            joipasswordschema.validateAsync({ oldpassword, newpassword })
                                .then(joivalidate => {
                                    bcrypt.compare(newpassword, idpassword as string)
                                        .then(compPassword => {
                                            if (!compPassword) {
                                                bcrypt.hash(newpassword, 8)
                                                    .then(responce => {
                                                        userModel.findByIdAndUpdate(req.User?._id, { password: responce })
                                                            .then(updatedpassword => {

                                                                return res.json({ message: 'password changed sucessfuly' })
                                                            })
                                                    })
                                            } else {
                                                return res.json({ message: 'please check the inputs' })
                                            }
                                        })
                                        .catch(err => {
                                            return res.json({ message: 'please check the input values' })
                                        })
                                })
                                .catch(err => {
                                    return res.json({ message: 'please check the input values' })
                                })

                        } else {
                            return res.json({ message: 'please check the password' })
                        }


                    })
                    .catch()
            })
            .catch()



    } else {
        return res.json({ message: 'please check the input values' })
    }
}

