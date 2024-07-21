const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
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
const {
    createEmployee,
    loginEmployee,
    getEmployeeById,
    getEmployees,
    updateEmployee,
    deleteEmployee
  }=require("../controllers/EmployeeController");
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


//Employee Routes

router.post('/employee/login', loginEmployee);
// router.post('/employee/register', [
//   check('firstName').notEmpty().withMessage('First name is required'),
//   check('lastName').notEmpty().withMessage('Last name is required'),
//   check('email').isEmail().withMessage('Valid email is required'),
//   check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
//   check('userName').notEmpty().withMessage('Username is required')
// ], createEmployee);
router.post('/employee/register', createEmployee);
router.get('/employee', isAuthenticateMiddleware, getEmployeeById);
router.get('/employees', isAuthenticateMiddleware, getEmployees);
router.put('/employee/:employeeId', isAuthenticateMiddleware, updateEmployee);
router.delete('/employee/:employeeId', isAuthenticateMiddleware, deleteEmployee);


module.exports = router;
