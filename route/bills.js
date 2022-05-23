const { Router } = require('express');

const { CreateBill, UpdateBill, ShowBillsByUser } = require('../controller/bills');

const router = Router();

router.post('/create', CreateBill);

router.post('/update', UpdateBill);

router.get('/getbyuser/:id', ShowBillsByUser);

module.exports = router;