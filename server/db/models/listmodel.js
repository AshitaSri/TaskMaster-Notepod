// todo.model.js
const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    // Your existing fields
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,  // Reference to the User model
        ref: 'User'  // Name of the referenced model
    }
});

const TodoModel = mongoose.model('Todo', todoSchema);

module.exports = TodoModel;
