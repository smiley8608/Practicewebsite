import bodyParser = require('body-parser')
import express = require ('express')
import mongoose = require('mongoose')
import router from './routers/router'
import Cors from 'cors'
import multerRouter from './routers/multer'
let app=express()
app.use(Cors({
    origin:['http://localhost:3000'],
    methods:['POST','GET','DELETE','PUT'],
    credentials:true
}))
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.json())
console.log('running');

app.use('/multer',multerRouter)
app.use("/",router)
mongoose.connect('mongodb://localhost:27017/testnode',(err)=>{
    if(err){
    console.log(err);
    }
    console.log('DB connected successfully !');
   
    app.listen(3005,()=>{
        console.log('server connected to the port 3005');
        
    })
})