let express = require('express');
const router = express.Router();
let paypalCtrl = require('../Controller/paypalController');

router.get("/buy" , paypalCtrl.createPayment);

module.exports = router