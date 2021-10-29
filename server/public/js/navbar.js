var originalLinks = document.getElementsByClassName("navbar-link");
//in navLinks einfügen

var navLinks = [];
var navDropdownElements = [];

function createDropdown(){
    for (var i = 0; i < originalLinks.length; i++){
        navLinks[i] = originalLinks[i];
    }
    
    for (var i = 0; i < navLinks.length; i++){
        navDropdownElements[i] = document.createElement("a");
        navDropdownElements[i].href = originalLinks[i].href;
        navDropdownElements[i].innerHTML = navLinks[i].innerHTML;
        document.getElementById("navbar-toggle-content").appendChild(navDropdownElements[i]);
        navDropdownElements[i].style.display ="none";
    }
}

function displayDropdown(event){
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