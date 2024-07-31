const db = require("../../models");

// Create a new creator form
const createCreatorForm = async (req, res) => {
  try {
    // Extract the fields from the request body
    const { 
      name, 
      bio,
      age, 
      contact, 
      email, 
      services, 
      skills, 
      description, 
      portfolioLink, 
      offerType, 
      equityPercentage, 
      fundingAmount, 
      ideaDescription,
      employeeId
    } = req.body;

    // Create a new entry with the provided fields
    const creator = await db.CreatorForm.create({
      name, 
      bio,
      age, 
      contact, 
      email, 
      services, 
      skills, 
      description, 
      portfolioLink, 
      offerType, 
      equityPercentage, 
      fundingAmount, 
      ideaDescription,employeeId
    });

    // Send the newly created entry as a response
    res.status(201).json(creator);
  } catch (error) {
    console.log()
    res.status(400).json({ error: error });
  }
};

// Get details of a creator form by ID
const getCreatorFormDetailsById = async (req, res) => {
  const { id } = req.params;
  try {
    // Find a creator record by primary key (id)
    const creator = await db.CreatorForm.findByPk(id);
    if (!creator) {
      return res.status(404).json({ error: 'Creator record not found' });
    }
    res.status(200).json(creator);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all creator forms
const getCreatorFormDetails = async (req, res) => {
  try {
    // Retrieve all creator records
    const creators = await db.CreatorForm.findAll();
    res.status(200).json(creators);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createCreatorForm,
  getCreatorFormDetailsById,
  getCreatorFormDetails
};
