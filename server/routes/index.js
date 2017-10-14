import express from 'express';
import path from 'path';

const router = express.Router();


router.get('/', function (req, res) {
    res.sendFile(path.resolve('index.html'));
})

module.exports = router;