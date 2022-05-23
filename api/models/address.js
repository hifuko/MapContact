const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    street: {type: String, required: true},
    postCode: {type: Number, required: true},
    city: {type: String, required: true},
    country: {type: String, required: true},
    isPrivate: {type: Boolean, required: true},
    latitude: {type: String, required: true},
    longitude: {type: String, required: true}
});

module.exports = mongoose.model('Address', productSchema);