const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../models/users-model');

const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await Users.findBy('username', username).first();
        const validPassword = await bcrypt.compare(password, user.password);
        if (user && validPassword) {
            const tokenPayload = {
                userId: user.id,
                userDept: user.department
            };
            console.log(tokenPayload);
            res.cookie('token', jwt.sign(tokenPayload, process.env.JWT_SECRET));
            res.status(200).json({
                message: `Logged in: ${user.username}`
            });
        } else {
            return res.status(401).json({
                message: 'You shall not pass! Invalid credentials.'
            });
        }
    } catch (err) {
        next(err);
    }
});

module.exports = router;