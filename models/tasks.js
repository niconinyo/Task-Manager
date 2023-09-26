const mongoose = require('mongoose');
const catSchema = require('./category');
const taskSchema = new mongoose.Schema({
    taskName: { type: String, required: true , trim: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true},
    status: { type: String, required: true},
    dueDate: { type: Date, required: true},
    category: [catSchema],
    // creator: {
    //     type: mongoose.ObjectId,
    //     ref: 'user',
    //     required: true
    // }
});






module.exports = taskSchema;