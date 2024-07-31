const express = require('express');
const router = express.Router();

const adminController=require("../controllers/AdminControllers/AdminAuthController");



router.post("/create",adminController.createAdmin);
router.get("/getAdmins",adminController.getAdmins);
router.post("/login",adminController.loginAdmin);


module.exports = router