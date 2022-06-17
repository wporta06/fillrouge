const router = require('express').Router();
const { verifyTokenAndAuhorization, verifyTokenAndAdmin, tokenVerify } = require('./middleware/Tokenverify');
const Order = require('../models/Order')
// hashing password
const CryptoJS = require("crypto-js")

// CREATE 
router.post("/", async (req, res) => {
  console.log("ordeer")
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
  const productId = req.query.pid;
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: previousMonth },
          ...(productId && {
            products: { $elemMatch: { productId } },
          }),
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router



