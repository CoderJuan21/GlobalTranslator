import firebase from 'firebase';
require('@firebase/firestore')

const firebaseConfig = {
  apiKey: "AIzaSyCGKpiKjBbSg7-1JePznycCXycQzKRCR14",
  authDomain: "translator-c85f8.firebaseapp.com",
  projectId: "translator-c85f8",
  storageBucket: "translator-c85f8.appspot.com",
  messagingSenderId: "1023337447883",
  appId: "1:1023337447883:web:da1b6ee481bf25cdf7b64e"
};

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}
export default firebase.firestore()