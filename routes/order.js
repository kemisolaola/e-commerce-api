const { verifyToken, verifyTokenAuth, verifyTokenAdmin } = require("./verifyToken");
const CryptoJS = require("crypto-js");
const Order = require("../models/Order");

const router = require("express").Router();

// Create

router.post('/', verifyToken, async (req, res) => {
    const newOrder = new Order(req.body)
    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder)
    } catch (error) {
        res.status(500).json(error)

    }
})
// update

// UpDATE order
router.put("/:id", verifyTokenAdmin, async (req, res) => {

    try {
        const updateOrder = await Order.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true });
        res.status(200).json(updateOrder)
    } catch (err) {
        res.status(500).json(err)
    }
})
// DELETE USER Order
router.delete("/:id", verifyTokenAdmin, async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json("Order DELETED...")
    } catch (error) {
        res.status(500).json(err)
    }
})
// GET Order
router.get("/find/:userId", verifyTokenAuth, async (req, res) => {
    try {
        const order = await Order.find({ userId: req.params.id })
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json(error)
    }
})
// GET ALL Order
router.get("/", verifyTokenAdmin, async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json(err)
    }
})

// GET Monthly income
router.get("/income", verifyTokenAdmin, async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const prevMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
    try {
        const income = await Order.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: prevMonth
                    }
                }
            },
            {
                $project: {
                    month: {
                        $month: "$createdAt"
                    },
                    sales: "$amount"
                }
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 }
                }
            }

        ])
        res.status(200).json(income)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})
module.exports = router