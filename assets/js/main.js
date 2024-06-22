(function() {
    // JS Loaded
    let body = document.body;
    body.classList.add('js-loaded');

    // AOS Init
    AOS.init({
        duration: 800,
        once: true,
        easing: 'ease',
        disable: 'phone',
    });
})();