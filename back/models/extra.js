const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const extraSchema = new Schema({
    extra: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
})

module.exports = mongoose.model('Extra', extraSchema);