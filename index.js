const express = require ('express');
const app=express();
const home=require('./routes/home');
const genres=require('./routes/genres')
const mongoose=require('mongoose')

mongoose.connect('mongodb://localhost/vidly')
.then(()=>console.log("connected")).
catch((e)=>console.log('not connnected',e));

app.use('/',home);
app.use('/vidly.com/api/genres',genres);




const port=process.env.PORT||3000;
app.listen(port,()=>{
    console.log(`${port} listening`);
})
