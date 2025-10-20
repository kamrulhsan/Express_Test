const express = require('express');
const router = express.Router();
const User = require('../models/user');
const authMiddleware = require('../middleware/authMiddleware');

 
router.get('/', authMiddleware, async (req, res) => {
    const users = await User.find({});
    res.json(users);
});

router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
});

router.post('/', async (req, res) => {
    const user = new User(req.body);
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
        return res.status(400).json({ message: 'Name, email and password are required' });
    }
    await user.save();
    res.status(201).json(user);
});

module.exports = router;