const express = require ('express');
const routes= express.Router();
const Joi=require('joi');

routes.use(express.json());

const genres=[
    {id:1,name:"Sufi"},
    {id:2,name:"Rock"},
    {id:3,name:"Jazz"}
];


//get genres list
routes.get('/',(req,res)=>{
    res.send(genres);
});

//get specific genres
routes.get('/:id',(req,res)=>{
    const genre = genres.find(e=>e.id===parseInt(req.params.id));
    if(!genre) return res.status(404).send('not found');
    res.send(genre);
});

//post request
routes.post('/',(req,res)=>{
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
routes.put('/:id',(req,res)=>{
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
routes.delete('/:id',(req,res)=>{
    const genre = genres.find(c => c.id === parseInt(req.params.id))
    if (!genre) {
        return res.status(404).send('Not found');
    }

    const index=genres.indexOf(genre);
    genres.splice(index,1);

    res.send(genre)
});

module.exports=routes;