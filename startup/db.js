const mongoose=require('mongoose');
const winston = require('winston');
const config =  require('config');

module.exports=function(){
    const getDb=config.get('db');
    mongoose.connect(getDb,{
    keepAlive: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
.then(()=>winston.info(`connected to monogoDB ${getDb}`))
}