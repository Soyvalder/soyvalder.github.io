const btn = document.getElementById('button');
const sectionAll = document.querySelectorAll('section[id]');
const inputName = document.querySelector('#nombre');
const inputEmail = document.querySelector('#email');
const flagsElement = document.getElementById('flags');
const textsToChange = document.querySelectorAll('[data-section]');

/* ===== Loader =====*/
window.addEventListener('load', () => {
    const contenedorLoader = document.querySelector('.container--loader');
    contenedorLoader.style.opacity = 0;
    contenedorLoader.style.visibility = 'hidden';
})

/*===== Header =====*/
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('abajo', window.scrollY > 0);
});

/*===== Boton Menu =====*/
btn.addEventListener('click', function() {
    if (this.classList.contains('active')) {
        this.classList.remove('active');
        this.classList.add('not-active');
        document.querySelector('.nav_menu').classList.remove('active');
        document.querySelector('.nav_menu').classList.add('not-active');
    }
    else {
        this.classList.add('active');
        this.classList.remove('not-active');
        document.querySelector('.nav_menu').classList.remove('not-active');
        document.querySelector('.nav_menu').classList.add('active');
    }
});

/*===== Cambio de idioma =====*/
let currentLanguage = localStorage.getItem('language') || 'es';

const changeLanguage = async language => {
    try {
        const requestJson = await fetch(`./languages/${language}.json`);
        const texts = await requestJson.json();

        for(const textToChange of textsToChange) {
            const section = textToChange.dataset.section;
            const value = textToChange.dataset.value;

            if (texts[section] && texts[section][value]) {
                textToChange.innerHTML = texts[section][value];
            }
        }
        
        // Actualizar el idioma actual y guardarlo
        currentLanguage = language;
        localStorage.setItem('language', language);
    } catch (error) {
        console.error('Error al cambiar el idioma:', error);
    }
}

// Cargar el idioma guardado al iniciar la página
document.addEventListener('DOMContentLoaded', () => {
    changeLanguage(currentLanguage);
});

flagsElement.addEventListener('click', (e) => {
    const flagElement = e.target.closest('.flags__item');
    if (flagElement) {
        const newLanguage = flagElement.dataset.language;
        if (newLanguage !== currentLanguage) {
            changeLanguage(newLanguage);
        }
    }
})

/*===== class active por secciones =====*/
window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sectionAll.forEach((current) => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY < sectionTop + sectionHeight) {
            document.querySelector('nav a[href*=' + sectionId + ']').classList.add('active');
        }
        else {
            document.querySelector('nav a[href*=' + sectionId + ']').classList.remove('active');
        }
    });
});

/*===== Boton y función ir arriba =====*/
window.onscroll = function() {
    if (document.documentElement.scrollTop > 100) {
        document.querySelector('.go-top-container').classList.add('show');
    }
    else {
        document.querySelector('.go-top-container').classList.remove('show');
    }
}

document.querySelector('.go-top-container').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});