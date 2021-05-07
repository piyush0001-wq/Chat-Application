import firebase from 'firebase'
var firebaseConfig = {
  apiKey: "AIzaSyBMurD394bVeJdeYZ552E6jvUNESF_4My8",
  authDomain: "chatwithme-9828d.firebaseapp.com",
  projectId: "chatwithme-9828d",
  storageBucket: "chatwithme-9828d.appspot.com",
  messagingSenderId: "219185603997",
  appId: "1:219185603997:web:c1e17f296d978cd4cefb74"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;