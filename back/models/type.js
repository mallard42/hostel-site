const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const typeSchema = new Schema({
    type: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
})

module.exports = mongoose.model('Type', typeSchema);