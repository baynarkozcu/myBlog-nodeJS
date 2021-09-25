const router = require('express').Router();
const authController = require('../controllers/authController');
const validator = require('../middlewares/validationMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');


router.get('/login',authMiddleware.currentUser,  authController.loginView);
router.post('/login',authMiddleware.currentUser, validator.userLogin() ,authController.loginUser);

router.get('/register',authMiddleware.currentUser, authController.registerView);
router.post('/register',authMiddleware.currentUser, validator.newUserValidation(), authController.registerUser);

router.get('/forget-password',authMiddleware.currentUser, authController.forgetPasswordView);
router.post('/forget-password',authMiddleware.currentUser, authController.forgetPasswordUser);

router.get('/logout',authMiddleware.authMiddleware, authController.logout);


module.exports = router;