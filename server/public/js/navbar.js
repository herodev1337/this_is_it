var originalLinks = document.getElementsByClassName("navbar-link");

var toggleContent = document.getElementById("navbar-toggle-content");

var navDropdownElements = [];

//function for creating the mobile dropdown based on the content of the PC navbar
function createDropdown(){
    
    for (var i = 0; i < originalLinks.length; i++){

        //creating the elements of the dropdown
        navDropdownElements[i] = document.createElement("a");

        //assigning the original links and HTML to the dropdown elements
        navDropdownElements[i].href = originalLinks[i].href;
        navDropdownElements[i].innerHTML = originalLinks[i].innerHTML;

        //assigning them to the div for the dropdown elements
        document.getElementById("navbar-toggle-content").appendChild(navDropdownElements[i]);

        //setting the default display style of the dropdown elements and the container
        navDropdownElements[i].style.display ="block";
        toggleContent.style.display = "none";
    }
}

//jQuery function for showing and hiding the dropdown
$(document).ready(function() {

    //initializing the creation of the dropdown
    if(navDropdownElements[1] === undefined){createDropdown();}

    //function for toggleing the display of the dropdown with a fade effect, including hiding the dropdown if the content of it isn't clicked
    $(document).click((event) => {
        if(!$(event.target).closest('.navbar-toggle-menu').length) {$(".navbar-toggle-content").fadeOut(100);}
        else {$(".navbar-toggle-content").fadeToggle(100);}
    });
    
});