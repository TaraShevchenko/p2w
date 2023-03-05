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