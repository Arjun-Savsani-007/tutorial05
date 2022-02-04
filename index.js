var mongoose = require('mongoose')
var express = require('express')
var route = require('./routes')
var bodyParser =require('body-parser')
const port = process.env.PORT || 3000;
mongoose.connect('mongodb+srv://yash:yash2002@cluster0.xvwbv.mongodb.net/hotels?retryWrites=true&w=majority').then(()=>{
    console.log('connected')

    app = express();
    app.use(bodyParser.urlencoded({extended:false}))
    app.use('/api',route)
    
    app.get('/', (req,res)=>{
        res.sendFile('index.html',{root:__dirname})
    })

    app.listen(port,()=>{
        console.log('server started')
    })
}).catch((e)=>{
    console.log(e.toString())
})
