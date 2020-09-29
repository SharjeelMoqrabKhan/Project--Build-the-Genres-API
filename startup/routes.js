const home=require('../routes/home');
const genres=require('../routes/genres');
const customers=require('../routes/customers');
const movies = require('../routes/movies');
const rantals = require('../routes/rental'); 
const users = require('../routes/users');
const auth = require('../routes/auth');
const express = require('express');
const error = require('../middlewear/error');

module.exports = function (app) {
    app.use(express.json());
    app.use('/', home);
    app.use('/vidly.com/api/genres', genres);
    app.use('/vidly.com/api/customers', customers);
    app.use('/vidly.com/api/movies', movies);
    app.use('/vidly.com/api/rantals', rantals);
    app.use('/vidly.com/api/users', users);
    app.use('/vidly.com/api/auth', auth);
    app.use(error);

}