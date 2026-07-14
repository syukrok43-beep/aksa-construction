const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');

mobileMenuBtn.addEventListener('click', () => {
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
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    const selectedTab = document.getElementById(`tab-${tabName}`);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }

    document.querySelectorAll('.nav-btn').forEach(button => {
        button.classList.remove('text-accent-gold', 'border-accent-gold', 'active-link');
        button.classList.add('text-gray-600', 'border-transparent');
    });
    
    const desktopNavBtn = document.getElementById(`nav-${tabName}`);
    if (desktopNavBtn) {
        desktopNavBtn.classList.remove('text-gray-600', 'border-transparent');
        desktopNavBtn.classList.add('text-accent-gold', 'border-accent-gold', 'active-link');
    }

    document.querySelectorAll('.mob-nav-btn').forEach(button => {
        button.classList.remove('text-accent-gold', 'bg-gray-50');
        button.classList.add('text-gray-700');
    });
    
    const mobileNavBtn = document.getElementById(`mob-nav-${tabName}`);
    if (mobileNavBtn) {
        mobileNavBtn.classList.add('text-accent-gold', 'bg-gray-50');
        mobileNavBtn.classList.remove('text-gray-700');
    }

    if (tabName === 'beranda') {
        history.pushState(null, '', window.location.pathname);
    } else {
        history.pushState(null, '', `#${tabName}`);
    }

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    
    closeMobileMenu();
}

window.addEventListener('popstate', function(event) {
    const hash = window.location.hash.replace('#', '');
    if (hash === 'layanan' || hash === 'tentang') {
        switchTab(hash);
    } else {
        switchTab('beranda');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash.replace('#', '');
    if (hash === 'layanan' || hash === 'tentang') {
        switchTab(hash);
    } else {
        switchTab('beranda');
    }
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            if (href === '#hubungi-kami') {
                e.preventDefault();
                switchTab('beranda');
                setTimeout(() => {
                    const targetElement = document.querySelector('#hubungi-kami');
                    if (targetElement) {
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }, 300);
            }
        });
    });
});

function handleFormSubmit(event) {
    event.preventDefault();
    
    const nama = document.getElementById('nama').value;
    const email = document.getElementById('email').value;
    const layanan = document.getElementById('layanan-pilih').value;
    const pesan = document.getElementById('pesan').value;
    
    const alert = document.getElementById('form-alert');
    
    alert.classList.remove('hidden', 'bg-red-100', 'text-red-700');
    alert.classList.add('bg-green-100', 'text-green-700', 'border', 'border-green-200');
    alert.innerHTML = `<strong>Terima kasih, ${nama}!</strong> Pesan Anda telah diterima. Kami akan menghubungi ${email} dalam 24 jam.`;
    
    document.getElementById('contactForm').reset();
    
    setTimeout(() => {
        alert.classList.add('hidden');
        alert.classList.remove('bg-green-100', 'text-green-700', 'border', 'border-green-200');
    }, 6000);
    
    console.log('Form submitted:', { nama, email, layanan, pesan });
}

document.addEventListener('click', (event) => {
    const isClickInside = mobileMenu.contains(event.target) || mobileMenuBtn.contains(event.target);
    if (!isClickInside && !mobileMenu.classList.contains('hidden')) {
        closeMobileMenu();
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
        closeMobileMenu();
    }
});

window.addEventListener('resize', () => {
    if (window.innerWidth >= 768 && !mobileMenu.classList.contains('hidden')) {
        closeMobileMenu();
    }
});
