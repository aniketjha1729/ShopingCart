require('dotenv').config();
const express = require("express");
const app = express();
const mongoose = require('mongoose');
var bodyParser = require('body-parser')
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");



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
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);



//Port-----------------------------------------------------------------------------
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`app is up and running at ${port}`);
})