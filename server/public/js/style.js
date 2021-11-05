var swipearea = document.getElementById('swipearea');
var swipeleft = document.getElementById('swipe_left');
var swiperight = document.getElementById('swipe_right');

var xPosOrig;
var pageIndex = 0;

function swipeinit(event) {
    if (event.type === 'mousedown') {
        xPosOrig = event.x;
        swipearea.addEventListener('mousemove', swipe);
    } else if (event.type === 'mouseup') {
        reset();
    }
}

function swipe(event) {
    var xPosMiddle = window.innerWidth / 2;
    var xPos = event.x;

    if (xPos - xPosOrig > 0 && xPosOrig < xPosMiddle) {
        swipeleft.style.paddingLeft = xPos / 2 + 'px';
        swipeleft.style.paddingRight = xPos / 2 + 'px';
    } else if (xPosOrig - xPos > 0 && xPosOrig > xPosMiddle) {
        swiperight.style.paddingLeft =
            (xPosOrig - xPos + (window.innerWidth - xPosOrig)) / 2 + 'px';
        swiperight.style.paddingRight =
            (xPosOrig - xPos + (window.innerWidth - xPosOrig)) / 2 + 'px';
    }

    selectOption(xPos, xPosOrig);
}

function reset() {
    swipearea.removeEventListener('mousemove', swipe);
    swipeleft.style.padding = 1 + 'rem';
    swiperight.style.padding = 1 + 'rem';
    //pageIndex += 1;
}

swipearea.addEventListener('mousedown', swipeinit);
swipearea.addEventListener('mouseup', swipeinit);
