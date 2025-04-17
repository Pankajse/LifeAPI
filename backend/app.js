require('dotenv').config();
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user.route")
const locationRoutes = require("./routes/location.route")
const chatbotRoutes = require("./routes/chatbot.route")
const bloodRoutes = require("./routes/blood.route")
const orgRoutes = require("./routes/org.route")
const chatRoutes = require('./routes/chat.route');

const app = express();
mongoose.connect(process.env.DB_URL,{useNewUrlParser : true,useUnifiedTopology : true})
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
app.use('/chatbot',chatbotRoutes);
app.use('/bloodServices',bloodRoutes);
app.use('/org',orgRoutes);
app.use('/api/chat', chatRoutes);



module.exports = app
