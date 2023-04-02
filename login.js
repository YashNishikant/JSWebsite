import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import {getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js"

const firebaseConfig = {
  apiKey: "AIzaSyBqAEME6HTZXXYj6bPjzn_vXBryF4Gyyn4",
  authDomain: "portalview-5b9ae.firebaseapp.com",
  projectId: "portalview-5b9ae",
  storageBucket: "portalview-5b9ae.appspot.com",
  messagingSenderId: "810248528077",
  appId: "1:810248528077:web:777327e3e12021bf804984"
};

let app;
// Initialize Firebase
if (getApps().length < 1) {
  app = initializeApp(firebaseConfig);
}

const auth = getAuth(app)
const provider = new GoogleAuthProvider(app);
const message = document.getElementById("message")
const login = document.getElementById("login")

loadWelcome();

logout.addEventListener('click',(e)=>{
    localStorage.removeItem("userName")
    localStorage.removeItem("authint")

    signOut(auth);
    loadWelcome();
})


login.addEventListener('click',(e)=>{
    if(!localStorage.getItem("userName")){
    signInWithPopup(auth, provider)
    .then((result) => {  
        var user = result.user
        console.log("signin way")
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        var email = user.email;
        message.textContent="Welcome " + localStorage.getItem("userName")
        email = email.replace(/\./g,'_')
        localStorage.setItem("userName", user.displayName);
        localStorage.setItem("user", user.uid)
        localStorage.setItem("authint", 1)
        location.replace("/portals.html")
    })
  }
  else{
      location.replace("/portals.html")
  }
});


function loadWelcome(){

  try{
    if(getAuth().currentUser)
      message.textContent="Welcome " + localStorage.getItem("userName")
    else
      message.textContent="Sign In"

    if(localStorage.getItem("authint")==1){
        login.innerText="Next"
    }
    else{
        login.innerText="Login"
        localStorage.removeItem("userName", null);
    }
  }
  catch (error) {
    console.error(error);
    login.innerText="Login"
    localStorage.removeItem("userName", null);
  }
}

getAuth().onAuthStateChanged(function(user2) {
  if (user2) {
    localStorage.setItem("userName", user2.displayName)
    localStorage.setItem("authint", 1)
  } else {
    console.log("Signed out")   
  }
  loadWelcome()
});