const mongoose = require('mongoose');

const productModelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: false
    }
});

module.exports = mongoose.model('productModel', productModelSchema);