import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyBcLvLvHZQxZIHvpOzN946odx2b40iga2g",
    authDomain: "iska-41823.firebaseapp.com",
    databaseURL: "https://iska-41823-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "iska-41823",
    storageBucket: "iska-41823.appspot.com",
    messagingSenderId: "351291790298",
    appId: "1:351291790298:web:06a1026f39160c8efc66e3",
    measurementId: "G-BZR8EK0LLX"
  };

const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);
const dbRef = ref(database);

export { database, dbRef, get };
