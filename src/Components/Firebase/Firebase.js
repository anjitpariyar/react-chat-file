import firebase from 'firebase';

const firebaseConfig = {
     apiKey: "AIzaSyAxRYjFm_Eolie_2yHZcIb5_P-1n1yzJ70",
     authDomain: "chat-25704.firebaseapp.com",
     databaseURL: "https://chat-25704.firebaseio.com",
     projectId: "chat-25704",
     storageBucket: "chat-25704.appspot.com",
     messagingSenderId: "1056680930050",
     appId: "1:1056680930050:web:b9b4153334f0b6f9a1f01b",
     measurementId: "G-HTRGZTD10B"
}

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore()
export default db;
