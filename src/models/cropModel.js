// This is a simplified version of the model prediction
// In a real app, you might use TensorFlow.js or an API call

const cropModel = {
    // Simulated model prediction function
    predictTop3: (inputData) => {
      // This would be replaced with actual model inference
      // For now, we'll return mock data based on input values
      
      // Simple logic to simulate different predictions based on input
      const sum = Object.values(inputData).reduce((a, b) => a + parseFloat(b || 0), 0);
      
      if (sum > 300) {
        return [
          { crop: 'Rice', probability: 0.85 },
          { crop: 'Maize', probability: 0.72 },
          { crop: 'Cotton', probability: 0.65 }
        ];
      } else if (sum > 200) {
        return [
          { crop: 'Wheat', probability: 0.78 },
          { crop: 'Millet', probability: 0.65 },
          { crop: 'Barley', probability: 0.60 }
        ];
      } else {
        return [
          { crop: 'Chickpea', probability: 0.82 },
          { crop: 'Lentil', probability: 0.75 },
          { crop: 'Mungbean', probability: 0.68 }
        ];
      }
    }
  };
  
  export default cropModel;
  