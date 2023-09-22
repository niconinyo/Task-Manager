const mongoose = require('mongoose');
const catSchema = require('./category');
const taskSchema = new mongoose.Schema({
    taskName: { type: String, unique: true, required: true , trim: true },
    title: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true, unique: true, trim: true},
    status: { type: String, required: true},
    dueDate: { type: Date, required: true},
    category: [catSchema]
});






module.exports = taskSchema;