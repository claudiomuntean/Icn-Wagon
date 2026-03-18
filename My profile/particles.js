// Floating ember / firefly particles — Viking campfire atmosphere
(function () {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  const COLORS = ['rgba(201,168,76,', 'rgba(90,122,58,', 'rgba(232,201,106,'];
  const COUNT = 55;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function rand(a, b) { return a + Math.random() * (b - a); }

  function createParticle() {
    return {
      x: rand(0, W),
      y: rand(0, H),
      r: rand(0.5, 2.2),
      vx: rand(-0.15, 0.15),
      vy: rand(-0.35, -0.08),
      alpha: rand(0.1, 0.7),
      da: rand(-0.003, 0.003),
      color: COLORS[Math.floor(Math.random() * COLORS.length)]
    };
  }

  function init() {
    resize();
    particles = Array.from({ length: COUNT }, createParticle);
  }

  function update() {
    ctx.clearRect(0, 0, W, H);
    for (let p of particles) {
      p.x  += p.vx;
      p.y  += p.vy;
      p.alpha += p.da;
      if (p.alpha <= 0.05 || p.alpha >= 0.75) p.da *= -1;
      if (p.y < -10) { p.y = H + 5; p.x = rand(0, W); }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color + p.alpha + ')';
      ctx.fill();
    }
    requestAnimationFrame(update);
  }

  window.addEventListener('resize', resize);
  init();
  update();
})();
