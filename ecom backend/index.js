const express = require('express');
const app = express();

const mongoose = require('mongoose')
const dotenv = require("dotenv");
const userRoute = require('./routes/user')
const authRoute = require('./routes/auth')
const productRoute = require('./routes/product')
const cartRoute = require('./routes/cart')
const orderRoute = require('./routes/order')

var cors = require('cors');
app.use(cors());

dotenv.config();

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("db connecteddd"))
    .catch((err) => console.log(err))

//to pass any json fill
app.use(express.json())
app.use("/api/users", userRoute)
app.use("/api/auth", authRoute)
app.use("/api/products", productRoute)
app.use("/api/carts", cartRoute)
app.use("/api/orders", orderRoute)


// app.get('/api/test', (req, res) => {
//     res.send("fff")
// })


app.listen(process.env.PORT || 5000, () => {
    console.log("backk workinng finee")
})