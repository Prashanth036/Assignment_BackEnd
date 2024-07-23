const db = require("../models");

const createBussinessEquityForm = async (req, res) => {
  try {
    // Extract the fields from request body
    const { 
      businessName, 
      vision, 
      companyValuation, 
      equityPercentage, 
      description, 
      contactEmail, 
      founderName, 
      employeeName, 
      contactPhone, 
      address, 
      website, 
      establishedYear 
    } = req.body;

    // Create a new entry with the provided fields
    const companyEquity = await db.CompanyEquity.create({
      businessName, 
      vision, 
      companyValuation, 
      equityPercentage, 
      description, 
      contactEmail, 
      founderName, 
      employeeName, 
      contactPhone, 
      address, 
      website, 
      establishedYear
    });

    // Send the newly created entry as a response
    res.status(201).json(companyEquity);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getBussinessEquityFormDetailsById = async (req, res) => {
  const { id } = req.params;
  try {
    // Find an equity record by primary key (id)
    const equity = await db.CompanyEquity.findByPk(id);
    if (!equity) {
      return res.status(404).json({ error: 'Equity record not found' });
    }
    res.status(200).json(equity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBusinessEquityFormDetails = async (req, res) => {
  try {
    // Retrieve all equity records
    const equities = await db.CompanyEquity.findAll();
    res.status(200).json(equities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteBussinessEquityFormById = async (req, res) => {
  const { id } = req.params;
  try {
    // Find the equity record by primary key (id)
    const equity = await db.CompanyEquity.findByPk(id);
    if (!equity) {
      return res.status(404).json({ error: 'Equity record not found' });
    }

    // Delete the equity record
    await equity.destroy();
    res.status(200).json({ message: 'Equity record deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createBussinessEquityForm,
  getBussinessEquityFormDetailsById,
  getBusinessEquityFormDetails,
  deleteBussinessEquityFormById
};
