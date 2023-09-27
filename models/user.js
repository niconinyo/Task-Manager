// Require the Mongoose package
const mongoose = require('mongoose');
// Create a schema to define the properties of the pets collection
const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true , trim: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true},
    email: { type: String, required: true, unique: true, trim: true, lowercase: true, match:/.+\@.+\..+/,},
    password: { type: String, required: true, trim: true }
});

// Export the schema as a Monogoose model. 
// The Mongoose model will be accessed in `models/index.js`
module.exports = mongoose.model('user', userSchema);