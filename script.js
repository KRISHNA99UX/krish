// Countdown Timer
function updateCountdown() {
    const eventDate = new Date('February 14, 2025 23:00:00').getTime();
    const now = new Date().getTime();
    const difference = eventDate - now;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    animateNumber('days', days);
    animateNumber('hours', hours);
    animateNumber('minutes', minutes);
    animateNumber('seconds', seconds);
}

function animateNumber(elementId, newValue) {
    const element = document.getElementById(elementId);
    if (element.innerHTML !== newValue.toString()) {
        element.style.transform = 'scale(1.2)';
        setTimeout(() => {
            element.style.transform = 'scale(1)';
            element.innerHTML = newValue;
        }, 200);
    }
}

setInterval(updateCountdown, 1000);

// RSVP Form Handling
function toggleRSVPForm() {
    const modal = document.getElementById('rsvpModal');
    modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
}

// Add loading animation
function showLoader() {
    document.querySelector('.loading-spinner').style.display = 'block';
}

function hideLoader() {
    document.querySelector('.loading-spinner').style.display = 'none';
}

// Form submission with loader
function handleSubmit(event) {
    showLoader();
    event.preventDefault();
    const form = document.getElementById('rsvpForm');
    const confirmation = document.getElementById('confirmationMessage');
    
    form.style.display = 'none';
    confirmation.style.display = 'block';
    
    setTimeout(() => {
        hideLoader();
        toggleRSVPForm();
        form.reset();
        form.style.display = 'block';
        confirmation.style.display = 'none';
    }, 1500);
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('rsvpModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

// Add creator button function
function showCreator() {
    alert("Designed with ❤️ by Krishna\nContact: krishna@example.com");
}

// Add particle background
function initParticles() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = 0;
    canvas.style.left = 0;
    document.querySelector('.hero').appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
            this.color = Math.random() > 0.5 ? '#FFDAB9' : '#D4AF37';
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if(this.x > canvas.width) this.x = 0;
            if(this.x < 0) this.x = canvas.width;
            if(this.y > canvas.height) this.y = 0;
            if(this.y < 0) this.y = canvas.height;
        }
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 15;
            ctx.shadowColor = this.color;
        }
    }

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resize);
    resize();
    particles = Array(100).fill().map(() => new Particle());
    animate();
}

// Initialize when page loads
window.addEventListener('load', initParticles);

// Add starry background
function createStars() {
    const container = document.querySelector('.hero');
    for(let i = 0; i < 200; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 1.5 + 's';
        container.appendChild(star);
    }
}
window.addEventListener('load', createStars);

// Intersection Observer for scroll animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(element => {
    observer.observe(element);
});

// Progress Bar Countdown
function updateProgressBar() {
    const eventDate = new Date('2025-02-14').getTime();
    const now = Date.now();
    const total = eventDate - new Date('2024-01-01').getTime();
    const elapsed = now - new Date('2024-01-01').getTime();
    const progress = (elapsed / total) * 100;
    document.querySelector('.countdown-progress-bar').style.width = `${Math.min(progress, 100)}%`;
}
setInterval(updateProgressBar, 1000);

// Hover Tilt Effect
document.querySelectorAll('.detail-item').forEach(item => {
    item.addEventListener('mousemove', (e) => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        item.style.transform = `
            perspective(1000px)
            rotateX(${(y - rect.height/2) / 10}deg)
            rotateY(${-(x - rect.width/2) / 10}deg)
            translateY(-8px)
        `;
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0)';
    });
});

// Smooth scroll to event details
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add intersection animations
const animatedElements = document.querySelectorAll('.animate-on-scroll');

const elementObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, { threshold: 0.15 });

animatedElements.forEach(element => {
    elementObserver.observe(element);
});

// Random Quotes Animation
const quotes = document.querySelectorAll('.quote-card');
quotes.forEach((quote, index) => {
    quote.style.animationDelay = `${index * 0.2}s`;
    quote.addEventListener('mouseenter', () => {
        if (quote.classList.contains('wishes-card')) {
            showConfetti();
        }
    });
});

// Enhanced showMessage function
function showMessage(type) {
    const messages = {
        principal: `Dear Principal,

Your guidance has been our north star throughout these years. Under your leadership, we've grown not just as students, but as individuals ready to face the world. Thank you for creating an environment where we could flourish and dream big.`,
        
        teachers: `Dear Teachers,

You've not just taught us subjects, but life lessons that we'll carry forever. Your patience, dedication, and belief in us have given us the confidence to chase our dreams. As we prepare for our board exams, we remember all your valuable teachings.

Thank you for preparing us for both exams and life.`,
        
        staff: `Dear Staff Members,

Thank you for making our school life comfortable and memorable. Your smiling faces and helpful nature have made these years special. From maintaining our classrooms to helping us with daily needs, you've been an essential part of our journey.

We'll miss seeing you every day.`
    };
    
    // Create a custom modal with enhanced styling
    const modal = document.createElement('div');
    modal.className = 'message-modal';
    modal.innerHTML = `
        <div class="message-content">
            <h3>Thank You Message</h3>
            <div class="message-text">${messages[type].split('\n\n').map(para => `<p>${para}</p>`).join('')}</div>
            <button onclick="this.parentElement.parentElement.remove(); showConfetti();">Close ❤️</button>
        </div>
    `;
    document.body.appendChild(modal);
}

// Add confetti effect for special interactions
function showConfetti() {
    const colors = ['#FF6B6B', '#4A90E2', '#FFD700'];
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: colors
    });
}

// Trigger confetti on memory card hover
document.querySelectorAll('.memory-card').forEach(card => {
    card.addEventListener('mouseenter', showConfetti);
}); 