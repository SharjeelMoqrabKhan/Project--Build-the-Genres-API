const express = require('express');
const routes = express.Router();
const Joi = require('joi');
const mongoose = require('mongoose');
routes.use(express.json());

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    isGold:{
        type:Boolean,
        default:false
    },
    phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
});

const Customer = mongoose.model('Customer', genreSchema);



//get genres list
routes.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
});


//get specific genres
routes.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).send('not found');
    res.send(customer);
});

//post request
routes.post('/', async (req, res) => {
    //validation
    const { error } = validateCustomer(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    let customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold,
    });
    customer = await customer.save();
    res.send(customer);
});

//update request
routes.put('/:id',async(req,res)=>{
    const {error} = validateCustomer(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const customer =  await Customer.findByIdAndUpdate(req.params.id,{name:req.body.name}, {
        new: true
      });
    if(!customer) return res.status(404).send('not found');
    res.send(customer);
});

//deleting 
routes.delete('/:id',async(req,res)=>{
    const {error} = validateCustomer(req.body);
    if(error) return res.status(400).send('bad request');
    const customer = await Customer.findByIdAndRemove(req.params.id)
    if(!customer) return res.status(400).send('not found');
    res.send(customer);
});


function validateCustomer(customer) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(5).max(50).required(),
        isGold:Joi.boolean()
    };
    return Joi.validate(customer, schema);
}

module.exports=routes;