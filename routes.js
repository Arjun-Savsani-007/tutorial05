var express = require('express');
var router = express.Router();
var Hotel = require('./Models/Hotel')
var User = require('./Models/User')
var bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')

//to fetch hotels
router.get('/hotels',async(req,res)=>{
    const ihotel = await Hotel.find()
    res.send(ihotel)
})

//to add the hotels
router.post("/hotels",async(req,res)=>{
    const ihotel = new Hotel({
        name:req.body.name,
        rating:req.body.rating
    })

    await ihotel.save((err,msg)=>{
        if(err){
            res.status(500).json({
                "error":err
            })
        }
        else{
            res.status(200).json({
                "My-message":msg
            })
        }
    })

})


// api for updating hotels

router.patch('/hotels/:id',async (req,res)=>{
    const ihotel = await Hotel.findOne({_id:req.params.id})
    ihotel.name = req.body.name
    ihotel.rating = req.body.rating
    await ihotel.save((err,msg)=>{
        if(err){
            res.status(500).json({
                error:err
            })
        }
        else{
            res.status(200).json({
                msg:msg
            })
        }
    })

})

//delete api

router.delete('/hotels/:id', async (request, response) => {   // delete by id
    const _id = request.params.id;
    const strategy = await AlgoStrategy.findByIdAndDelete(_id);
    response.send(strategy);
})


router.post('/users',async(req,res)=>{
    
    //generate salt key
    salt = await bcrypt.genSalt(10)
    console.log(salt)

    hashedpswd = await bcrypt.hash(req.body.password,salt)
    console.log(hashedpswd)

    const iuser = new User({
        uname:req.body.uname,
        password:hashedpswd
    })  
    await iuser.save((err,msg)=>{
        if(err){
            res.status(500).json({
                "error":err
            })
        }
        else{
            res.status(200).json({
                "My-message":msg
            })
        }
    })

})

module.exports = router 