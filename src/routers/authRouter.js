const router = require('express').Router();
const authController = require('../controllers/authController');
const adminController = require('../controllers/adminController');
const validator = require('../middlewares/validationMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');


router.get('/',authMiddleware.authMiddleware,adminController.homePage );


router.get('/login',authMiddleware.currentUser,  authController.loginView);
router.post('/login',authMiddleware.currentUser, validator.userLogin() ,authController.loginUser);

router.get('/register',authMiddleware.currentUser, authController.registerView);
router.post('/register',authMiddleware.currentUser, validator.newUserValidation(), authController.registerUser);

router.get('/forget-password',authMiddleware.currentUser, authController.forgetPasswordView);
router.post('/forget-password',authMiddleware.currentUser, validator.emailValidation(), authController.forgetPasswordUser);

router.get('/reset-password', authMiddleware.currentUser, authController.resetPasswordView);
router.post('/reset-password', authMiddleware.currentUser, validator.resetPassword(),  authController.resetPassword);
router.get('/reset-password/:id/:token', authMiddleware.currentUser, authController.resetPasswordView);


router.get('/logout',authMiddleware.authMiddleware, authController.logout);

router.get('/verify',authMiddleware.currentUser, authController.verify );


module.exports = router;