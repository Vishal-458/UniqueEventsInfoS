// ===== MOBILE MENU TOGGLE =====
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');
const header = document.getElementById('mainHeader');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.innerHTML = navLinks.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
}

// ===== HEADER FADE OUT ON SCROLL =====
let lastScrollTop = 0;
const fadeStart = 100; // Start fading after 100px
const fadeEnd = 300;   // Completely faded at 300px

window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Calculate opacity
    let opacity = 1;
    if (scrollTop > fadeStart) {
        opacity = 1 - ((scrollTop - fadeStart) / (fadeEnd - fadeStart));
        if (opacity < 0) opacity = 0;
    }
    
    // Apply opacity
    header.style.opacity = opacity;
    header.style.transition = 'opacity 0.3s ease';
    
    // Keep header background when faded
    if (scrollTop > 50) {
        header.style.background = 'rgba(74, 20, 140, 0.95)';
        header.style.padding = '12px 0';
        header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.25)';
    } else {
        header.style.background = 'linear-gradient(135deg, var(--dark-burgundy), var(--purple), var(--maroon))';
        header.style.padding = '15px 0';
        header.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.2)';
    }
    
    lastScrollTop = scrollTop;
});

// Show header on hover
header.addEventListener('mouseenter', function() {
    this.style.opacity = '1';
});

// Restore fade on mouse leave
header.addEventListener('mouseleave', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    let opacity = 1;
    if (scrollTop > fadeStart) {
        opacity = 1 - ((scrollTop - fadeStart) / (fadeEnd - fadeStart));
        if (opacity < 0) opacity = 0;
    }
    this.style.opacity = opacity;
});

// ===== SMOOTH SCROLLING FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Show header when clicking navigation links
            header.style.opacity = '1';
            setTimeout(() => {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                let opacity = 1;
                if (scrollTop > fadeStart) {
                    opacity = 1 - ((scrollTop - fadeStart) / (fadeEnd - fadeStart));
                    if (opacity < 0) opacity = 0;
                }
                header.style.opacity = opacity;
            }, 1000);
        }
    });
});

// ===== CONTACT FORM SUBMISSION =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const eventType = document.getElementById('event-type').value;
        
        // Show success message with Hindi touch
        alert(`धन्यवाद ${name}! हमने आपकी ${eventType} जानकारी प्राप्त कर ली है और 24 घंटों के भीतर ${email} पर आपसे संपर्क करेंगे। शुभारम्भ!`);
        
        // Reset form
        contactForm.reset();
    });
}

// ===== ANIMATION ON SCROLL =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// ===== INITIALIZE ON PAGE LOAD =====
document.addEventListener('DOMContentLoaded', function() {
    // Add fade-in animation to elements
    const fadeElements = document.querySelectorAll('.service-card, .gallery-item, .about-content');
    
    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Update current year in footer
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    // Fix for contact icon rotation - apply to all contact icons
    const contactIcons = document.querySelectorAll('.contact-icon-rotated');
    contactIcons.forEach(icon => {
        icon.style.transform = 'rotate(90deg)';
    });
    
    // Set initial header state
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    let opacity = 1;
    if (scrollTop > fadeStart) {
        opacity = 1 - ((scrollTop - fadeStart) / (fadeEnd - fadeStart));
        if (opacity < 0) opacity = 0;
    }
    header.style.opacity = opacity;
});
// Video Controls Functions
function toggleMute(button) {
    const videoContainer = button.closest('.video-player-container');
    const iframe = videoContainer.querySelector('iframe');
    const icon = button.querySelector('i');
    
    // Get current src
    let src = iframe.src;
    
    if (src.includes('mute=1')) {
        // Unmute
        src = src.replace('mute=1', 'mute=0');
        icon.className = 'fas fa-volume-mute';
    } else {
        // Mute
        src = src.replace('mute=0', 'mute=1');
        icon.className = 'fas fa-volume-up';
    }
    
    iframe.src = src;
}

function togglePlay(button) {
    const videoContainer = button.closest('.video-player-container');
    const iframe = videoContainer.querySelector('iframe');
    const icon = button.querySelector('i');
    
    // YouTube iframe API would be needed for proper play/pause
    // This is a visual toggle only
    if (icon.className.includes('fa-pause')) {
        icon.className = 'fas fa-play';
        button.title = 'Play video';
    } else {
        icon.className = 'fas fa-pause';
        button.title = 'Pause video';
    }
}

// Auto-play all videos when in viewport
const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const iframe = entry.target.querySelector('iframe');
            // YouTube videos auto-play when they come into view
            console.log('Video in view:', entry.target);
        }
    });
}, {
    threshold: 0.5
});

// Observe all video containers
document.querySelectorAll('.video-player-container').forEach(container => {
    videoObserver.observe(container);
});