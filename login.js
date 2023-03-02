import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import {getAuth, GoogleAuthProvider, signInWithPopup, signOut} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js"

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
const message = document.getElementById("message")
const login = document.getElementById("login")
var loggedIn = false;

try{
    message.textContent="Welcome " + localStorage.getItem("userName")
    if(!localStorage.getItem("userObj")){
        login.innerText="Next"
        console.log("login set to true on init")
        loggedIn = true
    }
    else{
        login.innerText="Login"
        localStorage.setItem("userName", "...");
        console.log("login set to false on init")
        loggedIn = false
    }
}
catch{
    console.log("NULL USER")
}

function monitor(){
    console.log("user status - " + localStorage.getItem("userObj"))
    console.log("logged in status - " + loggedIn)
}

logout.addEventListener('click',(e)=>{
    monitor()
    message.textContent="Successfully Logged Out"
    console.log("signed out")
    localStorage.setItem("userObj", null)
    localStorage.setItem("userName", "...");
    signOut(auth);
})

if(!loggedIn){
    login.addEventListener('click',(e)=>{
        monitor()
        signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;

            console.log(user.displayName)
            localStorage.setItem("userName", user.displayName);

            var email = user.email;
            email = email.replace(/\./g,'_')
            localStorage.setItem("user", email)
            localStorage.setItem("userObj", user)
            message.textContent="Welcome " + localStorage.getItem("userName")
            loggedIn = true
            location.replace("/portals.html")
        })
        
    });
}
else{
    login.addEventListener('click',(e)=>{
        monitor()
        location.replace("/portals.html")        
    });
}