const mongoose=require('mongoose');
const winston = require('winston');

module.exports=function(){
    mongoose.connect('mongodb://localhost/vidly',{
    keepAlive: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
.then(()=>winston.info("connected to monogoDB"))
}