
const router = require('express').Router();
const { verifyTokenAndAuhorization, verifyTokenAndAdmin } = require('./middleware/Tokenverify');
const User = require('../models/User')
// hashing password
const CryptoJS = require("crypto-js")

// update
router.put('/:id', verifyTokenAndAuhorization, async (req, res) => {
    console.log('first')
    console.log(req.body)
    // to hash the pass
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.JWT_SECRET).toString();
    }
    try {
        console.log(req.body)
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            // take the body and set it 
            $set: req.body
            // just to show the updatedUser instancely
        }, { new: true })

        res.status(200).json(updatedUser);
    }
    catch (err) { res.status(500).json(err); }
})

//DELETE
router.delete("/:id", verifyTokenAndAuhorization, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("user beeen deleteed....")
    }
    catch (err) {
        res.status(500).json(err)
    }
})

// GET USER (must hase admin in token to get others)
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        // to not show the password
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err)
    }
})

// GET ALLUSERs
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    const query = req.query.new;
    try {
        // to get the last 1 created ?new=true
        const users = query ? await User.find().sort({ _id: -1 }).limit(5) : await User.find()
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err)
    }
})


// get status 1:15
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date()
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))
    try {

        const data = await User.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 }
                }
            }
        ])
        res.status(200).json(data)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router






// router.get('/usertest', (req, res) => {
//     res.send("teestoooo")
// })

// router.post('/userposttest', (req, res) => {
//     const username = req.body.username;
//     res.send(username)
//     // console.log(username)
// })