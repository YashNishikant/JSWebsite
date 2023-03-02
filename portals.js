
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyBqAEME6HTZXXYj6bPjzn_vXBryF4Gyyn4",
  authDomain: "portalview-5b9ae.firebaseapp.com",
  databaseURL: "https://portalview-5b9ae-default-rtdb.firebaseio.com",
  projectId: "portalview-5b9ae",
  storageBucket: "portalview-5b9ae.appspot.com",
  messagingSenderId: "810248528077",
  appId: "1:810248528077:web:777327e3e12021bf804984"
};

const app = initializeApp(firebaseConfig);

import {getDatabase, set, get, update, remove, ref, child, onValue} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js"
const db = getDatabase();

const userRef = ref(db, localStorage.getItem("user")+"/");
onValue(userRef, (snapshot) => {
    
    console.log(snapshot.child("testing").value)

    snapshot.forEach(element => {
        console.log(element.key)
        //console.log(snapshot.child("10016796@sbstudents_org").value)
    });

});

Back.addEventListener('click',(e)=>{
    location.replace("/login.html")
})

buttonAdd.addEventListener('click',(e)=>{

var ul = document.getElementById("list")
var urltext = document.getElementById("urltext")
var nametext = document.getElementById("nametext")
var li = document.createElement("li")

const str = urltext.value.replace(/\s+/g, '')

if(str!=""){
    var link = document.createElement('a')
    link.target="_blank"
    var linktext = document.createTextNode(nametext.value)
    link.title=nametext.value
    link.href=urltext.value
    link.appendChild(linktext)

    li.setAttribute('id', nametext.value)
    li.appendChild(link)
    
    var span = document.createElement('span')
    var img  = document.createElement("img") 
    img.src="Remove.png"
    img.className="removeIcon"
    span.innerHTML=" "
    li.appendChild(span)
    span.appendChild(img)
    ul.appendChild(li)

    set(ref(db, localStorage.getItem("user") + "/" + nametext.value),{
        URL: urltext.value
    })

    urltext.value=""
    nametext.value=""
}

var removebuttons = document.querySelectorAll('span')
for(let i = 0; i < removebuttons.length; i++){
    removebuttons[i].addEventListener('click', ()=>{
        removebuttons[i].parentElement.remove()
    })
}
});

