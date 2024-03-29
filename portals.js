
import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import {getDatabase, set, get, update, remove, ref, child, onValue} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js"
import {getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js"

const firebaseConfig = {
    apiKey: "AIzaSyBqAEME6HTZXXYj6bPjzn_vXBryF4Gyyn4",
    authDomain: "portalview-5b9ae.firebaseapp.com",
    databaseURL: "https://portalview-5b9ae-default-rtdb.firebaseio.com",
    projectId: "portalview-5b9ae",
    storageBucket: "portalview-5b9ae.appspot.com",
    messagingSenderId: "810248528077",
    appId: "1:810248528077:web:777327e3e12021bf804984"
};

var add
var ul
let app
var ul2 = document.getElementById("suggested")
var urlList = []
var suggestedURLs = [["Google", "https://google.com"],
                    ["YouTube", "https://youtube.com"],
                    ["Facebook", "https://facebook.com"],
                    ["Reddit", "https://reddit.com"],
                    ["Bing", "https://bing.com"],
                    ["Twitter", "https://twitter.com"],
                    ["Wikipedia", "https://wikipedia.org"],
                    ["LinkedIn", "https://linkedin.com"],
                    ["Amazon", "https://amazon.com"],
                    ["Netflix", "https://netflix.com"],
                    ["Twitch", "https://twitch.tv"]]

if (getApps().length < 1) {
    app = initializeApp(firebaseConfig);
}
const db = getDatabase();


setInterval(trashOption, 100);
function trashOption(){
    var removebuttons = document.querySelectorAll('span')
    for(let i = 0; i < removebuttons.length; i++){
        removebuttons[i].addEventListener('click', ()=>{

            if(removebuttons[i].className.localeCompare("removeSpan")==0){
                removebuttons[i].parentElement.remove()
                remove(ref(db, "Users" + "/" + localStorage.getItem("user") + "/" + removebuttons[i].parentElement.getAttribute('id')))
            }
            if(removebuttons[i].className.localeCompare("addSpan")==0){
                removebuttons[i].parentElement.remove()
                set(ref(db, "Users" + "/" + localStorage.getItem("user") + "/" + removebuttons[i].parentElement.firstChild.title),{
                    URL: removebuttons[i].parentElement.firstChild.href
                })
            }
        })
    }
}

const e = ref(db, 'Users/' + localStorage.getItem('user'));
onValue(e, (snapshot) => {
    urlList = []

    clearUL(".storage")
    clearUL(".suggestedstorage")

    let data = snapshot.val();
    ul = document.getElementById("list")
    for(var key in data){ 
        ul.appendChild(generateLi(key, data[key]['URL'], true, false))
        urlList.push(data[key]['URL'])
    }

    for(var i = 0; i < suggestedURLs.length; i++){
        add=true
        for(var j = 0; j < urlList.length; j++){

            if(urlList[j].includes("www.")){
                urlList[j] = urlList[j].replace("www.", "")
            }

            if(urlList[j].substring(urlList[j].length-1, urlList[j].length)=="/"){
                urlList[j] = urlList[j].substring(0, urlList[j].length-1)
            }

            if(urlList[j].localeCompare(suggestedURLs[i][1])==0){
                add=false
                break
            }       
        }
        if(add)
        ul2.appendChild(generateLi(suggestedURLs[i][0], suggestedURLs[i][1], false, true))
    }
});



Back.addEventListener('click',(e)=>{
    location.replace("/login.html")
})

buttonAdd.addEventListener('click',(e)=>{
    if(urltext.value != "" || nametext.value !=""){
        if(isUrl(urltext.value)){
            set(ref(db, "Users" + "/" + localStorage.getItem("user") + "/" + nametext.value),{
                URL: urltext.value
            })
            urltext.value=""
            nametext.value=""
        }
        else{
            alert("Invalid URL")
        }
    }
});


function generateLiSuggested(linkName, linkurl, generateClassTag, addMode, duplicateArray){
    
    for(var i = 0; i < duplicateArray.length; i++){
        generateLi(linkName, linkurl, generateClassTag, addMode)
    }
}

function generateLi(linkName, linkurl, generateClassTag, addMode){
    var li2 = document.createElement("li")
    var link = document.createElement('a')
    link.target="_blank"
    var linktext = document.createTextNode(linkName)
    link.title=linkName
    link.href=linkurl
    link.appendChild(linktext)
    li2.setAttribute('id', linkName)
    li2.appendChild(link)
    var span = document.createElement('span')
    var img  = document.createElement("img") 


    if(!addMode){
        span.classList.add("removeSpan")    
        img.src="Remove.png"
        img.className="removeIcon"
    }
    else{
        span.classList.add("addSpan")
        img.src="Add.png"
        img.className="addIcon"
    }

    span.innerHTML=" "


    if(generateClassTag)
        li2.classList.add("storage")
    else
        li2.classList.add("suggestedstorage")

    li2.appendChild(span)
    span.appendChild(img)

    return li2
}

function isUrl (string) {
    var url;
    try {
      url = new URL(string);
    } catch (_) {
      return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
}

function clearUL(ulclass){
    var lis = document.querySelectorAll(ulclass)
    for(let i = 0; i < lis.length; i++){
        lis[i].remove()
    }
}
  
getAuth().onAuthStateChanged(function(user2) {});  