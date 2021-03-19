const express = require('express');
const Router = express.Router();
const Question = require('../models/QuestionModel');
const jwt = require('jsonwebtoken');
require('dotenv');



// post a question
Router.post('/new', (req,res)=>{
    if(req.headers.cookie){
        const token = req.headers.cookie.split("x-access-token=")[1];
        jwt.verify(token, process.env.JWTSECRET, async(error, data)=>{
            try{
                if(error) return error;
                const userId = data.id;
                console.log(data)
                const question = new Question({
                    questioner: userId,
                    category:req.body.category,
                    question: req.body.question
                })
                try{
                    const qdata = await question.save((err,data)=>{
                        if(err) return err;
                        res.status(200).send({message:"question published successfully"});
                    })
                }catch(err){
                    res.status(501).send({error:"server error, please try again later"})
                }

            }
            catch(error){
                res.status(403).send({error})
            }
        })
    }
    else{
        res.status(403).send({error:"You need to login first to post a question"})
    }
})

// get questions of respective user 
Router.get('/',(req,res)=>{
    const q = req.query;
    res.send(q)
})


// search questions

// update question

// delete question


module.exports = Router;
