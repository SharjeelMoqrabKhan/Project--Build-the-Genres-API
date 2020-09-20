const express = require ('express');
const app=express();
const home=require('./routes/home');
const genres=require('./routes/genres');
const customers=require('./routes/customers');
const movies = require('./routes/movies')
const mongoose=require('mongoose');


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



const port=process.env.PORT||3000;
app.listen(port,()=>{
    console.log(`${port} listening`);
})
