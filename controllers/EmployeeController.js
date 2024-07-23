const { Employee } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { generateAccessToken } = require('../middleware/isAuthenicatedMiddleware');
const { validationResult } = require('express-validator');
const db = require('../models');


// Create Employee
const createEmployee = async (req, res) => {
  const { firstName, lastName, email, password, userName } = req.body;

  try {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Check if email or username already exists
    const existingEmail = await db.Employee.findOne({ where: { email } });
    if (existingEmail) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const existingUserName = await db.Employee.findOne({ where: { userName } });
    if (existingUserName) {
      return res.status(400).json({ message: 'Username already in use' });
    }

    // Create new employee
    const newEmployee = await db.Employee.create({
      firstName,
      lastName,
      email,
      password,  // The password will be hashed in the model's `set` method
      userName
    });

    // Generate tokens
    const accessToken = generateAccessToken(newEmployee.email, process.env.JWTSECRET, "10m");
    const refreshToken = generateAccessToken(newEmployee.email, process.env.REFRESH_TOKEN_SECRET, "24h");

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
      maxAge: 24 * 60 * 60 * 1000
    });

    res.status(201).json({ accessToken });
  } catch (err) {
    console.error("createEmployee error:", err);
    res.status(500).json(err);
  }
};

const loginEmployee = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find employee by email
    const employee = await db.Employee.findOne({ where: { email } });

    if (!employee) {
      return res.status(400).json({ message: "Employee not found" });
    }

    // Check password
    const isMatch = employee.validPassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    // Generate tokens
    const accessToken = generateAccessToken(employee.email, process.env.JWTSECRET, "30m");
    const refreshToken = generateAccessToken(employee.email, process.env.REFRESH_TOKEN_SECRET, "24h");

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
      maxAge: 24 * 60 * 60 * 1000
    });

    res.status(200).json({ accessToken });
  } catch (err) {
    console.error("loginEmployee error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};


// Get Employee by ID
const getEmployeeById = async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await db.Employee.findByPk(id);
    if (employee) {
      res.status(200).json(employee);
    } else {
      res.status(404).json({ error: 'Employee not found' });
    }
  } catch (err) {
    console.error("getEmployeeById error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get All Employees
const getEmployees = async (req, res) => {
  try {
    const employees = await db.Employee.findAll();
    res.status(200).json(employees);
  } catch (err) {
    console.error("getEmployees error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update Employee
const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { password, ...payload } = req.body;

  try {
    // Hash password if provided
    if (password) {
      const salt = await bcrypt.genSalt(10);
      payload.password = await bcrypt.hash(password, salt);
    }

    const [updatedCount] = await db.Employee.update(payload, { where: { id } });

    if (updatedCount === 0) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.status(200).json({ message: 'Employee updated successfully' });
  } catch (err) {
    console.error("updateEmployee error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete Employee
const deleteEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await db.Employee.findByPk(id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    await employee.destroy();
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (err) {
    console.error("deleteEmployee error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createEmployee,
  loginEmployee,
  getEmployeeById,
  getEmployees,
  updateEmployee,
  deleteEmployee
};
