export let touchRight = false;
export let touchLeft = false;

function touchStartHandler(e) {
    e.preventDefault();
    const touch = e.changedTouches[0];
    const touchX = touch.pageX;
    const screenWidth = window.innerWidth;
    if (touchX > screenWidth / 2) {
        touchRight = true;
    } else {
        touchLeft = true; 
    }
}

function touchEndHandler(e) {
    e.preventDefault();
    touchRight = false;
    touchLeft = false;
}

export { touchStartHandler, touchEndHandler };
