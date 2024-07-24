const db = require('../models'); // Adjust the path according to your project structure

// Create a new partnership
const createPartnership = async (req, res) => {
  const {
    businessId,
    creatorId,
    partnershipType,
    equityShare,
    collaborationDetails,
    fundingAmount,
    startDate,
    endDate,
    status,
    terms,
    notes
  } = req.body;
  
  try {
    const newPartnership = await db.Partnership.create({
      businessId,
      creatorId,
      partnershipType,
      equityShare,
      collaborationDetails,
      fundingAmount,
      startDate,
      endDate,
      status,
      terms,
      notes
    });
    res.status(201).json(newPartnership);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all partnerships
const getAllPartnerships = async (req, res) => {
    try {
      const partnerships = await db.Partnership.findAll({
        include: [
          {
            model: db.CompanyEquity,
            // as: 'companyEquity', // Ensure this alias matches the one used in the model definition
            attributes: ['businessId', 'businessName', 'vision', 'companyValuation', 'equityPercentage', 'description', 'contactEmail', 'founderName', 'employeeName', 'contactPhone', 'address', 'website', 'establishedYear']
          },
          {
            model: db.CreatorForm,
            // as: 'creatorForm', // Ensure this alias matches the one used in the model definition
            attributes: ['creatorId', 'name', 'bio', 'age', 'contact', 'email', 'services', 'skills', 'description', 'portfolioLink', 'offerType', 'equityPercentage', 'fundingAmount', 'ideaDescription']
          }
        ]
      });
      res.status(200).json(partnerships);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

// Get a single partnership by ID
const getPartnershipById = async (req, res) => {
  const { id } = req.params;
  try {
    const partnership = await db.Partnership.findByPk(id);
    if (!partnership) {
      return res.status(404).json({ error: 'Partnership not found' });
    }
    res.status(200).json(partnership);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a partnership by ID
const updatePartnership = async (req, res) => {
  const { id } = req.params;
  const {
    businessId,
    creatorId,
    partnershipType,
    equityShare,
    collaborationDetails,
    fundingAmount,
    startDate,
    endDate,
    status,
    terms,
    notes
  } = req.body;

  try {
    const partnership = await db.Partnership.findByPk(id);
    if (!partnership) {
      return res.status(404).json({ error: 'Partnership not found' });
    }

    // Update the partnership record
    partnership.businessId = businessId || partnership.businessId;
    partnership.creatorId = creatorId || partnership.creatorId;
    partnership.partnershipType = partnershipType || partnership.partnershipType;
    partnership.equityShare = equityShare || partnership.equityShare;
    partnership.collaborationDetails = collaborationDetails || partnership.collaborationDetails;
    partnership.fundingAmount = fundingAmount || partnership.fundingAmount;
    partnership.startDate = startDate || partnership.startDate;
    partnership.endDate = endDate || partnership.endDate;
    partnership.status = status || partnership.status;
    partnership.terms = terms || partnership.terms;
    partnership.notes = notes || partnership.notes;
    await partnership.save();

    res.status(200).json(partnership);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a partnership by ID
const deletePartnership = async (req, res) => {
  const { id } = req.params;
  try {
    const partnership = await db.Partnership.findByPk(id);
    if (!partnership) {
      return res.status(404).json({ error: 'Partnership not found' });
    }

    // Delete the partnership record
    await partnership.destroy();
    res.status(200).json({ message: 'Partnership deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createPartnership,
  getAllPartnerships,
  getPartnershipById,
  updatePartnership,
  deletePartnership
};
