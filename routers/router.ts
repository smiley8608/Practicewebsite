
import express =require('express')
import middlerware  from '../middleware/middleware'
import * as UserControll from '../controllers/userController'
import { Routertypes } from '../types'
import { userModel } from '../models/userModel'


 const router:Routertypes = express.Router()

router.post('/signup',middlerware,UserControll.userValidation)
router.post('/login',middlerware,UserControll.logincontroller)
router.post('/changepassword',middlerware,UserControll.changepassword)
router.post('/forgetpassword',middlerware,UserControll.forgetpassword)
router.post('/resetpassword/:token',UserControll.resetpassword)
export default router