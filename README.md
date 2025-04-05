# AgriScience - End-to-End Agricultural Solution

AgriScience is an end-to-end agricultural solution that helps optimize farming practices using advanced technologies. The system integrates crop recommendations, an irrigation system based on the selected crop, and a plant disease detection model. It combines machine learning, IoT sensors, and real-time data to improve crop management and yield.

## Features

- **Crop Recommendation System**: Recommends the most suitable crops based on soil and environmental data, helping farmers make informed decisions.
- **Irrigation System**: Once the crop is selected, an automated irrigation system is activated based on the crop’s specific water requirements. This system is powered by NodeMCU and IoT sensors.
- **Plant Disease Detection**: The system uses a machine learning model to detect plant diseases based on images, although it hasn't been integrated into the app yet.
- **Real-Time Data**: Integrates with IoT sensors to collect real-time data like soil moisture, temperature, and humidity, and uses this information to guide irrigation decisions.

## Technologies Used

- **Backend**: Python, Flask
- **Machine Learning**: Scikit-learn, TensorFlow (for disease detection and crop recommendation)
- **IoT**: NodeMCU, Arduino Language, and various IoT sensors for soil moisture, temperature, and humidity
- **Mobile App**: React Native with Expo (for cross-platform mobile app development)
- **Database**: Firebase (Realtime Database for sensor data, Firestore for recommendations and user data)
- **Version Control**: Git, GitHub

## Getting Started

### Prerequisites

- Python 3.x
- Firebase account
- Node.js (for React Native)
- Expo CLI (`npm install -g expo-cli`)
- Arduino IDE (for IoT and NodeMCU)
- A code editor (VS Code, PyCharm, etc.)

### Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/Aniket25042003/AgriScience.git
    cd AgriScience
    ```

2. **Install Python dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

3. **Set up Firebase**:
    - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
    - Add your Firebase configuration to the project (e.g., `firebase.json`).

4. **Install React Native dependencies (via Expo)**:
    - Install Expo CLI if you haven't already:
      ```bash
      npm install -g expo-cli
      ```
    - Install dependencies:
      ```bash
      npm install
      ```

5. **Set up Arduino and IoT**:
    - Install the [Arduino IDE](https://www.arduino.cc/en/software).
    - Set up NodeMCU with your desired IoT sensors (e.g., soil moisture, temperature, humidity sensors).
    - Upload the irrigation system code to NodeMCU using Arduino Language.

6. **Run the backend server**:
    - Navigate to the backend directory and start the flask server
    ```bash
    cd backend
    python3 app.py
    ```

7. **Run the mobile app**:
    - Start the app with Expo:
      ```bash
      npx expo start
      ```

### Usage

- **Crop Recommendation**: Users can input environmental and soil data through the mobile app to get crop recommendations.
- **Irrigation Control**: Once the crop is selected, the system will automatically adjust the irrigation system using IoT sensors based on the crop’s water needs.
- **Plant Disease Detection**: Currently, the plant disease detection model is in development but can be integrated into the app in future versions.

### Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Make your changes and commit (`git commit -am 'Add feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Firebase](https://firebase.google.com/) for real-time database and hosting.
- [NodeMCU](https://www.nodemcu.com/) and [Arduino IDE](https://www.arduino.cc/en/software) for IoT integration.
- [TensorFlow](https://www.tensorflow.org/) for machine learning models.
- [React Native](https://reactnative.dev/) and [Expo](https://expo.dev/) for mobile app development.
