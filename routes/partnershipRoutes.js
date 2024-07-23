const express = require('express');
const router = express.Router();
const {
  createPartnership,
  getAllPartnerships,
  getPartnershipById,
  updatePartnership,
  deletePartnership
} = require('../controllers/PartnershipController'); // Adjust the path as needed

// Create a new partnership
router.post('/partnerships', createPartnership);

// Get all partnerships
router.get('/partnerships', getAllPartnerships);

// Get a partnership by ID
router.get('/partnerships/:id', getPartnershipById);

// Update a partnership by ID
router.put('/partnerships/:id', updatePartnership);

// Delete a partnership by ID
router.delete('/partnerships/:id', deletePartnership);

module.exports = router;
