const mongoose = require('mongoose');

const catSchema = new mongoose.Schema({
    catName: { type: String, unique: true, required: true},
    catDetails: { type: String, required: true, unique: true},
});






module.exports = catSchema;