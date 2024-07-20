const express = require('express');
const router = express.Router();
const {
    CreateBusiness,
    CreateCreator,
    LoginBusiness,
    LoginCreator,
    getBusiness,
    getCreator,
    getBusinesses,
    getCreators,
    updateBusiness,
    updateCreator
  
} = require('../controllers/AuthorizationController');
const { isAuthenticateMiddleware } = require('../middleware/isAuthenicatedMiddleware');

// Business Routes
router.post('/business/login', LoginBusiness);
router.post('/business/register', CreateBusiness);
router.get('/business', isAuthenticateMiddleware, getBusiness);
router.get('/businesses', isAuthenticateMiddleware, getBusinesses);
router.put('/business/:businessId', updateBusiness);

// Creator Routes
router.post('/creator/login', LoginCreator);
router.post('/creator/register', CreateCreator);
router.get('/creator', isAuthenticateMiddleware, getCreator);
router.get('/creators', isAuthenticateMiddleware, getCreators);
router.put('/creator/:creatorId', updateCreator);

module.exports = router;
