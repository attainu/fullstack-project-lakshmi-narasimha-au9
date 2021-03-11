const Router = require('express')();
const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi')        // for requests validation
require('dotenv/config');


// validator Schema
const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email:Joi.string().min(6).required().email(),
    password:Joi.string().min(6).required(),
    dob:Joi.string().required().isoDate(),
    role:Joi.string()
})



// register users
Router.post('/register', async(req,res)=>{
    // validate req.body
    const {error} = schema.validate(req.body)
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

// Get all users


// Update user

// Deactivate user

// Delete user

// Authenticate/login Users




module.exports = Router;