var mobileMenuBtn = document.getElementById('mobile-menu-btn');
var mobileMenu = document.getElementById('mobile-menu');
var menuIcon = document.getElementById('menu-icon');

mobileMenuBtn.addEventListener('click', function() {
    mobileMenu.classList.toggle('hidden');
    if (mobileMenu.classList.contains('hidden')) {
        menuIcon.className = 'fa-solid fa-bars text-2xl';
    } else {
        menuIcon.className = 'fa-solid fa-xmark text-2xl';
    }
});

function closeMobileMenu() {
    mobileMenu.classList.add('hidden');
    menuIcon.className = 'fa-solid fa-bars text-2xl';
}

function switchTab(tabName) {
    var contents = document.querySelectorAll('.tab-content');
    for (var i = 0; i < contents.length; i++) {
        contents[i].classList.remove('active');
    }
    
    var selectedTab = document.getElementById('tab-' + tabName);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }

    var navBtns = document.querySelectorAll('.nav-btn');
    for (var i = 0; i < navBtns.length; i++) {
        navBtns[i].classList.remove('text-accent-gold', 'border-accent-gold');
        navBtns[i].classList.add('text-gray-600', 'border-transparent');
    }
    
    var desktopNavBtn = document.getElementById('nav-' + tabName);
    if (desktopNavBtn) {
        desktopNavBtn.classList.remove('text-gray-600', 'border-transparent');
        desktopNavBtn.classList.add('text-accent-gold', 'border-accent-gold');
    }

    var mobBtns = document.querySelectorAll('.mob-nav-btn');
    for (var i = 0; i < mobBtns.length; i++) {
        mobBtns[i].classList.remove('text-accent-gold', 'bg-gray-50');
    }
    
    var mobileNavBtn = document.getElementById('mob-nav-' + tabName);
    if (mobileNavBtn) {
        mobileNavBtn.classList.add('text-accent-gold', 'bg-gray-50');
    }

    if (tabName === 'beranda') {
        history.pushState(null, '', window.location.pathname);
    } else {
        history.pushState(null, '', '#' + tabName);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
    closeMobileMenu();
}

window.addEventListener('popstate', function(event) {
    var hash = window.location.hash.replace('#', '');
    if (hash === 'layanan' || hash === 'tentang') {
        switchTab(hash);
    } else {
        switchTab('beranda');
    }
});

window.addEventListener('load', function() {
    var hash = window.location.hash.replace('#', '');
    if (hash === 'layanan' || hash === 'tentang') {
        switchTab(hash);
    } else {
        switchTab('beranda');
    }
});

function handleFormSubmit(event) {
    event.preventDefault();
    var nama = document.getElementById('nama').value;
    var email = document.getElementById('email').value;
    var alert = document.getElementById('form-alert');
    alert.classList.remove('hidden', 'bg-red-100', 'text-red-700');
    alert.classList.add('bg-green-100', 'text-green-700', 'border', 'border-green-200');
    alert.innerHTML = '<strong>Terima kasih, ' + nama + '!</strong> Pesan Anda telah diterima. Kami akan menghubungi ' + email + ' dalam 24 jam.';
    document.getElementById('contactForm').reset();
    setTimeout(function() {
        alert.classList.add('hidden');
        alert.classList.remove('bg-green-100', 'text-green-700', 'border', 'border-green-200');
    }, 6000);
}

document.addEventListener('click', function(event) {
    var isClickInside = mobileMenu.contains(event.target) || mobileMenuBtn.contains(event.target);
    if (!isClickInside && !mobileMenu.classList.contains('hidden')) {
        closeMobileMenu();
    }
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
        closeMobileMenu();
    }
});

window.addEventListener('resize', function() {
    if (window.innerWidth >= 768 && !mobileMenu.classList.contains('hidden')) {
        closeMobileMenu();
    }
});
