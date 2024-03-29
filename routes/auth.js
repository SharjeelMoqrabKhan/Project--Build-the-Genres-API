const _ = require('lodash');
const bcrypt = require('bcrypt');
const { User } = require('../model/userModel');
const mongoose = require('mongoose');
const express = require('express');
const Joi = require('joi')
const routes = express.Router();


routes.post('/', async (req, res) => {

    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('invalid email & password');

    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if (!validPassword) return res.status(400).send('invalid email & password');

    const token = user.genrateAuthToken(); 
    res.send(token);
});

function validate(req) {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    };
    return Joi.validate(req, schema);
}

module.exports = routes;