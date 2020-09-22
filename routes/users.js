const _ = require('lodash');
const { User, validateUser } = require('../model/userModel');
const mongoose = require('mongoose');
const express = require('express');
const routes = express.Router();


routes.post('/', async (req, res) => {

    const { error } = validateUser(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('user already register');

    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });

    await user.save();

    res.send(user);

});

module.exports = routes;