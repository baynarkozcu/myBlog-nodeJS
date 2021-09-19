const router = require('express').Router();
const authController = require('../controllers/authController');
const validator = require('../middlewares/validationMiddleware');

router.get('/login', authController.loginView);
router.post('/login', authController.loginUser);

router.get('/register', authController.registerView);
router.post('/register', validator.newUserValidation(), authController.registerUser);

router.get('/forget-password', authController.forgetPasswordView);
router.post('/forget-password', authController.forgetPasswordUser);


module.exports = router;