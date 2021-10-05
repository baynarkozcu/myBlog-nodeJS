const router = require('express').Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');
const validator = require('../middlewares/validationMiddleware');
const multerConfig = require('../config/multerConfig');


router.get('/', authMiddleware.authMiddleware,  adminController.homePage);
//router.post('/addCV', authMiddleware.authMiddleware, validator.addCV(), adminController.addCV);
router.post('/addCV', authMiddleware.authMiddleware, multerConfig.single('cv'), adminController.addCV);


module.exports = router;
