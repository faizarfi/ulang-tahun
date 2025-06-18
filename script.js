// --- Hitung Mundur Ulang Tahun ---
// Set tanggal ulang tahun Hanifah (Bulan dimulai dari 0: Juni adalah 5)
// Pastikan zona waktu sesuai jika ada masalah. Disini diasumsikan WIB/Lokal.
const birthdayDate = new Date("June 22, 2025 00:00:00").getTime();
const countdownElement = document.getElementById("countdown");

const updateCountdown = setInterval(function() {
    const now = new Date().getTime();
    const distance = birthdayDate - now;

    if (distance < 0) {
        clearInterval(updateCountdown);
        countdownElement.innerHTML = `
            🎉 <strong>SELAMAT ULANG TAHUN KE-21, HANIFAH!</strong> 🎉
            <div class="birthday-fireworks"></div>
        `;
        countdownElement.classList.add('birthday-active'); // Add class for specific birthday styling/animation
        
        // Add dynamic CSS for fireworks (simple animation)
        const styleSheet = document.createElement("style");
        styleSheet.type = "text/css";
        styleSheet.innerText = `
            @keyframes pulse {
                0% { transform: scale(1); opacity: 1; }
                100% { transform: scale(1.05); opacity: 0.9; }
            }
            .birthday-active {
                color: #4CAF50; /* Green for celebration */
                font-size: 2.8em;
                font-weight: bold;
                animation: pulse 1s infinite alternate;
                position: relative; /* For fireworks absolute positioning */
            }
            /* Simple fireworks effect (CSS only, more complex with JS) */
            .birthday-fireworks {
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                pointer-events: none; /* Allows clicks through */
                overflow: hidden;
            }
            .birthday-fireworks::before, .birthday-fireworks::after {
                content: '';
                position: absolute;
                background-color: #ffeb3b; /* Yellow spark */
                border-radius: 50%;
                opacity: 0;
                animation: fireworks 1.5s ease-out forwards;
            }
            .birthday-fireworks::before {
                width: 10px; height: 10px;
                top: 50%; left: 30%;
                animation-delay: 0.2s;
            }
            .birthday-fireworks::after {
                width: 12px; height: 12px;
                top: 60%; right: 25%;
                animation-delay: 0.8s;
            }
            @keyframes fireworks {
                0% { transform: scale(0); opacity: 1; }
                100% { transform: scale(2); opacity: 0; box-shadow: 0 0 15px #ffeb3b; }
            }
        `;
        document.head.appendChild(styleSheet);
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdownElement.innerHTML = `
        ${days} <small>hari</small> | 
        ${hours} <small>jam</small> | 
        ${minutes} <small>menit</small> | 
        ${seconds} <small>detik</small>
    `;
}, 1000);

// --- Tombol Kejutan ---
const surpriseButton = document.getElementById('surpriseButton');
const surpriseMessage = document.getElementById('surpriseMessage');

if (surpriseButton && surpriseMessage) {
    surpriseButton.addEventListener('click', function() {
        surpriseMessage.classList.remove('hidden');
        surpriseMessage.classList.add('visible'); // Add visible class for transition
        this.style.display = 'none';

        // Scroll to the surprise message with a slight delay for animation
        setTimeout(() => {
            surpriseMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    });
}

// --- Animasi Fade-in untuk Section saat discroll (Intersection Observer) ---
const sectionsToAnimate = document.querySelectorAll('.section-block');

const observerOptions = {
    root: null, // Observe from the viewport
    rootMargin: '0px',
    threshold: 0.1 // When 10% of the element is visible
};

const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('anim-on-scroll'); // Add class to trigger CSS transition
            observer.unobserve(entry.target); // Stop observing after animation
        }
    });
}, observerOptions);

sectionsToAnimate.forEach(section => {
    sectionObserver.observe(section);
});

// --- Smooth Scrolling for Navigation ---
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const headerHeight = document.querySelector('.main-header').offsetHeight;
            window.scrollTo({
                top: targetElement.offsetTop - (headerHeight + 20), // Offset by header height + padding
                behavior: 'smooth'
            });
            // Close mobile nav if open
            const mainNav = document.querySelector('.main-nav');
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                document.querySelector('.nav-toggle').classList.remove('active');
            }
        }
    });
});

// --- Scroll down button for hero section ---
const scrollDownBtn = document.querySelector('.scroll-down-btn');
if (scrollDownBtn) {
    scrollDownBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('.main-header').offsetHeight;
            window.scrollTo({
                top: targetElement.offsetTop - (headerHeight + 20),
                behavior: 'smooth'
            });
        }
    });
}

// --- Toggle "Baca Lebih Lanjut" button ---
const readMoreBtn = document.querySelector('.read-more-btn');
if (readMoreBtn) {
    readMoreBtn.addEventListener('click', function() {
        const targetId = this.dataset.target;
        const hiddenContent = document.getElementById(targetId);
        if (hiddenContent) {
            hiddenContent.classList.toggle('visible');
            if (hiddenContent.classList.contains('visible')) {
                this.textContent = 'Sembunyikan Detail';
            } else {
                this.textContent = 'Baca Lebih Lanjut';
            }
        }
    });
}

// --- Mobile Navigation Toggle ---
const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');

if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        navToggle.classList.toggle('active'); // For animating hamburger icon
    });
}

// --- Optional: Dynamic background particles (more complex, might need a library or more advanced JS) ---
// The CSS already provides a basic animated background. For more complex "particle" effects,
// you might integrate a library like particles.js or create a more robust JS particle system.
// The current CSS `.background-particles` class provides a subtle, animated gradient effect.