const express = require('express');
const Joi=require('joi')
const app=express();
app.use(express.json());

const genres=[
    {id:1,name:"Sufi"},
    {id:2,name:"Rock"},
    {id:3,name:"Jazz"}
];

app.get('/',(req,res)=>{
    res.send('working');
});

//get genres list
app.get('/vidly.com/api/genres',(req,res)=>{
    res.send(genres);
});

//get specific genres
app.get('/vidly.com/api/genres/:id',(req,res)=>{
    const genre = genres.find(e=>e.id===parseInt(req.params.id));
    if(!genre) return res.status(404).send('not found');
    res.send(genre);
});

//post request
app.post('/vidly.com/api/genres',(req,res)=>{
    //validation
    const {error}=validateGenre(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }
    const genre={
        id:genres.length+1,
        name:req.body.name
    }
    genres.push(genre);
    res.send(genres);
});

//update put request
app.put('/vidly.com/api/genres/:id',(req,res)=>{
    const genre = genres.find(e=>e.id===parseInt(req.params.id));
    if(!genre)res.status(404).send('not found');
    res.send(genre);

    const {error}=validateGenre(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
        
    }
    genre.name=req.body.name;
    res.send(genre);
});

function validateGenre(genres){
    const schema={
        name:Joi.string().min(3).required()
    };
    return Joi.validate(genres,schema);
}

//delete 
app.delete('/vidly.com/api/genres/:id',(req,res)=>{
    const genre = genres.find(c => c.id === parseInt(req.params.id))
    if (!genre) {
        return res.status(404).send('Not found');
    }

    const index=genres.indexOf(genre);
    genres.splice(index,1);

    res.send(genre)
});

const port=process.env.PORT||3000;
app.listen(port,()=>{
    console.log(`${port} listening`);
})
