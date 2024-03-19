// todo.routes.js

const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/auth.middleware'); // Import authentication middleware
const TodoModel = require('../db/models/listmodel');

// GET all lists
router.get('/', authenticateToken, async (req, res) => {
    try {
        const lists = await TodoModel.find({ userId: req.user.id }); // Retrieve lists specific to the user
        res.send(lists);
    } catch (error) {
        console.error('Error fetching lists:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Create a new list
router.post('/', authenticateToken, async (req, res) => {
    try {
        const { sno, title, desc, active } = req.body;
        const newList = new TodoModel({ sno, title, desc, active, userId: req.user.id }); // Associate list with userconsole.log('User ID:', req.user.id); // Corrected console.log statement
        const savedList = await newList.save();
        res.json(savedList);
    } catch (error) {
        console.error('Error creating list:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Update a list
router.patch('/:id', authenticateToken, async (req, res) => {
    try {
        const updatedList = await TodoModel.findOneAndUpdate({ _id: req.params.id, userId: req.user.id }, req.body, { new: true });
        res.json(updatedList);
    } catch (error) {
        console.error('Error updating list:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Delete a list
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        await TodoModel.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
        res.json({ message: 'List deleted successfully' });
    } catch (error) {
        console.error('Error deleting list:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
