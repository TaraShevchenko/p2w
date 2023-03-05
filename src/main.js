import './fonts/fonts.scss'
import './styles/reset.scss'
import './styles/style.scss'
import './styles/header.scss'
import './styles/footer.scss'
import './styles/main.scss'

import './js/headerMenu'

import anime from 'animejs';

import Swiper, { Navigation, Pagination, Autoplay } from 'swiper';
import 'swiper/css';

const generateAndSubscribeForAnimationElements = (className, callback, threshold) => {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                callback(entry.target)
                observer.unobserve(entry.target);
            }
        });
    }, {threshold: threshold || 1});

    const elements = document.querySelectorAll('.' + className)
    elements.forEach(element => observer.observe(element))
}

const comingFromTopAnimationClassName = 'coming-from-top__animation'
const comingFromTopAnimation = (element) => {
    anime({
        targets: element,
        opacity: [
            {value: 0, duration: 0},
            {value: 0.5, duration: 400},
            {value: 1, duration: 1600},
        ],
        translateY: [
            {value: '-30%', duration: 0},
            {value: 0, duration: 2000},
        ],
        easing: 'spring(1, 80, 5, 0)'
    });
}

generateAndSubscribeForAnimationElements(comingFromTopAnimationClassName, comingFromTopAnimation)

const windowWidth = window.innerWidth
const comingFromLeftAnimationGroupClassName = 'coming-from-left__animation-wrapper'
const comingFromLeftAnimationClassName = 'coming-from-left__animation'
const comingFromLeftAnimationGroupElements = document.querySelectorAll('.coming-from-left__animation')
const comingFromLeftAnimationGroup = () => {
    anime({
        targets: comingFromLeftAnimationGroupElements,
        opacity: [
            {value: 0, duration: 0},
            {value: 0.5, duration: 400},
            {value: 1, duration: 1600},
        ],
        translateX: [
            {value: '-30%', duration: 0},
            {value: 0, duration: 2000},
        ],
        delay: anime.stagger(200),
    });
}

const comingFromLeftAnimation = (element) => {
    anime({
        targets: element,
        opacity: [
            {value: 0, duration: 0},
            {value: 0.5, duration: 400},
            {value: 1, duration: 1600},
        ],
        translateX: [
            {value: '-30%', duration: 0},
            {value: 0, duration: 2000},
        ],
    });
}

if (windowWidth > 875) {
    generateAndSubscribeForAnimationElements(comingFromLeftAnimationGroupClassName, comingFromLeftAnimationGroup, 0.5)
} else {
    generateAndSubscribeForAnimationElements(comingFromLeftAnimationClassName, comingFromLeftAnimation, 1)
}

const comingFromRightAnimationGroupClassName = 'coming-from-right__animation-wrapper'
const comingFromRightAnimationClassName = 'coming-from-right__animation'
const comingFromRightAnimationGroupElements = document.querySelectorAll('.coming-from-right__animation')
const comingFromRightAnimationGroup = () => {
    anime({
        targets: comingFromRightAnimationGroupElements,
        opacity: [
            {value: 0, duration: 0},
            {value: 0.5, duration: 400},
            {value: 1, duration: 1600},
        ],
        translateX: [
            {value: '30%', duration: 0},
            {value: 0, duration: 2000},
        ],
        delay: anime.stagger(200),
    });
}

const comingFromRightAnimation = (element) => {
    anime({
        targets: element,
        opacity: [
            {value: 0, duration: 0},
            {value: 0.5, duration: 400},
            {value: 1, duration: 1600},
        ],
        translateX: [
            {value: '30%', duration: 0},
            {value: 0, duration: 2000},
        ],
    });
}

if (windowWidth > 875) {
    generateAndSubscribeForAnimationElements(comingFromRightAnimationGroupClassName, comingFromRightAnimationGroup, 0.5)
} else {
    generateAndSubscribeForAnimationElements(comingFromRightAnimationClassName, comingFromRightAnimation, 1)
}

new Swiper(".events-slider", {
    modules: [Navigation, Pagination, Autoplay],
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".events-slider__pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".events-slider__button-next",
        prevEl: ".events-slider__button-prev",
    },
});

