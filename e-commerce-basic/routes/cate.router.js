const router = require('express').Router();
const cateCtrl = require('../controllers/cate.ctrl');
const authMiddle = require('../middleware/auth.middle');
const authAdmin = require('../middleware/auth.admin');

router.route('/category')
  .get(cateCtrl.getCates)
  .post(authMiddle, authAdmin, cateCtrl.create)

router.route('/category/:id')
  .delete(authMiddle, authAdmin, cateCtrl.delete)
  .put(authMiddle, authAdmin, cateCtrl.update)


module.exports = router;