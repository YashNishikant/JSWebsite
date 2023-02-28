import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import {getAuth, GoogleAuthProvider, signInWithPopup} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js"

const firebaseConfig = {
  apiKey: "AIzaSyBqAEME6HTZXXYj6bPjzn_vXBryF4Gyyn4",
  authDomain: "portalview-5b9ae.firebaseapp.com",
  projectId: "portalview-5b9ae",
  storageBucket: "portalview-5b9ae.appspot.com",
  messagingSenderId: "810248528077",
  appId: "1:810248528077:web:777327e3e12021bf804984"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider(app);

login.addEventListener('click',(e)=>{
    signInWithPopup(auth, provider)
    .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;

        var email = user.email;
        email = email.replace(/\./g,'_')
        localStorage.setItem("user", email)
        location.replace("/portals.html")

    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
    });
});