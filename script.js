// DOM Elements
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');

// Mobile Menu Toggle
mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    if (mobileMenu.classList.contains('hidden')) {
        menuIcon.className = 'fa-solid fa-bars text-2xl';
    } else {
        menuIcon.className = 'fa-solid fa-xmark text-2xl';
    }
});

// Close Mobile Menu
function closeMobileMenu() {
    mobileMenu.classList.add('hidden');
    menuIcon.className = 'fa-solid fa-bars text-2xl';
}

// Switch Between Tabs
function switchTab(tabName) {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Show selected tab content
    const selectedTab = document.getElementById(`tab-${tabName}`);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }

    // Update desktop navigation buttons
    document.querySelectorAll('.nav-btn').forEach(button => {
        button.classList.remove('text-accent-gold', 'border-accent-gold', 'active-link');
        button.classList.add('text-gray-600', 'border-transparent');
    });
    
    const desktopNavBtn = document.getElementById(`nav-${tabName}`);
    if (desktopNavBtn) {
        desktopNavBtn.classList.remove('text-gray-600', 'border-transparent');
        desktopNavBtn.classList.add('text-accent-gold', 'border-accent-gold', 'active-link');
    }

    // Update mobile navigation buttons
    document.querySelectorAll('.mob-nav-btn').forEach(button => {
        button.classList.remove('text-accent-gold', 'bg-gray-50');
        button.classList.add('text-gray-700');
    });
    
    const mobileNavBtn = document.getElementById(`mob-nav-${tabName}`);
    if (mobileNavBtn) {
        mobileNavBtn.classList.add('text-accent-gold', 'bg-gray-50');
        mobileNavBtn.classList.remove('text-gray-700');
    }

    // Scroll to top smoothly
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    
    // Close mobile menu if open
    closeMobileMenu();
}

// Handle Contact Form Submission
function handleFormSubmit(event) {
    event.preventDefault();
    
    // Get form values
    const nama = document.getElementById('nama').value;
    const email = document.getElementById('email').value;
    const layanan = document.getElementById('layanan-pilih').value;
    const pesan = document.getElementById('pesan').value;
    
    // Get alert element
    const alert = document.getElementById('form-alert');
    
    // Show success message
    alert.classList.remove('hidden', 'bg-red-100', 'text-red-700');
    alert.classList.add('bg-green-100', 'text-green-700', 'border', 'border-green-200');
    alert.innerHTML = `<strong>Terima kasih, ${nama}!</strong> Pesan Anda telah diterima. Kami akan menghubungi ${email} dalam 24 jam.`;
    
    // Reset form
    document.getElementById('contactForm').reset();
    
    // Hide alert after 6 seconds
    setTimeout(() => {
        alert.classList.add('hidden');
        alert.classList.remove('bg-green-100', 'text-green-700', 'border', 'border-green-200');
    }, 6000);
    
    // Optional: You could add actual form submission logic here
    console.log('Form submitted:', { nama, email, layanan, pesan });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (event) => {
    const isClickInside = mobileMenu.contains(event.target) || mobileMenuBtn.contains(event.target);
    if (!isClickInside && !mobileMenu.classList.contains('hidden')) {
        closeMobileMenu();
    }
});

// Handle keyboard navigation
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
        closeMobileMenu();
    }
});

// Initialize active tab on page load
document.addEventListener('DOMContentLoaded', () => {
    // Set beranda as default active tab
    switchTab('beranda');
    
    // Handle smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Optional: Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Optional: Handle window resize for mobile menu
window.addEventListener('resize', () => {
    if (window.innerWidth >= 768 && !mobileMenu.classList.contains('hidden')) {
        closeMobileMenu();
    }
});