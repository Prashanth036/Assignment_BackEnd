const express = require('express');
const {  fetchOrganizations } = require('../controllers/crunchbaseController');
const { getRandomCreatorsController } = require('../controllers/seemlessaiController');

const router = express.Router();
const {
    createCompany,
    getAllCompanies,
    getCompanyById,
    updateCompany,
    deleteCompany
  } = require('../controllers/CompanyController');

  const { isAuthenticateMiddleware } = require('../middleware/isAuthenicatedMiddleware');


// Define route to get seed companies
router.post('/seed-companies', fetchOrganizations);
router.get('/people',isAuthenticateMiddleware, getRandomCreatorsController);

//for company table

router.post('/companies', 
    // isAuthenticateMiddleware,
     createCompany);

// Get all companies
router.get('/companies', 
    // isAuthenticateMiddleware,
     getAllCompanies);

// Get a single company by ID
router.get('/companies/:companyId', isAuthenticateMiddleware, getCompanyById);

// Update a company by ID
router.put('/companies/:companyId', isAuthenticateMiddleware, updateCompany);

// Delete a company by ID
router.delete('/companies/:companyId', isAuthenticateMiddleware, deleteCompany);


module.exports = router;
