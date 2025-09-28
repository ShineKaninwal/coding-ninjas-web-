// Canvas setup
const canvas = document.getElementById('background-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Particle class
class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 1;
    this.speedX = Math.random() * 1 - 0.5;
    this.speedY = Math.random() * 1 - 0.5;
    this.color = `rgba(0,255,170,${Math.random()})`;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    // Bounce off edges
    if (this.x < 0 || this.x > canvas.width) this.speedX = -this.speedX;
    if (this.y < 0 || this.y > canvas.height) this.speedY = -this.speedY;

    // Mouse attraction
    if (mouse.x && mouse.y) {
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        this.x += dx / dist;
        this.y += dy / dist;
      }
    }
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

let particlesArray = [];
function initParticles() {
  particlesArray = [];
  for (let i = 0; i < 150; i++) particlesArray.push(new Particle());
}
initParticles();

// Mouse tracking
let mouse = { x: null, y: null };
canvas.addEventListener('mousemove', e => {
  mouse.x = e.x;
  mouse.y = e.y;
});
canvas.addEventListener('mouseleave', () => {
  mouse.x = null;
  mouse.y = null;
});

// Animate particles and neon circuit lines
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw particles
  particlesArray.forEach(p => {
    p.update();
    p.draw();
  });

  // Draw lines connecting nearby particles
  for (let i = 0; i < particlesArray.length; i++) {
    for (let j = i; j < particlesArray.length; j++) {
      const dx = particlesArray[i].x - particlesArray[j].x;
      const dy = particlesArray[i].y - particlesArray[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.strokeStyle = `rgba(0,255,170,${1 - dist / 120})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
        ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(animate);
}
animate();

// Handle window resize
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
});

// Registration form validation
const form = document.getElementById('registrationForm');
if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const category = document.getElementById('category').value;

    if (!name || !email || !category) {
      alert('Please fill in all required fields.');
      return;
    }

    alert(`Thank you ${name} for registering! See you at CodeFest 2025 🚀`);
    form.reset();
  });
  
}
