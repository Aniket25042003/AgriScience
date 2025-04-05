// api.js

const API_URL = 'http://192.168.1.137:5001/'; // Replace with your actual IP address

export const getRecommendations = async (soilData) => {
  try {
    console.log('Sending data to API:', soilData);
    
    const response = await fetch(`${API_URL}/recommend`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(soilData),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Network response was not ok: ${errorText}`);
    }

    const recommendations = await response.json();
    console.log('Received recommendations:', recommendations);
    
    return recommendations;
  } catch (error) {
    console.error('Error getting recommendations:', error);
    throw error;
  }
};
