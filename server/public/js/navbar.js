var originalLinksGames = document.getElementsByClassName("navbar-dropdown-games-elements");
var originalLinksKnowledge = document.getElementsByClassName("navbar-dropdown-knowledge-elements");

var toggleContent = document.getElementById("navbar-toggle-content");

var navDropdownElementsGames = [];
var navDropdownElementsKnowledge = [];

//function for creating the mobile dropdown based on the content of the PC navbar
function createDropdownGames(){
    
    for (var i = 0; i < originalLinksGames.length; i++){

        //creating the elements of the dropdown
        navDropdownElementsGames[i] = document.createElement("a");

        //assigning the original links and HTML to the dropdown elements
        navDropdownElementsGames[i].href = originalLinksGames[i].href;
        navDropdownElementsGames[i].innerHTML = originalLinksGames[i].innerHTML;

        //assigning them to the div for the dropdown elements
        document.getElementById("navbar-toggle-games").appendChild(navDropdownElementsGames[i]);

        //setting the default display style of the dropdown elements and the container
        navDropdownElementsGames[i].style.display ="block";
        toggleContent.style.display = "none";
    }
}

function createDropdownKnowledge(){

    for (var i = 0; i < originalLinksKnowledge.length; i++){
    
        navDropdownElementsKnowledge[i] = document.createElement("a");
        navDropdownElementsKnowledge[i].href = originalLinksKnowledge[i].href;
        navDropdownElementsKnowledge[i].innerHTML = originalLinksKnowledge[i].innerHTML;
        
        document.getElementById("navbar-toggle-knowledge").appendChild(navDropdownElementsKnowledge[i]);

        navDropdownElementsKnowledge[i].style.display ="block";

    }
}

//jQuery function for showing and hiding the dropdown
$(document).ready(function() {

    //jquery function for toggleing the navbar content
    $(document).click((event) => {
        if(!$(event.target).closest('.navbar-games').length) {$(".navbar-dropdown-games").fadeOut(100);}
        else {$(".navbar-dropdown-games").fadeToggle(100);}

        if(!$(event.target).closest('.navbar-knowledge').length) {$(".navbar-dropdown-knowledge").fadeOut(100);}
        else {$(".navbar-dropdown-knowledge").fadeToggle(100);}
    });

    //initializing the creation of the dropdown
    if(navDropdownElementsGames[1] === undefined){
        createDropdownGames();
        createDropdownKnowledge();
    }

    //function for toggleing the display of the dropdown with a fade effect, including hiding the dropdown if the content of it isn't clicked
    $(document).click((event) => {
        if(!$(event.target).closest('.navbar-toggle-menu').length) {$(".navbar-toggle-content").fadeOut(100);}
        else {$(".navbar-toggle-content").fadeToggle(100);}
    });
    
});