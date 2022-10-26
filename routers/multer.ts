
import express = require('express')
import multer = require('multer')
import path = require('path')

const multerRouter = express.Router()

console.log('mailer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        console.log(file);
        
        cb(null, Date.now() + path.extname(file.originalname))
    },
})

const uploade = multer({ storage: storage })
multerRouter.get('/uploade', (req, res) => {
    res.render('uploded')
})
multerRouter.post('/uploade',uploade.array('image') ,(req, res) => {
    console.log(req.files);
    
    res.send('image uploded successfully')
})




export default multerRouter