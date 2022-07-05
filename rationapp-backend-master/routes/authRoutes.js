const { Router } = require("express");
const authController = require('../controllers/authController');
const requireAuth  = require("../middleware/authMiddleware");
const user= require("../models/user");
const admin = require("../models/admin-model");
const router = Router();


router.post('/register', authController.register_post);
router.post('/login', user.login);
router.post('/admin-panel-login', admin.login);

router.put('/admin/admin-profile/update/:id',authController.admin_update_post);
router.get('/admin/admin-profile/:id',requireAuth,authController.admin_get);
router.get('/admin/admin-shopkeeper-details', authController.details_post);
router.delete('/admin/admin-shopkeeper-details/:id', authController.user_delete);
router.get('/admin/admin-dashboard/users/',authController.admin_dashboard_users);
router.get('/admin/admin-dashboard/comp/',authController.admin_dashboard_complaints);
router.post('/admin/supply-stock',authController.admin_supply_stock);

router.post('/forgot-password/',authController.forgot_password);
router.post('/reset-password/:id/:token',authController.reset_password_post);
router.get('/reset-password/:id/:token',authController.reset_password_get);

router.put('/shopkeeper/ssprofile/update/:id',authController.update_post);
router.get('/shopkeeper/ssprofile/:id',requireAuth,authController.shopkeeper_get);
router.get('/shopkeeper/ssstockdetails',authController.stock_get);
router.get('/shopkeeper/ssstockdetails/details',authController.stock_details);
router.get('/shopkeeper/ssuserdetails/:id', authController.rationUser_get);
router.post('/shopkeeper/ssuserdetails/add-user/:id', authController.rationUser_add_post);
// router.post('/shopkeeper/ssuserdetails/delete-user/:cid', authController.rationUser_delete);
router.post('/shopkeeper/ssuserdetails/give/:id', authController.rationUser_post);
router.put('/shopkeeper/ssuserdetails/stock-update/:id', authController.stock_update_post);
//router.post('/shopkeeper/ssuserdetails/test/:id', authController.test);

router.post('/complaint', authController.complaint_post);
router.get('/admin/admin-complaint', authController.complaint_get);
router.get('/complaint', authController.shopkeepername_get);

module.exports = router;