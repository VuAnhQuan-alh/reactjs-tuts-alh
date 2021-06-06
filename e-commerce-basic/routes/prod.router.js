const router = require('express').Router();
const prodCtrl = require('../controllers/prod.ctrl');
const authMiddle = require('../middleware/auth.middle');
const authAdmin = require('../middleware/auth.admin');

router.route('/product')
  .get(prodCtrl.getProds)
  .post(prodCtrl.create)

router.route('/product/:id')
  .delete(prodCtrl.delete)
  .put(prodCtrl.update)

module.exports = router;