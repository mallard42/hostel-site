const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const roomScema = new Schema({
    name: { type: String, required: true, unique: true},
    // slug: { type: String, required: false },
    type: { type: String, required: true },
    price: { type: Number, required: true },
    size: { type: Number, required: true },
    capacity: { type: Number, required: true },
    pets: { type: Boolean, required: true },
    breakfast: { type: Boolean, required: true },
    featured: { type: Boolean, required: true },
    description: { type: String, required: true },
    // extras: { type: [String], required: false },
    // images: { type: [String], required: false }
})

module.exports = mongoose.model('Room', roomScema);