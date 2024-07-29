const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// const adminRoutes = require('../routes/adminRoutes'); 
// const { authenticateAdmin } = require('../middlewares/auth'); 

const adminApp = express();

const userRoutes = require('./routes/userRoutes'); 
const equityRoutes = require('./routes/equityRoutes');



const corsOptions = {
  origin: process.env.REACT_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};


adminApp.use(express.json());
adminApp.use(express.urlencoded({ extended: true }));
adminApp.use(cookieParser());
adminApp.use(cors(corsOptions));

// Secure admin routes
// adminApp.use(authenticateAdmin);

 adminApp.use('/', userRoutes);
 adminApp.use('/', equityRoutes);


adminApp.on('mount', function (parent) {
  console.log('Admin Mounted');
  console.log(parent); // refers to the parent app
});

module.exports = adminApp;
