const express = require('express');
const {  fetchOrganizations } = require('../controllers/crunchbaseController');
const { getRandomCreatorsController } = require('../controllers/seemlessaiController');

const router = express.Router();

// Define route to get seed companies
router.post('/seed-companies', fetchOrganizations);
router.get('/people', getRandomCreatorsController);


module.exports = router;
