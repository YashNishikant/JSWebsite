function addOnClick(){

    var ul = document.getElementById("list")
    var urltext = document.getElementById("urltext");
    var nametext = document.getElementById("nametext");
    var li = document.createElement("li");

    const str = urltext.value.replace(/\s+/g, '');
    if(str!=""){
        var link = document.createElement('a');
        link.target="_blank"
        var linktext = document.createTextNode(nametext.value);
        link.title=nametext.value
        link.href=urltext.value
        link.appendChild(linktext)

        li.setAttribute('id', nametext.value);
        li.appendChild(link)
        
        var span = document.createElement('span');
        var img  = document.createElement("img");
        img.src="Remove.png";
        img.className="removeIcon"
        span.innerHTML=" "
        li.appendChild(span);
        span.appendChild(img)
        ul.appendChild(li)
    }

    var removebuttons = document.querySelectorAll('span');
    for(let i = 0; i < removebuttons.length; i++){
        removebuttons[i].addEventListener('click', ()=>{
            removebuttons[i].parentElement.remove()
        })
    }
}