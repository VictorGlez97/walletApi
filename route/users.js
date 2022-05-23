const { Router, response } = require('express');
const { CreateUser, LoginUser } = require('../controller/users');

const router = Router();

router.post('/create', CreateUser);

router.post('/login', LoginUser);

module.exports = router;
