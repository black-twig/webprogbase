const express = require('express');
const usersRouter = require('./usersRouter');
const museumsRouter = require('./museumsRouter');
const mediaRouter = require('./mediaRouter');

const router = express.Router();

router.use('/users', usersRouter);
router.use('/museums', museumsRouter);
router.use('/media', mediaRouter);

module.exports = router;