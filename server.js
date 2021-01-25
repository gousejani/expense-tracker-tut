const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const path = require('path');

connectDB()

dotenv.config({path:'./config/config.env'});

const app = express();
// Body Parser middle ware
app.use(express.json());

if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'));
}

// Routing
const transaction = require('./routes/transactions');
const { connect } = require('./routes/transactions');
app.use('/api/v1/transactions',transaction);

if(process.env.NODE_ENV==='production'){
    app.use(express.static('client/build'));
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

const PORT = process.env.PORT||5000;
app.listen(PORT,console.log(`Server started in ${process.env.NODE_ENV} mode on port ${PORT}`.blue.bold));