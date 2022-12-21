const { verifyToken, verifyTokenAuth, verifyTokenAdmin } = require("./verifyToken");
const CryptoJS = require("crypto-js");
const Cart = require("../models/Cart");

const router = require("express").Router();

// Create

router.post('/',verifyToken, async(req, res) => {
    const newCart = new Cart(req.body)
    try {
        const savedCart = await newCart.save();
        res.status(200).json(savedCart)
    } catch (error) {
        res.status(500).json(error)
    }
})
// update

// UpDATE cart
router.put("/:id", verifyTokenAuth, async (req, res) => {
   
    try {
        const updateCart = await Cart.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true });
        res.status(200).json(updateCart)
    } catch (err) {
        res.status(500).json(err)
    }
})
// DELETE USER CART
router.delete("/:id", verifyTokenAuth, async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json("Cart DELETED...")
    } catch (error) {
        res.status(500).json(error)
    }
})
// GET Cart
router.get("/find/:userId",verifyTokenAuth, async (req, res) => {
    try {
        const cart = await Cart.findOne({userId: req.params.id})
        res.status(200).json(cart)
    } catch (error) {
        res.status(500).json(err)
    }
})
// GET ALL Cart
router.get("/",verifyTokenAdmin, async (req, res) => {
    try {
           const carts =  await Cart.find();
           res.status(200).json(carts)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router