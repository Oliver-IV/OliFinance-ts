const menuBtn = document.getElementById('menuBtn');
const navMenu = document.getElementById('navMenu');

menuBtn.addEventListener('click', function() {
    navMenu.classList.toggle('hidden');
});

document.addEventListener('click', function(event) {
    const isClickInsideMenu = navMenu.contains(event.target);
    const isClickOnMenuBtn = menuBtn.contains(event.target);
    
    if (!isClickInsideMenu && !isClickOnMenuBtn && !navMenu.classList.contains('hidden') && window.innerWidth < 768) {
        navMenu.classList.add('hidden');
    }
});

window.addEventListener('resize', function() {
    if (window.innerWidth >= 768) {
        navMenu.classList.remove('hidden');
    } else {
        navMenu.classList.add('hidden');
    }
}) ;