const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const db = require('./models');
const userRoutes = require('./routes/userRoutes'); 
const  companyRoutes= require("./routes/companyRoutes")

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
  origin: 'https://creatorship-96e0e.firebaseapp.com', // Replace with your React app's URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Allow credentials (cookies, authorization )
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors(corsOptions));

// Use the user routes
app.use('/api', userRoutes);
app.use('/api', companyRoutes);


db.sequelize.authenticate()
  .then(() => db.sequelize.sync())
  .then(() => {
    console.log('Connection has been established successfully.');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = app;
