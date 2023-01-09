import '../fonts/fonts.css'
import '../styles/reset.scss'
import '../styles/style.scss'
import '../styles/header.scss'
import '../styles/footer.scss'
import '../styles/player.scss'
import '../styles/tabs.scss'
import '../styles/table.scss'
import '../styles/chat.scss'
import '../styles/match.scss'
import '../styles/matchEdit.scss'
import '../styles/tournament.scss'

import SimpleScrollbar from 'simple-scrollbar'
import 'simple-scrollbar/simple-scrollbar.css'

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
    const scrollBorder = document.createElement('span');
    scrollBorder.classList.add('tab__content-scroll-border')
    SimpleScrollbar.initEl(element)
    element.appendChild(scrollBorder)
}

const handleOpenTab = (navigationElements, contentElements, navigationElement, contentElement, withCustomScroll) => {
    for (let i = 0; i < navigationElements.length; i++) {
        navigationElements[i].classList.remove('active')
    }
    for (let i = 0; i < contentElements.length; i++) {
        contentElements[i].classList.remove('active')
    }

    navigationElement.classList.add('active')
    contentElement.classList.add('active')

    if (withCustomScroll) {
        let scrollInScrollWrapper = false;
        for (let i = 0; i < contentElement.children.length; i++) {
            if (contentElement.children[i].classList.contains('tab__content-scroll-item')) {
                if (contentElement.children[i].scrollHeight > contentElement.children[i].offsetHeight) {
                    addCustomScroll(contentElement.children[i])
                }
                scrollInScrollWrapper = true;
            }
        }

        if (contentElement.scrollHeight > contentElement.offsetHeight && !scrollInScrollWrapper) {
            addCustomScroll(contentElement)
        }
    }

}

const handleInitTab = () => {
    const allTabs = document.querySelectorAll('.tab__wrapper');

    for (let i = 0; i < allTabs.length; i++) {
        const withCustomScroll = allTabs[i].classList.contains('tab--in-frame');
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
                j === 0 && handleOpenTab(navigationElements, contentElements, navigationElements[j], contentElements[j], withCustomScroll);

                navigationElements[j].addEventListener('click',
                    () => handleOpenTab(navigationElements, contentElements, navigationElements[j], contentElements[j], withCustomScroll)
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
    const childrenCount = tournamentsBracketTable?.children?.length
    tournamentsBracketTable.style.width = `${316 * childrenCount - 76}px`

    tournamentsBracketNavigationPrev.disabled = true;
    tournamentsBracketNavigationNext.disabled = childrenCount <= 4;
    tournamentsBracketTable.style.maxHeight = `${tournamentsBracketTable?.children[0].clientHeight + 72}px`;

    const scrollNextTournamentsBracketTable = () => {
        carouselShift += 1;
        tournamentsBracketTable.style.maxHeight = `${tournamentsBracketTable.clientHeight / 2}px`;
        tournamentsBracketTable.style.transform = `translate3d(-${316 * carouselShift}px, 0px, 0px)`;
        tournamentsBracketNavigationPrev.disabled = false;
        tournamentsBracketNavigationNext.disabled = (childrenCount - carouselShift) <= 4;
    }
    const scrollPrevTournamentsBracketTable = () => {
        carouselShift -= 1;
        tournamentsBracketTable.style.maxHeight = `${tournamentsBracketTable.clientHeight * 2}px`;
        tournamentsBracketTable.style.transform = `translate3d(-${316 * carouselShift}px, 0px, 0px)`;
        tournamentsBracketNavigationNext.disabled = false;
        tournamentsBracketNavigationPrev.disabled = carouselShift === 0;
    }

    tournamentsBracketNavigationNext.addEventListener('click', scrollNextTournamentsBracketTable)
    tournamentsBracketNavigationPrev.addEventListener('click', scrollPrevTournamentsBracketTable)
}
