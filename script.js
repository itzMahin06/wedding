const music = document.getElementById('bgMusic');
window.addEventListener('click', () => music.play()); // user interaction required

const endDate = new Date("June 30, 2025 00:00:00").getTime();
const countdown = setInterval(() => {
  const now = new Date().getTime();
  const diff = endDate - now;

  if (diff < 0) {
    clearInterval(countdown);
    document.getElementById('countdown').innerHTML = "<h2>🎉 We're Married! 🎆</h2>";
    launchFireworks();
    return;
  }

  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const s = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById("days").innerText = d;
  document.getElementById("hours").innerText = h;
  document.getElementById("minutes").innerText = m;
  document.getElementById("seconds").innerText = s;
}, 1000);

// Fireworks animation
function launchFireworks() {
  const canvas = document.getElementById('fireworks');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const fireworks = [];
  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  class Firework {
    constructor() {
      this.x = canvas.width / 2;
      this.y = canvas.height;
      this.tx = random(0, canvas.width);
      this.ty = random(0, canvas.height / 2);
      this.dist = Math.hypot(this.tx - this.x, this.ty - this.y);
      this.angle = Math.atan2(this.ty - this.y, this.tx - this.x);
      this.speed = 10;
      this.brightness = random(50, 100);
      this.exploded = false;
    }
    update() {
      const vx = Math.cos(this.angle) * this.speed;
      const vy = Math.sin(this.angle) * this.speed;
      this.x += vx;
      this.y += vy;
      if (Math.hypot(this.tx - this.x, this.ty - this.y) < 10) this.exploded = true;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = `hsl(${random(0, 360)}, 100%, ${this.brightness}%)`;
      ctx.fill();
    }
  }

  function animate() {
    ctx.fillStyle = "rgba(0,0,0,0.2)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (Math.random() < 0.05) {
      fireworks.push(new Firework());
    }

    fireworks.forEach((fw, i) => {
      if (fw.exploded) fireworks.splice(i, 1);
      fw.update();
      fw.draw();
    });

    requestAnimationFrame(animate);
  }

  animate();
}
