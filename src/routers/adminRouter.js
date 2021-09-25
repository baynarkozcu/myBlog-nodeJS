const router = require('express').Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware'); 


router.get('/', authMiddleware.authMiddleware,  adminController.homePage);


module.exports = router;
