
const router = require('express').Router();
const { verifyTokenAndAuhorization, verifyTokenAndAdmin, tokenVerify } = require('./middleware/Tokenverify');
const Cart = require('../models/Cart')
// hashing password
const CryptoJS = require("crypto-js")

// CREATE 
router.post("/", tokenVerify, async (req, res) => {
    const newCart = new Cart(req.body);
    // console.log(newCart);
    try {
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    } catch (err) {
        res.status(500).json(err)
    }
})

// update
router.put('/:id', verifyTokenAndAuhorization, async (req, res) => {
    try {

        const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
            // take the body and set it 
            $set: req.body
            // just to show the updatedUser instancely
        }, { new: true })

        res.status(200).json(updatedCart);
    }
    catch (err) { res.status(500).json(err); }
})

//DELETE
router.delete("/:id", verifyTokenAndAuhorization, async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json("Cart has beeen deleteed....")
    }
    catch (err) {
        res.status(500).json(err)
    }
})

// GET USER CART
router.get("/find/:userId", verifyTokenAndAuhorization, async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId });

        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json(err)
    }
})

// GET ALL
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        const carts = await Cart.find()
        res.status(200).json(carts)
    } catch (err) {
        res.status(500).json(err)
    }
})



module.exports = router



