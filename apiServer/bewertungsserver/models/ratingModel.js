const mongoose = require('mongoose');

const ratingModelSchema = new mongoose.Schema({
    productID: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: false
    }
})

//wir müssen das Model nach außen sichtbar machen
module.exports = mongoose.model('ratingModel', ratingModelSchema);