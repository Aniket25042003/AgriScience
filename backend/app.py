from flask import Flask, request, jsonify
import pickle
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from flask_cors import CORS

# Load the pre-trained model and scaler
model = pickle.load(open('crop.pkl', 'rb'))
scaler = pickle.load(open('scaler.pkl', 'rb'))

# Define the Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes


# Define a function to get top 3 recommended crops
def top_3_recommended_crop(model, input_data):
    # Get probability predictions for all classes
    probabilities = model.predict_proba(input_data)
    
    # Get the indices of the top 3 probabilities
    top_3_indices = np.argsort(probabilities[0])[-3:][::-1]
    
    # Get the corresponding class labels and probabilities
    top_3_crops = model.classes_[top_3_indices]
    top_3_probs = probabilities[0][top_3_indices]
    
    # Create a list of tuples with crop and probability
    recommendations = list(zip(top_3_crops, top_3_probs))
    
    return recommendations

# Define the root route
@app.route('/')
def home():
    return "Crop Recommendation API is running!"

# Define the recommendation endpoint
@app.route('/recommend', methods=['POST'])
def recommend():
    try:
        data = request.get_json()
        print("Received data:", data)
        sample_data = pd.DataFrame(data, index=[0])  # Convert input to DataFrame
        print("DataFrame:", sample_data)
        input_data = scaler.transform(sample_data)  # Use transform, not fit_transform
        print("Scaled data:", input_data)
        recommendations = top_3_recommended_crop(model, input_data)
        print("Recommendations:", recommendations)
        response = [{"crop": crop, "probability": float(prob)} for crop, prob in recommendations]
        print("Response:", response)  # Debug print

        return jsonify(response)

    except Exception as e:
        print("Error:", str(e))
        return jsonify({"error": str(e)})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
