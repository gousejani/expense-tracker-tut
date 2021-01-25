const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');
dotenv.config({path:'./config/config.env'});
// const MONGO_URI="mongodb+srv://user632:user632@cluster0.mqojf.mongodb.net/expenseTracker?retryWrites=true&w=majority"

const connectDB = async() =>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI,{useUrlParser:true, useCreateIndex:true,useUnifiedTopology:true});
        console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline.bold);
    }catch(err){
        console.log(`Error: ${err.message}`.red);
        process.exit(1);
    }
} 

module.exports = connectDB;