
import express = require('express')
import Joi = require('joi')
import { userModel } from '../models/userModel'
import { updatedRequest } from '../types'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import Jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

import { TokenModel } from '../models/token'

dotenv.config()

const userJoiSchema = Joi.object({
    username: Joi.string().min(5).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{7,30}$")).min(5).max(15).required()
})
export const userValidation = (req: updatedRequest, res: express.Response) => {
    const { username, email, password, conformPassword } = req.body.data
    console.log({ username, email, password, conformPassword });

    if (password === conformPassword) {
        userJoiSchema.validateAsync({ username, email, password })
            .then(joivalidate => {
                console.log('running');
                userModel.find({ email: email })
                    .then(emailstatus => {
                        if (emailstatus.length > 0) {
                            return res.json({ message: 'this email id arlready exists' })
                        } else {
                            bcrypt.hash(password, 8)
                                .then(hashedpassword => {
                                    userModel.create({ username, email, password: hashedpassword })
                                        .then(result => {
                                            let token
                                            if (process.env.Token_securt) {
                                                token = Jwt.sign({ id: result._id }, process.env.Token_securt)
                                                return res.json({ message: 'Account created successfully', Userresult: result, auth: true, tkn: token })
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
    const { email, password } = req.body.data
    console.log({ email, password });

    loginjoischema.validateAsync({ email, password })
        .then(loginjoi => {
            userModel.findOne({ email: email })
                .then(userStatus => {
                    console.log(userStatus);

                    if (!userStatus) {
                        return res.json({ message: 'Could not find an account !' })
                    } else {
                        bcrypt.compare(password, userStatus.password as string)
                            .then(compPassword => {
                                if (!compPassword) {
                                    return res.json({ message: 'please check the password' })

                                } else {

                                    let token
                                    if (process.env.Token_securt) {
                                        token = Jwt.sign({ id: userStatus._id }, process.env.Token_securt)
                                        return res.json({ message: 'Account log in successfully', Userresult: userStatus, Auth: true, tkn: token })
                                    }
                                }
                            })
                            .catch(err => {
                                return res.json({ message: err })
                            })
                    }
                })
                .catch(err => {
                    return res.json({ message: err })
                })
        })
        .catch(err => {
            return res.json({ message: err })
        })
}
const joipasswordschema = Joi.object({
    oldpassword: Joi.string().pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{7,30}$")),
    newpassword: Joi.string().pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{7,30}$"))
})
export const changepassword = (req: updatedRequest, res: express.Response) => {
    const { oldpassword, newpassword, conformnewpassword } = req.body.data
    if (newpassword === conformnewpassword) {
        userModel.findOne({ _id: req.User?._id })
            .then(responceid => {
                console.log(responceid);

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

const emailjoi = Joi.object({
    email: Joi.string().email().required()
})

export const forgetpassword = async (req: updatedRequest, res: express.Response) => {
    const { email } = req.body.data

    emailjoi.validateAsync({ email })
    try {
        const useremail = await userModel.findOne({ email: email })
        if (!useremail) {
            return res.json({ message: 'please enter the valid email id' })
        } else {
            let userToken = await TokenModel.findOne({ email: useremail.email })
            console.log('running');
            if (!userToken) {
                userToken = await new TokenModel({
                    email: useremail.email,
                    token: crypto.randomBytes(32).toString("hex")
                }).save()
                const link = `http://localhost:3000/resetpassword/${userToken.token}`
                return res.json({ message: 'Reset link sent to you successfully', result: link })
            }
        }
    }
    catch (err) {
        return res.json({ message: err })
    }
}

export const resetpassword = (req: updatedRequest, res: express.Response) => {
    const schema = Joi.object({
        newpassword: Joi.string().pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{7,30}$")).required(),
        conformpassword: Joi.string().pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{7,30}$")).required(),
    })


    const { newpassword, conformpassword } = req.body.body
    if (newpassword === conformpassword) {

        schema.validateAsync({ newpassword })
            .then(validatepass => {
                TokenModel.findOne({ token: req.params.token })
                    .then(tokenobject => {
                        if (!tokenobject) {
                            return res.json({ message: 'Invalid entery or token expried' })
                        } else {
                            bcrypt.hash(newpassword, 8)
                                .then(hashedpass => {
                                    userModel.updateOne({ email: tokenobject.email }, { password: hashedpass })
                                        .then(responce => {
                                            return res.json({ message: 'password updated successfully' })
                                        })
                                        .catch(err => {
                                            return res.json({ message: err })
                                        })

                                })
                                .catch(err => {
                                    return res.json({ message: err })
                                })
                        }
                    })
                    .catch(err => {
                        return res.json({ message: err })
                    })
            })
            .catch(err => {
                return res.json({ message: err })
            })
    } else {
        return res.json({message:'please check the password'})

    }


}