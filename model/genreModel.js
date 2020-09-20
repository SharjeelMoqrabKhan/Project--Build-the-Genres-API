const Joi = require('joi');
const mongoose = require('mongoose')

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
});

const Genre=mongoose.model('Genre',genreSchema);

function validateGenre(genres) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(genres, schema);
}

exports.genreSchema=genreSchema;
exports.Genre=Genre;
exports.validateGenre=validateGenre;