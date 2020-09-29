require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');
const config = require('config');
const Joi = require('joi')
Joi.objectId=require('joi-objectid')(Joi);
const express = require ('express');
const app=express();
const mongoose=require('mongoose');
require('./startup/routes')


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

// const p = Promise.reject(new Error('somthing gone miserably'));
// p.then(()=>console.log('done'));

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



const port=process.env.PORT||3000;
app.listen(port,()=>{
    console.log(`${port} listening`);
})
