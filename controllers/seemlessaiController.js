const axios = require('axios');

// Function to fetch creators from SeamlessAI or any other API
const fetchCreators = async () => {
  try {
    const response = await axios.get('https://api.seamless.ai/v1/people', {
      params: {
        // Add any required parameters here
        query: 'creator', // Example query
      },
      headers: {
        'Authorization': `Bearer YOUR_API_KEY`, // Replace with your actual API key
      },
    });

    return response.data.results; // Assuming response.data.results contains an array of creators
  } catch (error) {
    console.error('Error fetching creators:', error);
    throw new Error('Unable to fetch creators');
  }
};

// Function to get a random subset of creators
const getRandomCreators = (creators, num) => {
  const shuffled = creators.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
};

// Controller function to handle the request
const getRandomCreatorsController = async (req, res) => {
  try {
    const creators = await fetchCreators();
    const numOfRandomCreators = 5; // Number of random creators you want
    const randomCreators = getRandomCreators(creators, numOfRandomCreators);

    res.status(200).json({
      success: true,
      data: randomCreators,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getRandomCreatorsController,
};
