import firebase from 'firebase';
var config = {
  apiKey: "AIzaSyCzOR_Jg3fT-gEL8v2AlL7ud2nHohJFRCI",
  authDomain: "league-of-cfb-serfdom.firebaseapp.com",
  databaseURL: "https://league-of-cfb-serfdom.firebaseio.com",
  projectId: "league-of-cfb-serfdom",
  storageBucket: "league-of-cfb-serfdom.appspot.com",
  messagingSenderId: "891632439052"
};
firebase.initializeApp(config);
export default firebase;
