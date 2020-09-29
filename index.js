require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');
const config = require('config');
const Joi = require('joi')
Joi.objectId=require('joi-objectid')(Joi);
const express = require ('express');
const error = require('./middlewear/error')
const app=express();
const home=require('./routes/home');
const genres=require('./routes/genres');
const customers=require('./routes/customers');
const movies = require('./routes/movies');
const rantals = require('./routes/rental'); 
const users = require('./routes/users');
const auth = require('./routes/auth')
const mongoose=require('mongoose');


process.on('uncaughtException',(ex)=>{
    console.log('Unexpexted exception');
    winston.error(ex.message,ex);
    process.exit(1);
});

process.on('unhandledRejection',(ex)=>{
    console.log('we got unhandle rejection');
    winston.error(ex.message,ex);
    process.exit(1);
});

winston.add(winston.transports.File, {filename:'logfile.log'});
winston.add(winston.transports.MongoDB,{
db:'mongodb://localhost/vidly',
leve:'error'
});

// throw new Error('somthing failed during startup'); unahndle  exception

const p = Promise.reject(new Error('somthing gone miserably'));
p.then(()=>console.log('done'));

if(!config.get('jwtPrivateKey')){
    console.log('Fatal error jwt not defined');
    process.exit(1);
}

mongoose.connect('mongodb://localhost/vidly',{
    keepAlive: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
.then(()=>console.log("connected")).
catch((e)=>console.log('not connnected',e));

app.use(express.json());
app.use('/',home);
app.use('/vidly.com/api/genres',genres);
app.use('/vidly.com/api/customers',customers);
app.use('/vidly.com/api/movies',movies);
app.use('/vidly.com/api/rantals',rantals);
app.use('/vidly.com/api/users',users);
app.use('/vidly.com/api/auth',auth);
app.use(error);


const port=process.env.PORT||3000;
app.listen(port,()=>{
    console.log(`${port} listening`);
})
