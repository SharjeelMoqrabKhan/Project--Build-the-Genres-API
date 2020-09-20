const { Rental, validate } = require('../model/rentalModel');
const { Movie } = require('../model/movieModel');
const { Customer } = require('../model/customerModel');
const mongoose = require('mongoose');
const Fawn = require('fawn');
const express = require('express');
const routes = express.Router();

Fawn.init(mongoose);

routes.get('/', async (req, res) => {
  const rentals = await Rental.find().sort('-dateOut');
  res.send(rentals);
});

routes.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send('Invalid customer.');

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send('Invalid movie.');

  if (movie.numberInStock === 0) return res.status(400).send('Movie not in stock.');

  let rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate
    }
  });
  try {
    new Fawn.Task()
      .save('rentals', rental)
      .update('movies', { _id: movie._id }, {
        $inc: { numberInStock: -1 }
      })
      .run();
    res.send(rental)
  } catch (error) {
    res.status(500).send('something failed');
  }
});

routes.get('/:id', async (req, res) => {
  const rental = await Rental.findById(req.params.id);

  if (!rental) return res.status(404).send('The rental with the given ID was not found.');

  res.send(rental);
});

module.exports = routes; 