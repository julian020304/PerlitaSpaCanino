class Carousel {
    constructor(containerId, prevBtnId, nextBtnId) {
        this.container = document.getElementById(containerId);
        this.prevBtn = document.getElementById(prevBtnId);
        this.nextBtn = document.getElementById(nextBtnId);
        
        if (!this.container || !this.prevBtn || !this.nextBtn) {
            console.warn('Carousel elements not found');
            return;
        }
        
        this.items = Array.from(this.container.children);
        this.currentIndex = 0;
        this.isAnimating = false;
        this.itemWidth = this.calculateItemWidth();
        this.visibleItems = Math.floor(window.innerWidth / this.itemWidth);
        this.maxIndex = Math.max(0, this.items.length - this.visibleItems);
        
        this.setupEventListeners();
        this.updateButtonStates();
    }

    calculateItemWidth() {
        if (this.items.length === 0) return 0;
        const firstItem = this.items[0];
        const styles = window.getComputedStyle(firstItem);
        return firstItem.offsetWidth + 
               parseInt(styles.marginLeft) + 
               parseInt(styles.marginRight) + 15; // gap
    }

    setupEventListeners() {
        this.prevBtn.addEventListener('click', () => {
            if (!this.isAnimating) this.movePrev();
        });
        
        this.nextBtn.addEventListener('click', () => {
            if (!this.isAnimating) this.moveNext();
        });

        window.addEventListener('resize', () => {
            this.itemWidth = this.calculateItemWidth();
            this.updateCarousel(true);
        });
    }

    updateButtonStates() {
        if (this.prevBtn && this.nextBtn) {
            // Habilitar/deshabilitar botones basado en la posición actual
            this.prevBtn.style.opacity = this.currentIndex <= 0 ? "0.5" : "1";
            this.prevBtn.style.cursor = this.currentIndex <= 0 ? "default" : "pointer";
            
            this.nextBtn.style.opacity = this.currentIndex >= this.maxIndex ? "0.5" : "1";
            this.nextBtn.style.cursor = this.currentIndex >= this.maxIndex ? "default" : "pointer";
            
            // Mantener los botones habilitados para permitir la navegación circular
            this.prevBtn.disabled = false;
            this.nextBtn.disabled = false;
        }
    }

    movePrev() {
        if (this.isAnimating) return;
        
        this.isAnimating = true;
        if (this.currentIndex <= 0) {
            this.currentIndex = this.maxIndex;
        } else {
            this.currentIndex--;
        }
        this.updateCarousel();
    }

    moveNext() {
        if (this.isAnimating) return;
        
        this.isAnimating = true;
        if (this.currentIndex >= this.maxIndex) {
            // Volver al inicio
            this.currentIndex = 0;
        } else {
            this.currentIndex++;
        }
        this.updateCarousel();
    }

    updateCarousel(skipAnimation = false) {
        const offset = -this.currentIndex * this.itemWidth;
        
        if (skipAnimation) {
            this.container.style.transition = 'none';
            this.container.style.transform = `translateX(${offset}px)`;
            // Forzar reflow
            this.container.offsetHeight;
            this.container.style.transition = '';
        } else {
            this.container.style.transform = `translateX(${offset}px)`;
        }

        this.updateButtonStates();

        // Esperar a que termine la animación
        setTimeout(() => {
            this.isAnimating = false;
        }, 500);
    }
}

class ProductSlider {
    constructor() {
        this.sliderContents = document.querySelectorAll('.slider_content');
        this.nextBtn = document.querySelector('.next');
        this.prevBtn = document.querySelector('.prev');
        this.index = 0;
        this.isAnimating = false;
        
        if (this.sliderContents.length > 0) {
            this.init();
        }
    }

    init() {
        this.mount();
        this.setupEventListeners();
    }

    mount() {
        this.sliderContents[this.index]?.classList.add('active');
    }

    unmount() {
        this.sliderContents[this.index]?.classList.remove('active');
    }

    setupEventListeners() {
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.handleNext());
        }
        
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.handlePrev());
        }
    }

    handleNext() {
        if (this.isAnimating) return;
        
        this.isAnimating = true;
        this.unmount();
        
        if (this.index >= this.sliderContents.length - 1) {
            this.index = 0;
        } else {
            this.index++;
        }
        
        this.mount();
        
        setTimeout(() => {
            this.isAnimating = false;
        }, 500);
    }

    handlePrev() {
        if (this.isAnimating) return;
        
        this.isAnimating = true;
        this.unmount();
        
        if (this.index <= 0) {
            this.index = this.sliderContents.length - 1;
        } else {
            this.index--;
        }
        
        this.mount();
        
        setTimeout(() => {
            this.isAnimating = false;
        }, 500);
    }
}

class ThumbnailViewer {
    constructor() {
        this.mainImg = document.querySelector('.main_img');
        this.thumbnails = document.querySelectorAll('.thumbnail');
        
        if (this.mainImg && this.thumbnails.length > 0) {
            this.init();
        }
    }

    init() {
        this.thumbnails.forEach(thumb => {
            thumb.addEventListener('click', () => this.handleThumbnailClick(thumb));
        });
    }

    handleThumbnailClick(thumbnail) {
        const active = document.querySelector('.thumbnail.active');
        if (active) {
            active.classList.remove('active');
        }
        
        thumbnail.classList.add('active');
        
        if (this.mainImg) {
            this.mainImg.src = thumbnail.src;
        }
    }
}

// Inicializar todos los componentes cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar carrusel principal
    const mainCarousel = new Carousel('carousel-wrapper', 'prev-btn', 'next-btn');
    
    // Inicializar slider de productos
    const productSlider = new ProductSlider();
    
    // Inicializar visor de miniaturas
    const thumbnailViewer = new ThumbnailViewer();
});

