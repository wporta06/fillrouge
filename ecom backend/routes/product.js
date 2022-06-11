
const router = require('express').Router();
const { verifyTokenAndAuhorization, verifyTokenAndAdmin } = require('./middleware/Tokenverify');
const Product = require('../models/Product')
// hashing password
const CryptoJS = require("crypto-js")

// CREAT PRODUCT
router.post("/", verifyTokenAndAdmin, async (req, res) => {
    const newProduct = new Product(req.body);
    // console.log(newProduct);
    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (err) {
        res.status(500).json(err)
    }
})

// update
router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {

        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
            // take the body and set it 
            $set: req.body
            // just to show the updatedUser instancely
        }, { new: true })

        res.status(200).json(updatedProduct);
    }
    catch (err) { res.status(500).json(err); }
})

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json("Product has beeen deleteed....")
    }
    catch (err) {
        res.status(500).json(err)
    }
})

// GET PRODUCT
router.get("/find/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        res.status(200).json(product);
    } catch (err) {
        res.status(500).json(err)
    }
})

// GET ALL PRODUCTS
router.get("/", async (req, res) => {
    // do ?new=true get the new product added
    const queryNew = req.query.new;
    
    // do ?category=women get just product that has category=women  
    const queryCategory = req.query.category;
    try {
        let products;

        if (queryNew) {
            // do ?new=true get the new product added
            products = await Product.find().sort({ createdAt: -1 }).limit(2);
        } else if (queryCategory) {
            products = await Product.find({
                categories: {
                    // queryCategory is in categories
                    $in: [queryCategory],
                }
            });
        }
        // if no query by category, get all products
        else {
            products = await Product.find();
        }
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json(err)
    }
})



module.exports = router



