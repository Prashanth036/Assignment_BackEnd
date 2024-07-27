const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { generateAccessToken } = require('../middleware/isAuthenicatedMiddleware');
const db = require('../models'); // Import the `db` object from `models/index.js`

// Login for Business
const LoginBusiness = async (req, res) => {
  const { email, password } = req.body;

  try {
    const business = await db.Business.findOne({ where: { email } });

    if (!business) {
      return res.status(400).json({ message: "Business not found" });
    }

    const isMatch = await bcrypt.compare(password, business.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const accessToken = generateAccessToken(business.businessName, process.env.JWTSECRET, "10m");
    const refreshToken = generateAccessToken(business.email, process.env.REFRESH_TOKEN_SECRET, "24h");

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: 'None',
      secure: false,
      maxAge: 24 * 60 * 60 * 1000
    });

    res.status(200).json({ accessToken });
  } catch (err) {
    console.error("LoginBusiness error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Login for Creator
const LoginCreator = async (req, res) => {
  const { email, password } = req.body;

  try {
    const creator = await db.Creator.findOne({ where: { email } });

    if (!creator) {
      return res.status(400).json({ message: "Creator not found" });
    }

    const isMatch = await bcrypt.compare(password, creator.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const accessToken = generateAccessToken(creator.creatorName, process.env.JWTSECRET, "10m");
    const refreshToken = generateAccessToken(creator.email, process.env.REFRESH_TOKEN_SECRET, "24h");

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: 'None',
      secure: false,
      maxAge: 24 * 60 * 60 * 1000
    });

    res.status(200).json({ accessToken });
  } catch (err) {
    console.error("LoginCreator error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create Business
const CreateBusiness = async (req, res) => {
  const { businessName, email, password } = req.body;

  try {
    let newBusiness = await db.Business.create({ businessName, email, password });

    const accessToken = generateAccessToken(newBusiness.businessName, process.env.JWTSECRET, "10m");
    const refreshToken = generateAccessToken(newBusiness.email, process.env.REFRESH_TOKEN_SECRET, "24h");

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
      maxAge: 24 * 60 * 60 * 1000
    });

    res.status(200).json({ accessToken });
  } catch (err) {
    console.error("CreateBusiness error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create Creator
const CreateCreator = async (req, res) => {
  const { creatorName, email, password } = req.body;

  try {
    let newCreator = await db.Creator.create({ creatorName, email, password });

    const accessToken = generateAccessToken(newCreator.creatorName, process.env.JWTSECRET, "10m");
    const refreshToken = generateAccessToken(newCreator.email, process.env.REFRESH_TOKEN_SECRET, "24h");

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
      maxAge: 24 * 60 * 60 * 1000
    });

    res.status(200).json({ accessToken });
  } catch (err) {
    console.error("CreateCreator error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get Business
const getBusiness = async (req, res) => {
  const { email } = req.user;

  try {
    const business = await db.Business.findOne({ where: { email } });

    if (business) {
      res.status(200).json(business);
    } else {
      res.status(404).json({ error: 'Business not found' });
    }
  } catch (err) {
    console.error("getBusiness error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get Creator
const getCreator = async (req, res) => {
  const { email } = req.user;

  try {
    const creator = await db.Creator.findOne({ where: { email } });

    if (creator) {
      res.status(200).json(creator);
    } else {
      res.status(404).json({ error: 'Creator not found' });
    }
  } catch (err) {
    console.error("getCreator error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get All Businesses
const getBusinesses = async (req, res) => {
  try {
    const businesses = await db.Business.findAll();
    res.status(200).json(businesses);
  } catch (err) {
    console.error("getBusinesses error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get All Creators
const getCreators = async (req, res) => {
  try {
    const creators = await db.Creator.findAll();
    res.status(200).json(creators);
  } catch (err) {
    console.error("getCreators error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update Business
const updateBusiness = async (req, res) => {
  const { businessId } = req.params;
  const { password, ...payload } = req.body;

  try {
    if (password) {
      const salt = await bcrypt.genSalt(10);
      payload.password = await bcrypt.hash(password, salt);
    }

    const [updatedCount] = await db.Business.update(payload, { where: { id: businessId } });

    if (updatedCount === 0) {
      return res.status(404).json({ error: 'Business not found' });
    }

    res.status(200).json({ message: 'Business updated successfully' });
  } catch (err) {
    console.error("updateBusiness error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update Creator
const updateCreator = async (req, res) => {
  const { creatorId } = req.params;
  const { password, ...payload } = req.body;

  try {
    if (password) {
      const salt = await bcrypt.genSalt(10);
      payload.password = await bcrypt.hash(password, salt);
    }

    const [updatedCount] = await db.Creator.update(payload, { where: { id: creatorId } });

    if (updatedCount === 0) {
      return res.status(404).json({ error: 'Creator not found' });
    }

    res.status(200).json({ message: 'Creator updated successfully' });
  } catch (err) {
    console.error("updateCreator error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  CreateBusiness,
  CreateCreator,
  LoginBusiness,
  LoginCreator,
  getBusiness,
  getCreator,
  getBusinesses,
  getCreators,
  updateBusiness,
  updateCreator
};

