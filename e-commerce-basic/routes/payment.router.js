const router = require('express').Router();
const paymentCtrl = require('../controllers/payment.ctrl');
const authMiddle = require('../middleware/auth.middle');
const authAdmin = require('../middleware/auth.admin');

router.route('/payment')
  .get(authMiddle, authAdmin, paymentCtrl.list)
  .post(authMiddle, paymentCtrl.create)


module.exports = router;