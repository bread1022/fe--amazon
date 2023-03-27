class Carousel {
  #directoryPath;
  #DIRECTION_RIGHT = -1;
  #DIRECTION_LEFT = 1;
  constructor({numberOfImages, delayTime, path}) {
    this.CAROUSEL_COUNT = numberOfImages;
    this.DELAY_TIME = delayTime;
    this.#directoryPath = path;
    this.slider = document.querySelector('.slider');
    this.leftBtn = document.getElementById('carousel_left');
    this.rightBtn = document.getElementById('carousel_right');
  }

  init() {
    this.setImages()
    this.slideAuto();
    this.clickSlide();
  }

  setImages() {
    const imageFiles = Array.from({ length : this.CAROUSEL_COUNT }, (_, i) => i);
    const imageTemplate = imageFiles.reduce((template, number) => {
      const img = `<img class="slide" src="${this.#directoryPath}/${number}.jpg" alt="carousel 배경이미지${number}">`;
      template += img;
      return template;
    }, '');
    this.slider.insertAdjacentHTML('afterbegin', imageTemplate);
  }

  clickSlide() {
    this.leftBtn.addEventListener('click', this.translateSlideHandler.bind(this));
    this.rightBtn.addEventListener('click', this.translateSlideHandler.bind(this));
  }

  //예상과 타겟이 다르게 동작하는 이유 (undefined로 나옴)-> 비동기와 관련
  translateSlideHandler({ target }) {
    const direction = target.closest('span').id === 'carousel_left' ? this.#DIRECTION_LEFT : this.#DIRECTION_RIGHT;
    this.translateSlide(direction);
  }

  translateSlide(direction) {
    this.slider.style.transitionDuration = '500ms';
    this.slider.style.transform = `translateX(${direction * 100}%)`;
    this.slider.ontransitionend = () => this.appendSlide(direction);
  }

  appendSlide(direction) {
    this.slider.removeAttribute('style');
    if(direction > 0) {
      this.slider.insertBefore(this.slider.lastElementChild, this.slider.firstElementChild);
    } else this.slider.appendChild(this.slider.firstElementChild);
  }

  slideAuto() {
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    let lastTime = 0;
    const moveCarousel = currentTime => {
      let deltaTime = currentTime - lastTime;
      if (deltaTime > this.DELAY_TIME) {
        currentSlide++;
        if (currentSlide >= slides.length) currentSlide = 0;
        this.translateSlide(this.#DIRECTION_RIGHT);
        lastTime = currentTime;
      }
      requestAnimationFrame(moveCarousel);
    }
    requestAnimationFrame(moveCarousel);
  }
}
export { Carousel };