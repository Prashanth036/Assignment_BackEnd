const express = require('express');
const {createBussinessEquityForm,
    getBusinessEquityFormDetails,
    getBussinessEquityFormDetailsById}=require("../controllers/CompanyEquityController");
const { isAuthenticateMiddleware } = require('../middleware/isAuthenicatedMiddleware');
    const router = express.Router();


    router.post("/bussiness-form",createBussinessEquityForm);
    router.get("/business-form",
        // isAuthenticateMiddleware,
        getBusinessEquityFormDetails);
    router.get('/company-equity/:id',getBussinessEquityFormDetailsById);

    module.exports=router