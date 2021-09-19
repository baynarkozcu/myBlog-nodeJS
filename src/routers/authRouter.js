const router = require('express').Router();
const authController = require('../controllers/authController');

router.get('/login', authController.loginView);
router.post('/login', authController.loginUser);

router.get('/register', authController.registerView);
router.post('/register', authController.registerUser);

router.get('/forget-password', authController.forgetPasswordView);
router.post('/forget-password', authController.forgetPasswordUser);


module.exports = router;