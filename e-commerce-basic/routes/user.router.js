const router = require('express').Router();
const userCtrl = require('../controllers/user.ctrl');
const authMiddle = require('../middleware/auth.middle');

router.post('/register', userCtrl.Register);
router.get('/refresh_token', userCtrl.RefreshToken);
router.post('/login', userCtrl.Login);
router.get('/logout', userCtrl.Logout);
router.get('/info', authMiddle, userCtrl.GetUser);
router.patch('/add_cart', authMiddle, userCtrl.AddCart);

router.get('/history', authMiddle, userCtrl.History);

module.exports = router;