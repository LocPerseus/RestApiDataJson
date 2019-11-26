const express = require('express');
const fs = require('fs');
const router = express.Router();

// -------------USER--------------
const users = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/users.json`));
const getAllUser = (req, res) => {
    res.status(200).json({
        status: 'success',
        result: users.length,
        data: {
            users
        }
    })
};
router
    .route('/')
    .get(getAllUser);
module.exports = router;