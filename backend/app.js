require('dotenv').config();
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user.route")
const locationRoutes = require("./routes/location.route")

const app = express();
mongoose.connect("mongodb+srv://pankaj42se:sKjeJTZYUDQkCdIz@cluster0.wjy2t.mongodb.net/healthcare",{useNewUrlParser : true,useUnifiedTopology : true})
.then(()=>{
    console.log("Connected to MongoDB");
}).catch((err)=>{
    console.log("Error connecting to MongoDB",err);
})

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));



app.get("/",(req,res)=>{
    res.json({msg : "Hello World"})
})

app.use("/users",userRoutes);
app.use('/location',locationRoutes);


module.exports = app
