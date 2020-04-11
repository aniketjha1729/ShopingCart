const express = require("express");

const app = express();

const port = 3000;
app.get("/", (req, res) => {
    return res.send("hello world");
});

app.get("/admin", (req, res) => {
    return res.send("hello bye");
})

//playground:--------------------------------------------------------------------------------------------------
const mytry = (req, res) => {
    return res.send("try block");
}
const middlewaretry = (req, res, next) => {
    console.log("midlle ware is working")
    next()
}

app.get("/try", middlewaretry, mytry);
app.listen(port, () => {
    console.log("app is running");
})