const db = require("../models");


const createBussinessEquityForm= async (req, res) => {
    try {
        // console.log(req.body)
      const companyEquity = await db.CompanyEquity.create(req.body);
    //   console.log(companyEquity)
      res.status(201).json(companyEquity);
    } catch (error) {
        // console.log(error)
      res.status(400).json({ error: error.message });
    }
  };

  const getBussinessEquityFormDetailsById = async (req, res) => {
    const { id } = req.params;
    try {
      const equity = await CompanyEquity.findByPk(id);
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
      const equities = await db.CompanyEquity.findAll();
      
      res.status(200).json(equities);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


module.exports={
    createBussinessEquityForm,
    getBussinessEquityFormDetailsById,
    getBusinessEquityFormDetails

}

