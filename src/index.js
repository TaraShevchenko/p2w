import './fonts/fonts.scss'
import './styles/reset.scss'
import './styles/style.scss'
import './styles/header.scss'
import './styles/footer.scss'
import './styles/player.scss'
import './styles/tabs.scss'
import './styles/table.scss'
import './styles/chat.scss'
import './styles/editTeam.scss'
import './styles/editMatch.scss'
import './styles/tournament.scss'
import './styles/team.scss'
import './styles/match.scss'
import './styles/modal.scss'

import 'simple-scrollbar/simple-scrollbar.css'
import SimpleScrollbar from 'simple-scrollbar'
import lottie from 'lottie-web';

const mainElement = document.querySelector('.main')
const AnimationContainer = document.createElement('div');
AnimationContainer.setAttribute('class', 'container')
AnimationContainer.setAttribute('id', 'animationContainer')
mainElement.appendChild(AnimationContainer)

lottie.loadAnimation({
    container: AnimationContainer,
    path: './images/animation/Background.json',
    renderer: 'svg',
    loop: true,
    autoplay: true,
})

// Header menu
const headerMenu = document.querySelector('.header__profile-wrapper');
const headerMenuOpenButton = document.querySelector('.header__profile-open');
const headerMenuCloseButton = document.querySelector('.header__profile-close');

const handleHeaderMenuClickOutside = (event) => {
    if (headerMenu && !headerMenu.contains(event.target)) {
        headerMenu.classList.remove('active')
    }
}

const handleHeaderMenuToggle = () => {
    !!headerMenu && headerMenu.classList.toggle('active');

    if (headerMenu.classList.contains('active')) {
        document.addEventListener('mousedown', handleHeaderMenuClickOutside);
    } else {
        document.removeEventListener('mousedown', handleHeaderMenuClickOutside);
    }
}

headerMenuOpenButton.addEventListener('click', handleHeaderMenuToggle);
headerMenuCloseButton.addEventListener('click', handleHeaderMenuToggle);


// Tabs
const addCustomScroll = (element) => {
    if (element.scrollHeight > element.offsetHeight) {
        element.style.height = `${element.offsetHeight}px`;
        const scrollBorder = document.createElement('span');
        scrollBorder.classList.add('custom-scroll-border')
        SimpleScrollbar.initEl(element)
        element.appendChild(scrollBorder)
    }
}

const initCustomScroll = () => {
    const allScrollWrappers = document.querySelectorAll('.custom-scroll-wrapper');
    for (let i = 0; i < allScrollWrappers.length; i++) {
        addCustomScroll(allScrollWrappers[i]);
    }
}
initCustomScroll();

const handleOpenTab = (navigationElements, contentElements, navigationElement, contentElement) => {
    for (let i = 0; i < navigationElements.length; i++) {
        navigationElements[i].classList.remove('active')
    }
    for (let i = 0; i < contentElements.length; i++) {
        contentElements[i].classList.remove('active')
    }

    navigationElement.classList.add('active')
    contentElement.classList.add('active')

    const navigationItemTriangleElement = navigationElement.querySelector('.tab__navigation-item-triangle');
    if (!navigationItemTriangleElement) {
        const navigationItemTriangle = document.createElement('span');
        navigationItemTriangle.classList.add('tab__navigation-item-triangle')
        navigationElement.appendChild(navigationItemTriangle)
    }

    const withoutScroll = contentElement.classList.contains('tab__content-item--no-scroll');
    const customScrollElements = contentElement.querySelectorAll('.custom-scroll-wrapper--tab');
    if (!withoutScroll) {
        if (customScrollElements.length) {
            for (let i = 0; i < customScrollElements.length; i++) {
                addCustomScroll(customScrollElements[i])
            }
        } else {
            if (!contentElement.classList.contains('table--with-pagination')) {
                addCustomScroll(contentElement)
            }
        }
    }
}

