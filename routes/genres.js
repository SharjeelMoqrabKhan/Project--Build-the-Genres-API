const { genreSchema, validateGenre } = require('../model/genreModel');
const auth = require('../middlewear/auth');
const express = require('express');
const routes = express.Router();
const mongoose = require('mongoose');
const admin = require('../middlewear/admin');
routes.use(express.json());



const Genre = mongoose.model('Genre', genreSchema);
const validObjectId = require('../middlewear/validateObjectId');

//get genres list
routes.get('/',  async (req, res,next) => {
        const genres = await Genre.find().sort('name');
        res.send(genres);
});

//get specific genres
routes.get('/:id',validObjectId,async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).send('not found');
    res.send(genre);
});

//post request
routes.post('/', auth, async (req, res) => {
    //validation
    const { error } = validateGenre(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    let genre = new Genre({
        name: req.body.name
    });
    genre = await genre.save();
    res.send(genre);
});

//update put request

routes.put('/:id', async (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
        new: true
    });

    if (!genre) return res.status(404).send('The genre with the given ID was not found.');

    res.send(genre);
});


//delete 
routes.delete('/:id', [auth, admin], async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id)
    if (!genre) {
        return res.status(404).send('Not found');
    }

    res.send(genre)
});

module.exports = routes;