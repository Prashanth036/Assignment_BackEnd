const { Company } = require('../models'); // Import the Company model
const db = require('../models');

// Create a new company
const createCompany = async (req, res) => {
  const { name, address, contactEmail, contactPhone, website, description } = req.body;
// console.log(req.body)
  try {
    const company = await db.Company.create({ name, address, contactEmail, contactPhone, website, description });
    res.status(201).json(company);
  } catch (err) {
    console.error("createCompany error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all companies
const getAllCompanies = async (req, res) => {
  try {
    const companies = await db.Company.findAll();
    res.status(200).json(companies);
  } catch (err) {
    console.error("getAllCompanies error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get a single company by ID
const getCompanyById = async (req, res) => {
  const { companyId } = req.params;

  try {
    const company = await db.Company.findByPk(companyId);

    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }

    res.status(200).json(company);
  } catch (err) {
    console.error("getCompanyById error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update a company by ID
const updateCompany = async (req, res) => {
  const { companyId } = req.params;
  const { name, address, contactEmail, contactPhone, website, description } = req.body;

  try {
    const [updatedCount] = await db.Company.update(
      { name, address, contactEmail, contactPhone, website, description },
      { where: { id: companyId } }
    );

    if (updatedCount === 0) {
      return res.status(404).json({ error: 'Company not found' });
    }

    res.status(200).json({ message: 'Company updated successfully' });
  } catch (err) {
    console.error("updateCompany error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a company by ID
const deleteCompany = async (req, res) => {
  const { companyId } = req.params;

  try {
    const deletedCount = await db.Company.destroy({ where: { id: companyId } });

    if (deletedCount === 0) {
      return res.status(404).json({ error: 'Company not found' });
    }

    res.status(200).json({ message: 'Company deleted successfully' });
  } catch (err) {
    console.error("deleteCompany error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createCompany,
  getAllCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany
};
