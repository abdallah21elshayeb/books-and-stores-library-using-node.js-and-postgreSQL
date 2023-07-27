var express = require('express');
const router = express.Router();
var userCtrl = require('../Controller/userController');

router.get('/users',userCtrl.getUserList);
router.post('/users/save', userCtrl.saveUser);

module.exports = router;