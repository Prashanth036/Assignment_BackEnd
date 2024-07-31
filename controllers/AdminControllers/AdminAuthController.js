const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const db = require('../../models');
const { generateAccessToken } = require('../../middleware/isAuthenicatedMiddleware');

// Generate Access Token
// const generateAccessToken = (email, secret, expiresIn) => {
//   return jwt.sign({ email }, secret, { expiresIn });
// };

// Create Admin
const createAdmin = async (req, res) => {
  const {  adminId,email, password, userName } = req.body;
  console.log(adminId,email, password, userName )

  try {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Check if email or username already exists
    const existingEmail = await db.Admin.findOne({ where: { email } });
    if (existingEmail) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const existingUserName = await db.Admin.findOne({ where: { userName } });
    if (existingUserName) {
      return res.status(400).json({ message: 'Username already in use' });
    }

    // Hash password
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, salt);

    // Create new admin
    const newAdmin = await db.Admin.create({
     adminId,
      email,
      password,
     username: userName
    });

    // Generate tokens
    const accessToken = generateAccessToken(newAdmin.email, process.env.JWTADMIN_TOKEN, '10m');
    const refreshToken = generateAccessToken(newAdmin.email, process.env.REFRESH_REFRESHADMIN_TOKEN_SECRET, '24h');

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
      maxAge: 24 * 60 * 60 * 1000
    });

    res.status(201).json({ accessToken });
  } catch (err) {
    console.error('createAdmin error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Login Admin
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find admin by email
    const admin = await db.Admin.findOne({ where: { email } });

    if (!admin) {
      return res.status(400).json({ message: 'Admin not found' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect password' });
    }

    // Generate tokens
    const accessToken = generateAccessToken(admin.email, process.env.JWTADMIN_TOKEN, '2h');
    const refreshToken = generateAccessToken(admin.email, process.env.REFRESHADMIN_TOKEN_SECRET, '24h');

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
      maxAge: 24 * 60 * 60 * 1000
    });

    res.status(200).json({ accessToken });
  } catch (err) {
    console.error('loginAdmin error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get Admin by ID
const getAdminById = async (req, res) => {
  const { id } = req.params;

  try {
    const admin = await db.Admin.findByPk(id);
    if (admin) {
      res.status(200).json(admin);
    } else {
      res.status(404).json({ error: 'Admin not found' });
    }
  } catch (err) {
    console.error('getAdminById error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get All Admins
const getAdmins = async (req, res) => {
  try {
    const admins = await db.Admin.findAll();
    res.status(200).json(admins);
  } catch (err) {
    console.error('getAdmins error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update Admin
const updateAdmin = async (req, res) => {
  const { id } = req.params;
  const { password, ...payload } = req.body;

  try {
    // Hash password if provided
    if (password) {
      const salt = await bcrypt.genSalt(10);
      payload.password = await bcrypt.hash(password, salt);
    }

    const [updatedCount] = await db.Admin.update(payload, { where: { id } });

    if (updatedCount === 0) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    res.status(200).json({ message: 'Admin updated successfully' });
  } catch (err) {
    console.error('updateAdmin error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete Admin
const deleteAdmin = async (req, res) => {
  const { id } = req.params;

  try {
    const admin = await db.Admin.findByPk(id);
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    await admin.destroy();
    res.status(200).json({ message: 'Admin deleted successfully' });
  } catch (err) {
    console.error('deleteAdmin error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const totalTablesCount=async(req,res)=>{
  const employeCount=await db.Employee.count();
  const findCompaniesCount=await db.Company.count();
  const businessOffers=await db.CompanyEquity.count();
  const creatorOffers=await db.CreatorForm.count();
  const businessCount=await db.Business.count();    
  const creatorCount=await db.Creator.count();
  const partnershipCount=await db.Partnership.count();
  // const findCreatorCount=await 
  return res.status(200).json([
    // {
    //   "Total Agencies": 
    // },
    {
      "Total Employees": employeCount
    },
    {
      "Total Business": businessCount
    },
    {
      "Total Creators": creatorCount
    },
    {
      "Total Partnerships": partnershipCount
    },
    {
      "BusinnessOffers":businessOffers 
    },
     {
      "CreatorOffers":creatorOffers 
    },
   
    {
      "Find Companies": findCompaniesCount
    },
  ])
  
}

module.exports = {
  createAdmin,
  loginAdmin,
  getAdminById,
  getAdmins,
  updateAdmin,
  deleteAdmin,
  totalTablesCount
};
