require('dotenv').config();
const express = require("express");
const app = express();
const mongoose = require('mongoose');
var bodyParser = require('body-parser')
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoutes = require("./routes/auth");


//Db connect:----------------------------------------------------------------------
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("Db Connected")
})
//Using Middleware----------------------------------------------------------------
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
//Routes---------------------------------------------------------------------------
app.use("/api", authRoutes);



//Port-----------------------------------------------------------------------------
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`app is up and running at ${port}`);
})