const User=require("../models/user");
const { check, validationResult } = require('express-validator');
const jwt=require("jsonwebtoken");
const exprssJwt=require("express-jwt");

exports.signup=(req,res)=>{
    // console.log("Req Body", req.body);
    // res.json({
    //     message:"User signed in"
    // })
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            errors:errors.array()[0].msg
        })
    }
    const user=new User(req.body)
    user.save((err,user)=>{
        if(err){
            return res.status(400).json({
                err:"Not able to save in db"
            })
        }
        res.json({
            name:user.name,
            email:user.email,
            id:user._id
        })
    })
}

exports.signin=(req,res)=>{
    const {email,password}=req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()[0].msg
        })
    }
    User.findOne({email},(err,user)=>{
        if(err){
            return res.json(400).json({
                errors:"User does not exits"
            })
        }
        if(!user.authenticate(password)){
            return res.status(401).json({
                errors:"Email and passord does not match"
            })
        }

        const authToken=jwt.sign({_id:user._id},process.env.SECRET);
        
        res.cookie("token",token,{expire:new Date()+9999});

        const {_id,name,email,role}=user;
        return res.json({token,user:{
            _id,name,email,role
        }})
    })
}

exports.signout = (req, res) => {
    res.json({
        message: "User signout"
    })
}