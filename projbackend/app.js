const express=require("express");
const app=express();
const mongoose = require('mongoose');
require('dotenv').config();

const port=process.env.PORT || 8000;
app.listen(port,()=>{
    console.log(`app is up and running at ${port}`);
})

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true
}).then(()=>{
    console.log("Db Connected")
})
