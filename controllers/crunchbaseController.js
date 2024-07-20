// controllers/crunchbaseController.js
const axios = require('axios');

const API_KEY = '483c5a021478caf5ed5ac43605c824b6'; // Replace with your actual Crunchbase API key

async function fetchOrganizations(req, res) {
    const url = 'https://api.crunchbase.com/api/v4/searches/organizations?user_key=483c5a021478caf5ed5ac43605c824b6';

    // const requestBody ={
    //     "field_ids": ["identifier", "name", "short_description","image_url","uuid","website_url","facebook","permalink"],
    //     "limit": 20
    //   }
    console.log(req.body);
      
    const requestBody =req.body;
    try {
        const response = await axios.post(url, 
            requestBody,
             {
            headers: {
                // 'X-Cb-User-Key': API_KEY,
                'Content-Type': 'application/json'
            }
        });

        const organizations = response.data.entities.map(org => ({
            name: org.properties.name,
            description: org.properties.short_description,
            website: org.properties.homepage_url,
        }));

        res.json(organizations);
    } catch (error) {
        console.error('Error fetching organizations:', error.response ? error.response.data : error.message);
        res.status(error.response ? error.response.status : 500).json({
            error: error.message
        });
    }
}

module.exports = {
    fetchOrganizations
};
