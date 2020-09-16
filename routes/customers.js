const { userSchema, validateCustomer } = require('../model/customerModel');
const express = require('express');
const routes = express.Router();
const mongoose = require('mongoose');
routes.use(express.json());


const Customer = mongoose.model('Customer', userSchema);



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
routes.put('/:id', async (req, res) => {
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const customer = await Customer.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
        new: true
    });
    if (!customer) return res.status(404).send('not found');
    res.send(customer);
});

//deleting 
routes.delete('/:id', async (req, res) => {
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send('bad request');
    const customer = await Customer.findByIdAndRemove(req.params.id)
    if (!customer) return res.status(400).send('not found');
    res.send(customer);
});




module.exports = routes;