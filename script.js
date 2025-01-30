const toggleSwitch = document.getElementById("darkModeToggle");
const body = document.body;

// Check if dark mode is already enabled
if (localStorage.getItem("darkMode") === "enabled") {
    body.classList.add("dark");
    toggleSwitch.checked = true;
}

// Toggle dark mode
toggleSwitch.addEventListener("change", () => {
    if (toggleSwitch.checked) {
        body.classList.add("dark");
        localStorage.setItem("darkMode", "enabled");
    } else {
        body.classList.remove("dark");
        localStorage.setItem("darkMode", "disabled");
    }
});
const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 50;

// Particle Class
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 4 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.opacity = Math.random() * 0.5 + 0.5;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
}

// Initialize Particles
function initParticles() {
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

// Animate Particles
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle) => {
        particle.update();
        particle.draw();
    });

    requestAnimationFrame(animateParticles);
}

// Resize Canvas
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles.length = 0;
    initParticles();
});

// Start Animation
initParticles();
animateParticles();

window.addEventListener("load", () => {
    setTimeout(() => {
        document.getElementById("preloader").classList.add("hidden");
    }, 5000); // 5000 milliseconds = 5 seconds
});