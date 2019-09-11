const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Book = new Schema({
    title: {
        type: String
    },
    authors: {
        type: String
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    link: {
        type: String
    }
});

module.exports = mongoose.model('Book', Book);