// Countdown Logic
const countdown = () => {
  const countDate = new Date("June 12, 2025 00:00:00").getTime();
  const now = new Date().getTime();
  const gap = countDate - now;

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  if (gap <= 0) {
    document.getElementById("countdown").innerHTML = "🎉 Just Married! 🎉";
    showFireworks();
    return;
  }

  document.getElementById("days").innerText = Math.floor(gap / day);
  document.getElementById("hours").innerText = Math.floor((gap % day) / hour);
  document.getElementById("minutes").innerText = Math.floor((gap % hour) / minute);
  document.getElementById("seconds").innerText = Math.floor((gap % minute) / second);
};

setInterval(countdown, 1000);

// Fireworks animation (very lightweight)
function showFireworks() {
  const canvas = document.getElementById("fireworks");
  canvas.style.display = "block";
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];

  function createFirework() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height / 2;
    for (let i = 0; i < 100; i++) {
      particles.push({
        x, y,
        dx: Math.random() * 4 - 2,
        dy: Math.random() * 4 - 
