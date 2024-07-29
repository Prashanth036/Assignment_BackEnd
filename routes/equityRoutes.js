const express = require('express');
const { createBussinessEquityForm,
    getBusinessEquityFormDetails,
    getBussinessEquityFormDetailsById, 
    deleteBussinessEquityFormById} = require("../controllers/BusinessControllers/CompanyFormController");
const { isAuthenticateMiddleware } = require('../middleware/isAuthenicatedMiddleware');
const router = express.Router();

const creatorFormController = require('../controllers/CreatorController/CreatorFormController');

// Route to create a new creator form
router.post('/creator-form', creatorFormController.createCreatorForm);

// Route to get details of a creator form by ID
router.get('/creators/:id', creatorFormController.getCreatorFormDetailsById);

// Route to get all creator forms
router.get('/creator-form', creatorFormController.getCreatorFormDetails);


router.post("/business-form", createBussinessEquityForm);
router.get("/business-form",
    // isAuthenticateMiddleware,
    getBusinessEquityFormDetails);
router.get('/company-equity/:id', getBussinessEquityFormDetailsById);
router.delete('/business-equity/:id', deleteBussinessEquityFormById);


module.exports = router