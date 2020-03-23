import Firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCnGg44P1uDax7l3u2iYJ9ltKBliFIcDSs",
    authDomain: "apakapps-e7cb2.firebaseapp.com",
    databaseURL: "https://apakapps-e7cb2.firebaseio.com",
    projectId: "apakapps-e7cb2",
    storageBucket: "apakapps-e7cb2.appspot.com",
    messagingSenderId: "75530405207",
    appId: "1:75530405207:web:3840706185488712632a12"

};

const appConfig = Firebase.initializeApp(firebaseConfig);
export const db = appConfig.database();
export const auth = Firebase.auth();
export const time = Firebase.database.ServerValue.TIMESTAMP