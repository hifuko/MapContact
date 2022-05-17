const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    identification: {type: String, required: true, unique:true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    password: {type: String, required: true},
    isAdmin: {type: Boolean, default: false}
});

module.exports = mongoose.model('User', productSchema);