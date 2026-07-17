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

// Switch Between Tabs (Diperbarui dengan History API)
function switchTab(tabName, isBackAction = false) {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Show selected tab content
    const selectedTab = document.getElementById(`tab-${tabName}`);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }

    // Simpan ke riwayat browser JIKA perpindahan tab BUKAN dari menekan tombol "Back"
    if (!isBackAction) {
        history.pushState({ tab: tabName }, "", `#${tabName}`);
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

// Initialize active tab on page load (Diperbarui)
document.addEventListener('DOMContentLoaded', () => {
    // Membaca URL saat web pertama kali di-load (misal ada user yang share link webmu langsung ke tab layanan)
    const initialTab = window.location.hash.replace('#', '') || 'beranda';
    
    // Simpan history status pertama kali
    history.replaceState({ tab: initialTab }, "", window.location.hash || '#beranda');
    
    // Set tab sesuai URL atau default ke beranda
    switchTab(initialTab, true);
    
    // Handle smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            
            // Mencegah error jika href hanya berisi '#'
            if(targetId.length > 1) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});

// Deteksi ketika user menekan tombol Back / Forward di browser (FITUR BARU)
window.addEventListener('popstate', (event) => {
    if (event.state && event.state.tab) {
        // Kembali ke tab sebelumnya tanpa menambah riwayat baru
        switchTab(event.state.tab, true);
    } else {
        // Jika kembali ke paling awal, set ke beranda
        switchTab('beranda', true);
    }
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
