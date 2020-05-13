const express = require('express');
const Users = require('../models/users-model');
const restricted = require('../middleware/restricted');

const router = express.Router();

router.get('/', restricted(), async (req, res, next) => {
    try {
        console.log(req.cookies.token);
        res.json(await Users.find());
    } catch (err) {
        next(err);
    }
})

module.exports = router;