let express = require('express');
const router = express.Router();
let loginCtrl = require('../Controller/loginController');
let jwtUtil = require('../util/jwtUtil');

router.get(
  '/login/profile/:userId',
  jwtUtil.verifyToken(['user']),
  loginCtrl.getUserProfile
);
router.post('/login/signIn', loginCtrl.signIn);
module.exports = router;
