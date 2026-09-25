// Interactive Soundwave & Particle Physics Canvas for Dilo Digital Hero
export class SoundwaveCanvas {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.width = canvas.width = canvas.offsetWidth;
    this.height = canvas.height = canvas.offsetHeight;

    this.mouse = { x: this.width * 0.5, y: this.height * 0.5, targetX: this.width * 0.5, targetY: this.height * 0.5 };
    this.rings = [];
    this.particles = [];
    this.waves = [];
    this.shockwaves = [];
    this.animationId = null;
    this.time = 0;

    // Center origin (the megaphone position relative to canvas)
    this.origin = { x: this.width * 0.72, y: this.height * 0.48 };

    this.init();
    this.bindEvents();
    this.loop();
  }

  init() {
    this.resize();

    // Create persistent concentric soundwaves emanating from the megaphone horn
    this.waves = [
      { radius: 60, speed: 0.8, maxRadius: 420, opacity: 0.4, color: 'rgba(226, 28, 33, ' },
      { radius: 140, speed: 0.75, maxRadius: 460, opacity: 0.35, color: 'rgba(255, 90, 31, ' },
      { radius: 220, speed: 0.7, maxRadius: 520, opacity: 0.28, color: 'rgba(226, 28, 33, ' },
      { radius: 300, speed: 0.65, maxRadius: 580, opacity: 0.2, color: 'rgba(255, 107, 0, ' },
      { radius: 380, speed: 0.6, maxRadius: 660, opacity: 0.12, color: 'rgba(226, 28, 33, ' }
    ];

    // Ambient floating sonic particles
    this.particles = [];
    const count = Math.min(window.innerWidth < 768 ? 20 : 45, 50);
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: this.origin.x + (Math.random() - 0.2) * 500,
        y: this.origin.y + (Math.random() - 0.5) * 400,
        vx: (Math.random() * 0.6 + 0.2) * (Math.random() > 0.5 ? 1 : -1),
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1.5,
        baseAlpha: Math.random() * 0.4 + 0.2,
        color: Math.random() > 0.4 ? '#E21C21' : '#FF6B00',
        angle: Math.random() * Math.PI * 2
      });
    }
  }

  resize() {
    if (!this.canvas) return;
    this.width = this.canvas.width = this.canvas.offsetWidth;
    this.height = this.canvas.height = this.canvas.offsetHeight;
    
    // Position origin depending on viewport (desktop vs mobile)
    if (this.width < 960) {
      this.origin = { x: this.width * 0.5, y: this.height * 0.65 };
    } else {
      this.origin = { x: this.width * 0.68, y: this.height * 0.5 };
    }
  }

  bindEvents() {
    window.addEventListener('resize', () => this.resize(), { passive: true });

    this.canvas.parentElement?.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.targetX = e.clientX - rect.left;
      this.mouse.targetY = e.clientY - rect.top;
    }, { passive: true });
  }

  triggerSonicShockwave() {
    // Add rapid expanding sonic shockwave rings
    this.shockwaves.push({
      radius: 40,
      maxRadius: Math.max(this.width, this.height) * 0.8,
      speed: 12,
      opacity: 0.85,
      lineWidth: 5
    });

    // Scatter particles violently outward
    this.particles.forEach(p => {
      const dx = p.x - this.origin.x;
      const dy = p.y - this.origin.y;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      p.vx += (dx / dist) * 8;
      p.vy += (dy / dist) * 8;
    });
  }

  loop() {
    this.time += 0.025;
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Smooth mouse interpolation
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.08;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.08;

    // 1. Draw Concentric Ambient Acoustic Waves
    this.waves.forEach((w) => {
      w.radius += w.speed;
      if (w.radius > w.maxRadius) {
        w.radius = 50;
      }

      // Calculate fade out as wave expands
      const progress = (w.radius - 50) / (w.maxRadius - 50);
      const alpha = Math.max(0, w.opacity * (1 - progress));

      this.ctx.save();
      this.ctx.beginPath();

      // Deform arc towards mouse position for tactile magnetism
      const mouseDistX = (this.mouse.x - this.origin.x) * 0.08;
      const mouseDistY = (this.mouse.y - this.origin.y) * 0.08;
      const centerX = this.origin.x + mouseDistX * (1 - progress);
      const centerY = this.origin.y + mouseDistY * (1 - progress);

      // Arc with frequency oscillation
      const segments = 36;
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        // Harmonic noise perturbation
        const waveOsc = Math.sin(theta * 6 + this.time * 2) * 5 * (1 - progress);
        const r = w.radius + waveOsc;
        const x = centerX + Math.cos(theta) * r;
        const y = centerY + Math.sin(theta) * (r * 0.85); // slightly isometric / oval

        if (i === 0) {
          this.ctx.moveTo(x, y);
        } else {
          this.ctx.lineTo(x, y);
        }
      }

      this.ctx.closePath();
      this.ctx.strokeStyle = `${w.color}${alpha})`;
      this.ctx.lineWidth = 1.6;
      this.ctx.stroke();
      this.ctx.restore();
    });

    // 2. Draw Active Shockwaves (from button triggers)
    for (let i = this.shockwaves.length - 1; i >= 0; i--) {
      const sw = this.shockwaves[i];
      sw.radius += sw.speed;
      sw.opacity *= 0.94;
      sw.lineWidth *= 0.98;

      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.arc(this.origin.x, this.origin.y, sw.radius, 0, Math.PI * 2);
      this.ctx.strokeStyle = `rgba(226, 28, 33, ${sw.opacity})`;
      this.ctx.lineWidth = sw.lineWidth;
      this.ctx.stroke();
      this.ctx.restore();

      if (sw.opacity < 0.02 || sw.radius > sw.maxRadius) {
        this.shockwaves.splice(i, 1);
      }
    }

    // 3. Draw Ambient Soundwave Particles
    this.particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      // Friction
      p.vx *= 0.97;
      p.vy *= 0.97;

      // Float drift
      p.y += Math.sin(this.time + p.angle) * 0.3;

      // Wrap around bounds
      if (p.x < 0) p.x = this.width;
      if (p.x > this.width) p.x = 0;
      if (p.y < 0) p.y = this.height;
      if (p.y > this.height) p.y = 0;

      // Mouse repulsion / attraction
      const mdx = this.mouse.x - p.x;
      const mdy = this.mouse.y - p.y;
      const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
      if (mdist < 140) {
        const force = (140 - mdist) / 140;
        p.vx -= (mdx / mdist) * force * 0.8;
        p.vy -= (mdy / mdist) * force * 0.8;
      }

      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color;
      this.ctx.globalAlpha = p.baseAlpha + Math.sin(this.time * 2 + p.angle) * 0.15;
      this.ctx.shadowColor = p.color;
      this.ctx.shadowBlur = 6;
      this.ctx.fill();
      this.ctx.restore();
    });

    this.animationId = requestAnimationFrame(() => this.loop());
  }

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}
