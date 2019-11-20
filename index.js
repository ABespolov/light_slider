
class LightSlider {
    constructor() {
        this.clickable = true;
    }

    initialize() {
        this.leftControl = document.getElementById("ls_left");
        this.rightControl = document.getElementById("ls_right");
        this.slidesContainer = document.getElementById("ls_container");
        this.slides = this.slidesContainer.querySelectorAll("div");

        this.leftControl.addEventListener("click", this.leftControlHandler);
        this.rightControl.addEventListener("click", this.rightControlHandler);

        this.setInitializeSlidesPosition();

        this.slides[0].addEventListener("transitionend", this.updateSlides);
    }

    setInitializeSlidesPosition() {
        this.slides.forEach((el, index) => {
            el.style.transform = `translateX(${300 * (index - 1)}px)`;
        });
    }


    updateSlides = () => {
       const removableSlide = this.direction > 0 ? this.slidesContainer.children[this.slidesContainer.children.length - 1] : this.slidesContainer.children[0];
        const slide = this.slidesContainer.removeChild(removableSlide);

        slide.style.transform = this.direction > 0 ? `translateX(${-300}px)` :`translateX(${600}px)`;

        this.direction > 0 ?
            this.slidesContainer.insertBefore(slide, this.slidesContainer.children[0]) : this.slidesContainer.appendChild(slide);

        this.clickable = true;
    }

    moveSlides = () => {
        this.slides.forEach(el => {
            const currTransform = window.getComputedStyle(el).transform.split(" ");
            const translateX = parseInt(currTransform[currTransform.length - 2]);

            el.style.transition = el.style.transition || "transform 1s";
            el.style.transform = `translateX(${translateX + 300 * this.direction}px)`;
        });
    }

    leftControlHandler = () => {
        if(this.clickable) {
            this.direction = -1;
            this.clickable = false;

            this.moveSlides();
        }
    }

    rightControlHandler = () => {
        if(this.clickable) {
            this.direction = 1;
            this.clickable = false;

            this.moveSlides();
        }
    }
}

const lightSlider = new LightSlider();
lightSlider.initialize();
