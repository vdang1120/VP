document.addEventListener('scroll', function () {
    const element = document.querySelector('header');
    const scrollPoint = 40; // The scroll point at which the style will change

    if (window.scrollY > scrollPoint) {
        element.classList.add('scrolled');
    } else {
        element.classList.remove('scrolled');
    }
});