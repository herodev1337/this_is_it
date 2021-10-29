var originalLinks = document.getElementsByClassName("navbar-link");

var toggleContent = document.getElementById("navbar-toggle-content");

var navDropdownContainer = [];
var navDropdownElements = [];

function createDropdown(){
    
    for (var i = 0; i < originalLinks.length; i++){
        navDropdownContainer[i] = document.createElement("div");
        navDropdownElements[i] = document.createElement("a");

        navDropdownElements[i].href = originalLinks[i].href;
        navDropdownElements[i].innerHTML = originalLinks[i].innerHTML;

        document.getElementById("navbar-toggle-content").appendChild(navDropdownContainer[i]);
        navDropdownContainer[i].appendChild(navDropdownElements[i]);

        navDropdownElements[i].style.display ="block";
        toggleContent.style.display = "none";
    }
}

function displayDropdown(event){
    if(navDropdownElements[1] === undefined){createDropdown();}
    if(toggleContent.style.display === "none"){
        toggleContent.style.display = "flex";
    }
    else {
        toggleContent.style.display = "none";
    }
}