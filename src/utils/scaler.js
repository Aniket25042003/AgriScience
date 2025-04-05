// This is a simplified version of the scaler used in ML models
// In a real app, you would use the actual parameters from your trained model

const scaler = {
    // These would be the actual values from your trained model
    mean: {
      N: 50.55, P: 53.36, K: 48.15, 
      temperature: 25.62, humidity: 71.48, 
      ph: 6.47, rainfall: 103.46
    },
    std: {
      N: 36.99, P: 32.99, K: 50.11, 
      temperature: 5.06, humidity: 22.26, 
      ph: 0.77, rainfall: 54.96
    },
    
    // Scale the input data
    transform: (data) => {
      const scaledData = {};
      
      for (const key in data) {
        if (scaler.mean[key] !== undefined && scaler.std[key] !== undefined) {
          scaledData[key] = (parseFloat(data[key] || 0) - scaler.mean[key]) / scaler.std[key];
        }
      }
      
      return scaledData;
    }
  };
  
  export default scaler;
  