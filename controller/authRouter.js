const Router = require('express')();
const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi');        // for requests validation
const Jwt =  require('jsonwebtoken');
require('dotenv/config');


// validator Schema
const registerSchema = Joi.object({
    name: Joi.string().min(6).required(),
    email:Joi.string().min(6).required().email(),
    password:Joi.string().min(6).required(),
    dob:Joi.string().required().isoDate(),
    role:Joi.string()
})

const loginSchema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
})



// register users
Router.post('/register', async(req,res)=>{
    // validate req.body
    const {error} = registerSchema.validate(req.body)
    if(error) return res.status(400).send(error)
    
    const hashed_password = await bcrypt.hashSync(req.body.password, 9);
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashed_password,
        DOB: req.body.dob,
        role: req.body.role? req.body.role: 'User'
    })
    try{
        await user.save()
        res.status(200).send("registered successfully")
    }catch(err){
        res.status(500).send(err)
    }
    
})


// Authenticate/login Users
Router.post('/login',async(req, res)=>{
    const {error} = loginSchema.validate(req.body)
    if(error) return res.status(400).send(error)
    const user = {
        email: req.body.email,
        password: req.body.password
    }
    try{
        let data = await User.findOne({email:user.email})
        
        if(data ){
            const isValidPswd = await bcrypt.compareSync(user.password, data.password);
            if(isValidPswd){
                const token = Jwt.sign({id:data._id}, process.env.JWTSECRET, {expiresIn:'1d'})
                res.status(200).send({token})
            }

        }else{
            res.status(200).send("User not found")
        }
    }catch(err){
        res.status(500).send(err)
    }
    
})



// Get all users
Router.get('/users', async(req,res)=>{
    const token = req.headers['x-access-token'];
    const start = req.query.start?Number(req.query.start):0
    Jwt.verify(token, process.env.JWTSECRET, async(err, data)=>{
        if (err) return res.send('invalid token');
        try{
            let user = await User.findById(data.id)
            if(user.role=="Admin"){
                const  users = await User.find({},{skip:start},{limit:10}).exec();
                res.status(200).send(users)
            }else{
                res.status(200).send("You're not authorized to get usersdata")
            }
            
            
        }catch(err){
            res.send({err, error:"invalid userId"})
        }
        

    })
})



// Update user

// Deactivate user

// Delete user






module.exports = Router;