const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const typeSchema = new Schema({
    type: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        monlenght: 3
    }
})

module.exports = mongoose.model('Type', typeSchema);