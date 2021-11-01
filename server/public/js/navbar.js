var originalLinks = document.getElementsByClassName("navbar-link");

var toggleContent = document.getElementById("navbar-toggle-content");

var navDropdownElements = [];

function createDropdown(){
    
    for (var i = 0; i < originalLinks.length; i++){
        navDropdownElements[i] = document.createElement("a");

        navDropdownElements[i].href = originalLinks[i].href;
        navDropdownElements[i].innerHTML = originalLinks[i].innerHTML;

        document.getElementById("navbar-toggle-content").appendChild(navDropdownElements[i]);

        navDropdownElements[i].style.display ="block";
        toggleContent.style.display = "none";
    }
}

$(document).ready(function() {
    if(navDropdownElements[1] === undefined){createDropdown();}
    $(document).click((event) => {
        if(!$(event.target).closest('.navbar-toggle-menu').length) {$(".navbar-toggle-content").fadeOut(100);}
        else {$(".navbar-toggle-content").fadeToggle(100);}
    });
    
});