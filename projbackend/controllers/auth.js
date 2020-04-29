const User=require("../models/user");
const { check, validationResult } = require('express-validator');
const jwt=require("jsonwebtoken");
const exprssJwt=require("express-jwt");

exports.signup=(req,res)=>{
    const error=validationResult(req);
    if(!error.isEmpty()){
        return res.status(422).json({
            error:error.array()[0].msg
        })
    }
    const user=new User(req.body)
    user.save((err,user)=>{
        if(err){
            return res.status(400).json({
                error:"Email is already in Use"
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
        if(err || !user){
            return res.status(400).json({
                errors:"User does not exits"
            })
        }
        if (!user.authenticate(password)){
            return res.status(401).json({
                errors:"Email and passord does not match"
            })
        }

        const authToken=jwt.sign({_id:user._id},process.env.SECRET);
        
        res.cookie("token",authToken,{expire:new Date()+9999});

        const {_id,name,email,role}=user;
        // console.log(user);
        return res.json({authToken,user:{
            _id,name,email,role
        }})
    })
}

exports.signout = (req, res) => {
    res.clearCookie("authToken")
    res.json({
        message: "User signout"
    })
}

//Protected Routes
exports.isSignedIn=exprssJwt({
    secret:process.env.SECRET,
    userProperty:"auth"
})

//Custom middleware:-
exports.isAuthenticated=(req,res,next)=>{
    let checker=req.profile &&req.auth && req.profile._id==req.auth._id;
    if(!checker){
        return res.status(403).json({
            errors:"Access Denied"
        })
    }
    next();
}

exports.isAdmin=(req,res,next)=>{
    if(req.profile.role===0){
        return res.status(403).json({
            error:"Access denied"
        })
    }
    next();
}