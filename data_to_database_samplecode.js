// When saving soil data to Firestore
const newSoilData = {
    N: numericValue,
    P: numericValue,
    K: numericValue,
    temperature: numericValue,
    humidity: numericValue,
    ph: numericValue,
    rainfall: numericValue,
    timestamp: serverTimestamp(),
    userId: auth.currentUser.uid // Add this line to store the user ID
  };
  
  // Add a new document to Firestore
  const db = getFirestore();
  await addDoc(collection(db, "soilData"), newSoilData);
  