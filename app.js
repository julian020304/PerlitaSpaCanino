class Carousel {
    constructor(containerId, prevBtnId, nextBtnId) {
        this.container = document.getElementById(containerId);
        this.prevBtn = document.getElementById(prevBtnId);
        this.nextBtn = document.getElementById(nextBtnId);
        
        this.items = Array.from(this.container.children);
        this.currentIndex = 0;
        
        this.itemWidth = this.calculateItemWidth();
        this.setupEventListeners();
    }

    calculateItemWidth() {
        // Considere padding y gap
        return this.items[0].offsetWidth + 15;
    }

    setupEventListeners() {
        this.prevBtn.addEventListener('click', () => this.movePrev());
        this.nextBtn.addEventListener('click', () => this.moveNext());
    }

    movePrev() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.updateCarousel();
        }
    }

    moveNext() {
        if (this.currentIndex < this.items.length - Math.floor(window.innerWidth / this.itemWidth)) {
            this.currentIndex++;
            this.updateCarousel();
        }
    }

    updateCarousel() {
        const offset = -this.currentIndex * this.itemWidth;
        this.container.style.transform = `translateX(${offset}px)`;
    }
}

// Inicializar el carrusel después de que la página cargue
document.addEventListener('DOMContentLoaded', () => {
    const carousel = new Carousel('carousel-wrapper', 'prev-btn', 'next-btn');
});

// slider //

const slider_content = document.querySelectorAll('.slider_content');
const next = document.querySelector('.next');
const prev = document.querySelector('.prev');
let index = 0;


const mount = () => slider_content[index].classList.add('active');
const unmount = () => slider_content[index].classList.remove('active');
next.addEventListener('click', () => {
    unmount();
    if(index >= slider_content.length - 1){
        index = 0;
    }
    else {
        
        index++;
    }
    mount();
})

prev.addEventListener('click', () => {
    unmount();
    if(index <= 0){
        index = slider_content.length - 1;
    }
    else {
        index--;
    }
    mount();
});

mount();

const main_img = document.querySelector('.main_img');
const thumbnails = document.querySelectorAll('.thumbnail');


thumbnails.forEach(thumb => {
    thumb.addEventListener('click', function(){
        const active =document.querySelector('.active');
        active.classList.remove('active');
        this.classList.add('active');
        main_img.src = this.src;
    });
});

