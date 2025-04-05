const { initializeApp } = require("firebase/app");
const { getDatabase, ref, get } = require("firebase/database");
const { getFirestore, collection, doc, setDoc, getDocs, Timestamp } = require("firebase/firestore");

// Firebase Realtime Database Config
const realtimeConfig = {
    apiKey: "AIzaSyAOiiTwMP3JgI0r3F70nMszxMkYWYLJNQM",
    authDomain: "ai-enable-iot-project.firebaseapp.com",
    databaseURL: "https://ai-enable-iot-project-default-rtdb.firebaseio.com",
    projectId: "ai-enable-iot-project",
    storageBucket: "ai-enable-iot-project.firebasestorage.app",
    messagingSenderId: "198309728677",
    appId: "1:198309728677:web:254f4130b676247514984c"
};

// Firebase Firestore Config
const firestoreConfig = {
    apiKey: "AIzaSyCc-Tg6QfOGWV1BGNXIkk36Jv_-pp4JjBI",
    authDomain: "agriscience-a65ad.firebaseapp.com",
    projectId: "agriscience-a65ad",
    storageBucket: "agriscience-a65ad.firebasestorage.app",
    messagingSenderId: "265446873897",
    appId: "1:265446873897:web:6cdc8988d13df20f3d3538",
    measurementId: "G-SQDLSS2MS0"
};

// Initialize Firebase for both databases
const realtimeApp = initializeApp(realtimeConfig, "realtime");
const firestoreApp = initializeApp(firestoreConfig, "firestore");

const realtimeDb = getDatabase(realtimeApp);
const firestoreDb = getFirestore(firestoreApp);

// Predefined userId
const USER_ID = "xl9fEx0QajZI9fVLdiUvyg216El2";

// Function to generate random values for N, P, K
const getRandomValue = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Function to get the next available document name (entry1, entry2, ...)
async function getNextEntryName() {
  const soilDataCollection = collection(firestoreDb, "soilData");
  const snapshot = await getDocs(soilDataCollection);
  
  let maxEntry = 0;
  
  snapshot.forEach(doc => {
      const match = doc.id.match(/^entry(\d+)$/);
      if (match) {
          const num = parseInt(match[1], 10);
          if (num > maxEntry) {
              maxEntry = num;
          }
      }
  });

  return `entry${maxEntry + 1}`;
}

// Function to sync data from Realtime Database to Firestore
async function syncData() {
  try {
    const sensorRef = ref(realtimeDb, "/");
    const snapshot = await get(sensorRef);

    if (snapshot.exists()) {
      const sensorData = snapshot.val();
      console.log("📡 Retrieved sensor data:", sensorData);

      // Prepare the new data object with random values for pH and rainfall
      const newData = {
        N: getRandomValue(10, 100),
        P: getRandomValue(10, 100),
        K: getRandomValue(10, 100),
        humidity: sensorData.Humidity || 0,       
        temperature: sensorData.Temperature || 0, 
        moisture: sensorData.SoilMoisture || 0,   
        ph: getRandomValue(5, 10),  // ✅ Random pH value between 5-10
        rainfall: getRandomValue(50, 200),  // ✅ Random rainfall value between 50-200
        timestamp: Timestamp.now(),  // ✅ Firestore Timestamp
        userId: USER_ID
      };

      // Get the next available document name
      const nextEntryName = await getNextEntryName();

      // Add data to Firestore with sequential document names
      await setDoc(doc(firestoreDb, "soilData", nextEntryName), newData);
      console.log(`✅ Data added to Firestore as ${nextEntryName}:`, newData);
    } else {
      console.log("⚠ No sensor data found in Realtime Database.");
    }
  } catch (error) {
    console.error("❌ Error syncing data:", error);
  }
}

// Run the script every 30 seconds
setInterval(syncData, 30000);

console.log("🔄 Sync script is running every 30 seconds...");