const handleInitTab = () => {
    const allTabs = document.querySelectorAll('.tab__wrapper');

    for (let i = 0; i < allTabs.length; i++) {
        let navigationElements;
        let contentElements;

        for (let y = 0; y < allTabs[i].children.length; y++) {
            if (allTabs[i]?.children[y].classList.contains('tab__navigation')) {
                navigationElements = allTabs[i]?.children[y].children;
            }
            if (allTabs[i]?.children[y].classList.contains('tab__content')) {
                contentElements = allTabs[i]?.children[y].children;
            }
        }

        if (navigationElements?.length === contentElements?.length) {
            for (let j = 0; j < navigationElements.length; j++) {
                j === 0 && handleOpenTab(navigationElements, contentElements, navigationElements[j], contentElements[j]);

                navigationElements[j].addEventListener('click',
                    () => handleOpenTab(navigationElements, contentElements, navigationElements[j], contentElements[j])
                );
            }
        }
    }
}
handleInitTab();

//Dropdown

const handleDropdownMenuToggle = (dropdownElement) => {
    !!dropdownElement && dropdownElement.classList.toggle('active');

    const handleDropdownMenuClickOutside = (event) => {
        if (dropdownElement && !dropdownElement.contains(event.target)) {
            dropdownElement.classList.remove('active')
        }
    }

    if (dropdownElement.classList.contains('active')) {
        document.addEventListener('mousedown', handleDropdownMenuClickOutside);
    } else {
        document.removeEventListener('mousedown', handleDropdownMenuClickOutside);
    }
}

const handleInitDropdown = () => {
    const allDropdown = document.querySelectorAll('.dropdown');

    for (let i = 0; i < allDropdown.length; i++) {
        const dropdownElement = allDropdown[i];
        const navigationElement = allDropdown[i]?.children[0];
        navigationElement.addEventListener('click', () => handleDropdownMenuToggle(dropdownElement));
    }
}

handleInitDropdown();

//TournamentsBracket
const tournamentsBracketNavigationNext = document.querySelector('.header-navigation__right');
const tournamentsBracketNavigationPrev = document.querySelector('.header-navigation__left');
const tournamentsBracketTable = document.querySelector('.tournaments-bracket__table');

if (tournamentsBracketTable) {
    let carouselShift = 0;
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    const tableGap = 76;
    const tableColumnOffset = 72;
    const tableColumnItemWidth = vw > 1200 ? 316 : 259;
    const tableColumnItemHeight = 179;
    const tableColumnLastItemHeight = 129;
    const tableColumnFirstItemHeight = 149;
    const childrenCount = tournamentsBracketTable?.children?.length
    tournamentsBracketTable.style.width = `${tableColumnItemWidth * childrenCount - tableGap}px`

    tournamentsBracketNavigationPrev.disabled = true;
    tournamentsBracketNavigationNext.disabled = childrenCount <= 4;

    const firstTableColumnChildrenCount = tournamentsBracketTable?.children[0].children[1].children.length;


    const calculateColumnHeight = (childrenCount) => {
        return `${(childrenCount - 2) * tableColumnItemHeight + tableColumnFirstItemHeight + tableColumnLastItemHeight + tableColumnOffset}px`;
    }

    tournamentsBracketTable.style.maxHeight = calculateColumnHeight(firstTableColumnChildrenCount);

    const scrollNextTournamentsBracketTable = () => {
        carouselShift += 1;
        const currentTableColumnChildrenCount = tournamentsBracketTable?.children[carouselShift].children[1].children.length;
        tournamentsBracketTable.style.maxHeight = calculateColumnHeight(currentTableColumnChildrenCount);
        tournamentsBracketTable.style.transform = `translate3d(-${tableColumnItemWidth * carouselShift}px, 0px, 0px)`;
        tournamentsBracketNavigationPrev.disabled = false;
        tournamentsBracketNavigationNext.disabled = (childrenCount - carouselShift) <= 4;
    }
    const scrollPrevTournamentsBracketTable = () => {
        carouselShift -= 1;
        const currentTableColumnChildrenCount = tournamentsBracketTable?.children[carouselShift].children[1].children.length;
        tournamentsBracketTable.style.maxHeight = calculateColumnHeight(currentTableColumnChildrenCount);
        tournamentsBracketTable.style.transform = `translate3d(-${tableColumnItemWidth * carouselShift}px, 0px, 0px)`;
        tournamentsBracketNavigationNext.disabled = false;
        tournamentsBracketNavigationPrev.disabled = carouselShift === 0;
    }

    tournamentsBracketNavigationNext.addEventListener('click', scrollNextTournamentsBracketTable)
    tournamentsBracketNavigationPrev.addEventListener('click', scrollPrevTournamentsBracketTable)
}