const router = require('express').Router();
const User = require('../models/User')
// hashing password
const CryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken")


// SIGN UP
router.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SECRET).toString(),
    });
    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json(err)
    }
})

// LOGIN 
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        !user && res.status(401).json("Wroong userr")

        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SECRET);

        // CryptoJS.enc.Utf8 if using spicial carracter(ar...)
        const orpassword = hashedPassword.toString(CryptoJS.enc.Utf8)

        orpassword !== req.body.password &&
            res.status(401).json('Wrong pass')

        // generate the accessToken
        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin,
        },
            process.env.JWT_SECRET,
            { expiresIn: "3d" }
        )
        // to hide password 
        const { password, ...others } = user._doc;
        res.status(200).json({ others, accessToken })
    }
    catch (err) {
        res.status(500).json(err)
    }
})


module.exports = router