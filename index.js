const express = require("express")
const { default: mongoose } = require("mongoose")
const app = express()
const moongoose = require("mongoose")
const dotenv = require("dotenv")
const userRoute = require("./routes/user")
const authRoute = require("./routes/auth")
const productRoute = require("./routes/product")
const cartRoute = require("./routes/cart")
const orderRoute = require("./routes/order")

dotenv.config()

mongoose.connect(process.env.MONGO_URL)
.then(()=>
console.log("DB Connection Successful"))
.catch((err)=>{
    console.log(err)
}) //  connect to mongodb
app.use(express.json())  // ALLOWS US USE JSON IN POSTMAN
app.use("/api/auths", authRoute) // SETS THE ROUTE USES IN USER.JS
app.use("/api/users", userRoute) // SETS THE ROUTE USES IN USER.JS
app.use("/api/products", productRoute) // SETS THE ROUTE USES IN USER.JS
app.use("/api/carts", cartRoute) // SETS THE ROUTE USES IN USER.JS
app.use("/api/orders", orderRoute) // SETS THE ROUTE USES IN USER.JS
app.listen(5000, ()=> {
    console.log("Backend server is runninng!")
} )