var originalLinks = document.getElementsByClassName("navbar-link");

var toggleContent = document.getElementById("navbar-toggle-content");

var navDropdownElements = [];

var opacity = 0;

function createDropdown(){
    
    for (var i = 0; i < originalLinks.length; i++){
        navDropdownElements[i] = document.createElement("a");

        navDropdownElements[i].href = originalLinks[i].href;
        navDropdownElements[i].innerHTML = originalLinks[i].innerHTML;

        document.getElementById("navbar-toggle-content").appendChild(navDropdownElements[i]);

        navDropdownElements[i].style.display ="block";
        toggleContent.style.display = "none";
        toggleContent.style.opacity = "0";
    }
}

function displayDropdown(event){
    if(event.type === "click"){
        if(navDropdownElements[1] === undefined){createDropdown();}
        //fadeDropdown();
        if(toggleContent.style.display === "none"){
            toggleContent.style.display = "flex";
        }
        else {
            toggleContent.style.display = "none";
        }
    }
    if(toggleContent.style.display === "flex" && event.type === "mouseleave" && screen.width < screen.height){
        toggleContent.style.display = "none";
    }
}

/*function fadeDropdown(){
    for(var i = 0; i < navDropdownElements.length; i++){
        if(toggleContent.style.display === "none"){
            if(opacity < 1)setInterval(fadeIn, 100);
            toggleContent.style.opacity = `${opacity}`;
        }
        else{
            if(opacity > 1)setInterval(fadeOut, 100);
            toggleContent.style.opacity = `${opacity}`;
        }
    }
}

function fadeIn(){
    opacity += 0.1;
}

function fadeOut(){
    opacity -= 0.1;
}*/