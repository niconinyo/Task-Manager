const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    taskName: { type: String, required: true , trim: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true},
    status: { type: String, required: true},
    dueDate: { type: Date, required: true},
    creator: {
        type: mongoose.ObjectId,
        ref: 'user',
        
    }
});






module.exports = mongoose.model('tasks', taskSchema);