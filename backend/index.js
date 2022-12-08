const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const userRouter = require("./routes/userRouter")
const app = express();

dotenv.config();

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGODB_URL)
.then(()=>console.log("DB connection success"))
.catch((err)=>console.log(err))

app.use(express.json());
app.use('/api/user', userRouter);
// app.use('/api/product',productRouter);

app.listen(5000,()=>{
    console.log("backend server running");
})

