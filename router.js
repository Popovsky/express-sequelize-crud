const {Router} = require('express');
const usersRouter = require('./routes/users');

const router = Router();

router.use('/users', usersRouter);

module.exports = router;
