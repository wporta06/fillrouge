
const router = require('express').Router();
const { verifyTokenAndAuhorization, verifyTokenAndAdmin, tokenVerify } = require('./middleware/Tokenverify');
const Order = require('../models/Order')
// hashing password
const CryptoJS = require("crypto-js")

// CREATE 
router.post("/", tokenVerify, async (req, res) => {
    const newOrder = new Order(req.body);
    // console.log(newOrder);
    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    } catch (err) {
        res.status(500).json(err)
    }
})

// UPDATE
router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {

        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
            // take the body and set it 
            $set: req.body
            // just to show the updatedUser instancely
        }, { new: true })

        res.status(200).json(updatedOrder);
    }
    catch (err) { res.status(500).json(err); }
})

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json("Order has beeen deleteed....")
    }
    catch (err) {
        res.status(500).json(err)
    }
})

// GET USER ORDERS
router.get("/find/:userId", verifyTokenAndAuhorization, async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.userId });

        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json(err)
    }
})

// GET ALL
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        const orders = await Order.find()
        res.status(200).json(orders)
    } catch (err) {
        res.status(500).json(err)
    }
})

//GET ALL orders statistics
router.get("/income", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

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
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router



