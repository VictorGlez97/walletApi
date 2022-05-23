
const { Router } = require('express');
const { CreatePriority, GetPrioritiesByUser, PriorityAmount } = require('../controller/priorities');

const router = Router();

// console.log(CreatePriority);

router.post('/create', CreatePriority);

router.get('/getPriorities/:id', GetPrioritiesByUser);

router.get('/getAmount/:id', PriorityAmount);

module.exports = router;
