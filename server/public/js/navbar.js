var originalLinks = document.getElementsByClassName("navbar-link");
//in navLinks einfügen

var navLinks = [];
var navDropdownElements = [];

function createDropdown(){
    for (var i = 0; i < originalLinks.length; i++){
        navLinks[i] = originalLinks[i].innerHTML;
    }
    
    for (var i = 0; i < navLinks.length; i++){
        navDropdownElements[i] = document.createElement("div");
        navDropdownElements[i].innerHTML = navLinks[i];
        document.getElementById("navbar-toggle-content").appendChild(navDropdownElements[i]);
        navDropdownElements[i].style.display ="none";
    }
}

function displayDropdown(){
    if(navDropdownElements[1] === undefined){createDropdown();}
    for (var i = 0; i < navDropdownElements.length; i++){
        if(navDropdownElements[i].style.display === "none"){
            navDropdownElements[i].style.display = "block";
        }
        else {
            navDropdownElements[i].style.display = "none";
        }
    }
}