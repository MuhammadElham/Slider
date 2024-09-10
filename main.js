// Initialize the slider positions
var sliders = document.querySelectorAll(".slide");
var center = Math.floor(sliders.length / 2);

var getNewPosition = (position, offset) => (position + offset + sliders.length) % sliders.length;

var leftEndBack = getNewPosition(center, -3);
var leftEnd = getNewPosition(center, -2);
var leftMid = getNewPosition(center, -1);
var rightMid = getNewPosition(center, 1);
var rightEnd = getNewPosition(center, 2);
var rightEndBack = getNewPosition(center, 3);

let container = document.getElementById('slider-content');

// Set initial positions for the slider
function setInitialPositions() {
    sliders.forEach(slide => slide.classList.remove('position-none', 'position-1', 'position-2', 'position-3', 'position-4', 'position-5'));

    sliders[leftEndBack]?.classList.add("position-none");
    sliders[leftEnd]?.classList.add("position-1");
    sliders[leftMid]?.classList.add("position-2");
    sliders[center]?.classList.add("position-3");
    sliders[rightMid]?.classList.add("position-4");
    sliders[rightEnd]?.classList.add("position-5");
    sliders[rightEndBack]?.classList.add("position-none");
}

setInitialPositions();

// Handle left scroll
function leftScroll() {
    leftEndBack = getNewPosition(leftEndBack, -1);
    leftEnd = getNewPosition(leftEnd, -1);
    leftMid = getNewPosition(leftMid, -1);
    center = getNewPosition(center, -1);
    rightMid = getNewPosition(rightMid, -1);
    rightEnd = getNewPosition(rightEnd, -1);
    rightEndBack = getNewPosition(rightEndBack, -1);

    setInitialPositions();
}

// Handle right scroll
function rightScroll() {
    leftEndBack = getNewPosition(leftEndBack, 1);
    leftEnd = getNewPosition(leftEnd, 1);
    leftMid = getNewPosition(leftMid, 1);
    center = getNewPosition(center, 1);
    rightMid = getNewPosition(rightMid, 1);
    rightEnd = getNewPosition(rightEnd, 1);
    rightEndBack = getNewPosition(rightEndBack, 1);

    setInitialPositions();
}

// Swipe functionality
class Swipe {
    constructor(element) {
        this.xDown = null;
        this.yDown = null;
        this.element = typeof(element) === 'string' ? document.querySelector(element) : element;

        this.element.addEventListener('touchstart', evt => {
            this.xDown = evt.touches[0].clientX;
            this.yDown = evt.touches[0].clientY;
        }, false);
    }

    onLeft(callback) {
        this.onLeft = callback;
        return this;
    }

    onRight(callback) {
        this.onRight = callback;
        return this;
    }

    handleTouchMove(evt) {
        if (!this.xDown || !this.yDown) {
            return;
        }

        const xUp = evt.touches[0].clientX;
        const yUp = evt.touches[0].clientY;

        const xDiff = this.xDown - xUp;
        const yDiff = this.yDown - yUp;

        if (Math.abs(xDiff) > Math.abs(yDiff)) {
            if (xDiff > 0) {
                this.onLeft && this.onLeft();
            } else {
                this.onRight && this.onRight();
            }
        }

        this.xDown = null;
        this.yDown = null;
    }

    run() {
        this.element.addEventListener('touchmove', evt => this.handleTouchMove(evt), false);
    }
}

const swiper = new Swipe(container);

// Add event listeners
document.querySelector(".left-arrow").addEventListener("click", leftScroll);
document.querySelector(".right-arrow").addEventListener("click", rightScroll);

swiper.onRight(leftScroll);
swiper.onLeft(rightScroll);
swiper.run();
