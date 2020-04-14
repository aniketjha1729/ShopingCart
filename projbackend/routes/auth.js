var express = require("express");
var router = express.Router();
const {signup,signout,signin,isSignedIn}=require("../controllers/auth");
const { check, validationResult } = require('express-validator');


router.post("/signup",[
    check("name").isLength({min:3}).withMessage("must be 3 cahracter"),
    check("email","email is required").isEmail(),
    check("email","password with be at least 3 character").isLength({min:3})
],signup);

router.get("/signout", signout);

router.post("/signin", [
    check("email", "email is required").isEmail(),
    check("password", "password is required").isLength({ min: 3 })
], signin);


module.exports = router;