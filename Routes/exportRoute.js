var express = require('express');
const router = express.Router();
var exportCtrl = require('../Controller/exportController');

router.get("/export/books" , exportCtrl.exportBooks);
module.exports = router