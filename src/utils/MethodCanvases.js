// ================================================================
// DILO DIGITAL — METHOD CANVASES
// 4 Custom Generative Kinetic Particle & Waveform Canvases
// High-End Luxury Tech Aesthetics (Obsidian & Neon Orange #FF5A1F)
// ================================================================

export class MethodCanvasesManager {
  constructor() {
    this.instances = [];
    this.observer = null;
    this.isVisible = false;
  }

  init() {
    this.destroy();

    const canvasEls = document.querySelectorAll('.ms-particle-canvas');
    if (!canvasEls.length) return;

    canvasEls.forEach((canvas) => {
      const stepIdx = parseInt(canvas.getAttribute('data-step-index') || '0', 10);
      let instance = null;

      if (stepIdx === 0) {
        instance = new RadarConstellationCanvas(canvas);
      } else if (stepIdx === 1) {
        instance = new HarmonicLatticeCanvas(canvas);
      } else if (stepIdx === 2) {
        instance = new QuantumTunnelCanvas(canvas);
      } else if (stepIdx === 3) {
        instance = new ExponentialVortexCanvas(canvas);
      }

      if (instance) {
        this.instances.push(instance);
      }
    });

    // IntersectionObserver to only animate when section is in viewport
    const section = document.getElementById('metodo-dilo');
    if (section && 'IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            this.isVisible = entry.isIntersecting;
            this.instances.forEach((inst) => {
              if (this.isVisible) {
                inst.start();
              } else {
                inst.stop();
              }
            });
          });
        },
        { threshold: 0.05 }
      );
      this.observer.observe(section);
    } else {
      this.instances.forEach((inst) => inst.start());
    }
  }

  destroy() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
    this.instances.forEach((inst) => inst.destroy());
    this.instances = [];
  }
}

// ================================================================
// BASE CANVAS CLASS (Handles Retina DPI, Events & Loop Lifecycle)
// ================================================================
class BaseStepCanvas {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.width = 0;
    this.height = 0;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.running = false;
    this.rafId = null;
    this.time = 0;

    this.mouse = { x: -9999, y: -9999, isHover: false };

    this.handleResize = this.handleResize.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);

    this.setupEvents();
    this.handleResize();
  }

  setupEvents() {
    window.addEventListener('resize', this.handleResize, { passive: true });
    this.canvas.addEventListener('mousemove', this.handleMouseMove, { passive: true });
    this.canvas.addEventListener('mouseenter', this.handleMouseEnter, { passive: true });
    this.canvas.addEventListener('mouseleave', this.handleMouseLeave, { passive: true });
  }

  handleResize() {
    if (!this.canvas) return;
    const rect = this.canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    this.width = rect.width;
    this.height = rect.height;
    this.canvas.width = Math.floor(this.width * this.dpr);
    this.canvas.height = Math.floor(this.height * this.dpr);
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);

    this.onResize();
  }

  handleMouseMove(e) {
    const rect = this.canvas.getBoundingClientRect();
    this.mouse.x = e.clientX - rect.left;
    this.mouse.y = e.clientY - rect.top;
    this.mouse.isHover = true;
  }

  handleMouseEnter() {
    this.mouse.isHover = true;
  }

  handleMouseLeave() {
    this.mouse.isHover = false;
    this.mouse.x = -9999;
    this.mouse.y = -9999;
  }

  start() {
    if (this.running) return;
    this.running = true;
    this.handleResize();
    const loop = () => {
      if (!this.running) return;
      this.time += 0.016;
      this.draw();
      this.rafId = requestAnimationFrame(loop);
    };
    this.rafId = requestAnimationFrame(loop);
  }

  stop() {
    this.running = false;
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  destroy() {
    this.stop();
    window.removeEventListener('resize', this.handleResize);
    if (this.canvas) {
      this.canvas.removeEventListener('mousemove', this.handleMouseMove);
      this.canvas.removeEventListener('mouseenter', this.handleMouseEnter);
      this.canvas.removeEventListener('mouseleave', this.handleMouseLeave);
    }
  }

  onResize() {}
  draw() {}
}

// ================================================================
// CANVAS 0: CYBER RADAR & NIZA CONSTELLATION (Diagnóstico & IMPI)
// ================================================================
class RadarConstellationCanvas extends BaseStepCanvas {
  onResize() {
    this.nodes = [];
    const count = 45; // 45 NIZA Classes!
    const cx = this.width / 2;
    const cy = this.height / 2;
    const maxR = Math.min(this.width, this.height) * 0.44;

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.3;
      const radius = Math.sqrt(Math.random()) * maxR * 0.92 + 16;
      this.nodes.push({
        x: cx + Math.cos(angle) * radius,
        y: cy + Math.sin(angle) * radius,
        baseX: cx + Math.cos(angle) * radius,
        baseY: cy + Math.sin(angle) * radius,
        angle: (angle + Math.PI * 2) % (Math.PI * 2),
        radius,
        classNum: i + 1,
        lit: 0,
        size: i % 5 === 0 ? 3.2 : 2.0
      });
    }
    this.sweepAngle = 0;
  }

  draw() {
    const { ctx, width, height, time } = this;
    const cx = width / 2;
    const cy = height / 2;
    const maxR = Math.min(width, height) * 0.44;

    // Background clear with subtle gradient
    ctx.clearRect(0, 0, width, height);

    // Deep tech grid & concentric radar rings
    ctx.strokeStyle = 'rgba(255, 90, 31, 0.1)';
    ctx.lineWidth = 1;
    [0.3, 0.6, 0.95].forEach((pct) => {
      ctx.beginPath();
      ctx.arc(cx, cy, maxR * pct, 0, Math.PI * 2);
      ctx.stroke();
    });

    // Crosshairs
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.beginPath();
    ctx.moveTo(cx - maxR, cy);
    ctx.lineTo(cx + maxR, cy);
    ctx.moveTo(cx, cy - maxR);
    ctx.lineTo(cx, cy + maxR);
    ctx.stroke();

    // Advance Sweep Angle
    const sweepSpeed = this.mouse.isHover ? 0.045 : 0.026;
    this.sweepAngle = (this.sweepAngle + sweepSpeed) % (Math.PI * 2);

    // Radar Sweep Cone
    const coneAngle = 0.55;
    const sweepGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR);
    sweepGrad.addColorStop(0, 'rgba(255, 90, 31, 0.35)');
    sweepGrad.addColorStop(1, 'rgba(255, 90, 31, 0.0)');

    ctx.save();
    ctx.fillStyle = sweepGrad;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, maxR, this.sweepAngle - coneAngle, this.sweepAngle);
    ctx.closePath();
    ctx.fill();

    // Leading sweep line
    ctx.strokeStyle = 'rgba(255, 120, 60, 0.85)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(this.sweepAngle) * maxR, cy + Math.sin(this.sweepAngle) * maxR);
    ctx.stroke();
    ctx.restore();

    // Connectors between verified nodes
    ctx.strokeStyle = 'rgba(255, 90, 31, 0.15)';
    ctx.lineWidth = 0.75;
    for (let i = 0; i < this.nodes.length; i++) {
      for (let j = i + 1; j < this.nodes.length; j++) {
        const dx = this.nodes[i].x - this.nodes[j].x;
        const dy = this.nodes[i].y - this.nodes[j].y;
        const dist = Math.hypot(dx, dy);
        if (dist < 42 && (this.nodes[i].lit > 0.2 || this.nodes[j].lit > 0.2)) {
          const alpha = Math.min(this.nodes[i].lit, this.nodes[j].lit) * 0.4;
          ctx.strokeStyle = `rgba(255, 90, 31, ${alpha})`;
          ctx.beginPath();
          ctx.moveTo(this.nodes[i].x, this.nodes[i].y);
          ctx.lineTo(this.nodes[j].x, this.nodes[j].y);
          ctx.stroke();
        }
      }
    }

    // Draw and update 45 NIZA Nodes
    this.nodes.forEach((node) => {
      // Check if sweep line passed near this node's angle
      let diff = this.sweepAngle - node.angle;
      while (diff < -Math.PI) diff += Math.PI * 2;
      while (diff > Math.PI) diff -= Math.PI * 2;

      if (diff >= 0 && diff < 0.25) {
        node.lit = 1.0;
      } else {
        node.lit = Math.max(0, node.lit - 0.015);
      }

      // Mouse repulsion & interaction
      if (this.mouse.isHover) {
        const mdx = node.x - this.mouse.x;
        const mdy = node.y - this.mouse.y;
        const mdist = Math.hypot(mdx, mdy);
        if (mdist < 70 && mdist > 0.1) {
          const force = (70 - mdist) / 70;
          node.x += (mdx / mdist) * force * 3;
          node.y += (mdy / mdist) * force * 3;
          node.lit = Math.max(node.lit, 0.8);
        }
      }

      // Smooth return to base position
      node.x += (node.baseX - node.x) * 0.06;
      node.y += (node.baseY - node.y) * 0.06;

      // Draw node
      const currentSize = node.size + node.lit * 2.5;
      const alpha = 0.25 + node.lit * 0.75;

      // Outer glow when lit
      if (node.lit > 0.3) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, currentSize * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 90, 31, ${node.lit * 0.3})`;
        ctx.fill();
      }

      ctx.beginPath();
      ctx.arc(node.x, node.y, currentSize, 0, Math.PI * 2);
      ctx.fillStyle = node.lit > 0.5 ? '#FFFFFF' : `rgba(255, 110, 45, ${alpha})`;
      ctx.fill();
    });

    // Central Shield Core
    const pulse = Math.sin(time * 3) * 2;
    ctx.save();
    ctx.shadowColor = '#FF5A1F';
    ctx.shadowBlur = 14;
    ctx.fillStyle = '#FF5A1F';
    ctx.beginPath();
    ctx.arc(cx, cy, 5 + pulse, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Central Shield Badge Icon
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(cx, cy, 14 + pulse * 0.5, 0, Math.PI * 2);
    ctx.stroke();

    // Live Badge Text in Corner
    ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
    ctx.font = '600 10px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('ESCANEANDO 45 CLASES NIZA', 16, 24);

    ctx.fillStyle = '#10B981';
    ctx.beginPath();
    ctx.arc(width - 24, 21, 4, 0, Math.PI * 2);
    ctx.fill();
  }
}

// ================================================================
// CANVAS 1: HARMONIC WAVE LATTICE & BÉZIER NODES (Diseño & Figma)
// ================================================================
class HarmonicLatticeCanvas extends BaseStepCanvas {
  onResize() {
    this.points = [];
    const count = 30;
    for (let i = 0; i < count; i++) {
      this.points.push({
        x: (i / (count - 1)) * this.width,
        phase: i * 0.22,
        speed: 1.2 + (i % 3) * 0.4
      });
    }
  }

  draw() {
    const { ctx, width, height, time } = this;
    ctx.clearRect(0, 0, width, height);

    const midY = height * 0.52;
    const waves = [
      { amp: 28, freq: 0.012, speed: 1.8, color: 'rgba(255, 90, 31, 0.75)', width: 2.2 },
      { amp: 20, freq: 0.016, speed: -1.4, color: 'rgba(255, 140, 70, 0.5)', width: 1.6 },
      { amp: 14, freq: 0.022, speed: 2.2, color: 'rgba(255, 255, 255, 0.25)', width: 1.0 },
      { amp: 34, freq: 0.008, speed: -0.9, color: 'rgba(255, 90, 31, 0.2)', width: 1.0 }
    ];

    // Mouse influence factor
    const mouseInfluence = this.mouse.isHover ? 1.8 : 1.0;

    waves.forEach((w) => {
      ctx.beginPath();
      ctx.strokeStyle = w.color;
      ctx.lineWidth = w.width;

      for (let x = 0; x <= width; x += 6) {
        // Compound sine/cosine harmonics
        let y = midY + 
          Math.sin(x * w.freq + time * w.speed) * w.amp * mouseInfluence +
          Math.cos(x * w.freq * 0.5 - time * w.speed * 0.7) * (w.amp * 0.4);

        // Mouse displacement
        if (this.mouse.isHover) {
          const dx = x - this.mouse.x;
          const dist = Math.abs(dx);
          if (dist < 120) {
            const pull = (120 - dist) / 120;
            y += (this.mouse.y - y) * pull * 0.45;
          }
        }

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
    });

    // Vector Bézier Anchor Points (Figma Style)
    const anchorCount = 6;
    for (let i = 0; i < anchorCount; i++) {
      const ax = (i / (anchorCount - 1)) * (width - 60) + 30;
      const ay = midY + Math.sin(ax * 0.012 + time * 1.8) * 28 * mouseInfluence;

      // Draw anchor handle line
      const hLength = 22;
      const angle = Math.cos(ax * 0.012 + time * 1.8) * 0.6;
      const hx1 = ax - Math.cos(angle) * hLength;
      const hy1 = ay - Math.sin(angle) * hLength;
      const hx2 = ax + Math.cos(angle) * hLength;
      const hy2 = ay + Math.sin(angle) * hLength;

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(hx1, hy1);
      ctx.lineTo(hx2, hy2);
      ctx.stroke();

      // Handle endpoints
      ctx.fillStyle = '#FF5A1F';
      ctx.beginPath();
      ctx.arc(hx1, hy1, 2.5, 0, Math.PI * 2);
      ctx.arc(hx2, hy2, 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Main Anchor square (Figma style)
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(ax - 3.5, ay - 3.5, 7, 7);
      ctx.strokeStyle = '#FF5A1F';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(ax - 3.5, ay - 3.5, 7, 7);
    }

    // Top overlay label
    ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
    ctx.font = '600 10px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('LIENZO VECTORIAL FIGMA 4K', 16, 24);

    ctx.fillStyle = 'rgba(255, 90, 31, 0.9)';
    ctx.fillText('BEZIER SPLINE • 60 FPS', width - 140, 24);
  }
}

// ================================================================
// CANVAS 2: QUANTUM PARTICLE TUNNEL (Desarrollo Headless 0.8s)
// ================================================================
class QuantumTunnelCanvas extends BaseStepCanvas {
  onResize() {
    this.particles = [];
    const count = 130;
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: (Math.random() - 0.5) * this.width * 1.8,
        y: (Math.random() - 0.5) * this.height * 1.8,
        z: Math.random() * 1000 + 10,
        prevZ: 1000,
        color: Math.random() > 0.25 ? '#FF5A1F' : '#FFFFFF'
      });
    }
  }

  draw() {
    const { ctx, width, height } = this;
    ctx.clearRect(0, 0, width, height);

    // Central vanishing point with slight camera parallax
    const targetCx = width / 2 + (this.mouse.isHover ? (this.mouse.x - width / 2) * 0.25 : 0);
    const targetCy = height / 2 + (this.mouse.isHover ? (this.mouse.y - height / 2) * 0.25 : 0);
    const fov = 260;
    const speed = this.mouse.isHover ? 26 : 14;

    // Expanding tunnel rings
    const ringCount = 4;
    for (let r = 0; r < ringCount; r++) {
      const ringZ = ((this.time * 280 + r * 250) % 1000) + 20;
      const scale = fov / ringZ;
      const rw = width * 0.65 * scale;
      const rh = height * 0.65 * scale;
      const rx = targetCx - rw / 2;
      const ry = targetCy - rh / 2;
      const ringAlpha = Math.min(1, Math.max(0, (1000 - ringZ) / 800)) * 0.18;

      ctx.strokeStyle = `rgba(255, 90, 31, ${ringAlpha})`;
      ctx.lineWidth = 1;
      ctx.strokeRect(rx, ry, rw, rh);
    }

    // Draw high-speed particles
    this.particles.forEach((p) => {
      p.prevZ = p.z;
      p.z -= speed;

      if (p.z <= 10) {
        p.z = 1000;
        p.prevZ = 1000;
        p.x = (Math.random() - 0.5) * width * 1.8;
        p.y = (Math.random() - 0.5) * height * 1.8;
      }

      const prevScale = fov / p.prevZ;
      const scale = fov / p.z;

      const px = targetCx + p.x * prevScale;
      const py = targetCy + p.y * prevScale;
      const x = targetCx + p.x * scale;
      const y = targetCy + p.y * scale;

      const alpha = Math.min(1, Math.max(0.1, (1000 - p.z) / 600));

      ctx.strokeStyle = p.color === '#FF5A1F' ? `rgba(255, 90, 31, ${alpha})` : `rgba(255, 255, 255, ${alpha * 0.8})`;
      ctx.lineWidth = Math.min(2.8, scale * 1.6);
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(x, y);
      ctx.stroke();
    });

    // Tech HUD info
    ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
    ctx.font = '600 10px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('HEADLESS SPEED · 0.68s SUB-SEGUNDO', 16, 24);

    ctx.fillStyle = '#10B981';
    ctx.fillText('99.4% CACHE HIT · HTTP/3', width - 146, 24);
  }
}

// ================================================================
// CANVAS 3: EXPONENTIAL ROAS VORTEX & PARTICLE NEBULA (Escala)
// ================================================================
class ExponentialVortexCanvas extends BaseStepCanvas {
  onResize() {
    this.particles = [];
    const count = 90;
    const cx = this.width * 0.5;
    const cy = this.height * 0.55;

    for (let i = 0; i < count; i++) {
      this.particles.push({
        angle: Math.random() * Math.PI * 2,
        radius: Math.random() * 85 + 15,
        speed: (Math.random() * 0.02 + 0.015) * (Math.random() > 0.5 ? 1 : 1),
        yOffset: (Math.random() - 0.5) * 40,
        size: Math.random() * 2.8 + 1.2,
        color: Math.random() > 0.3 ? '#FF5A1F' : '#FFA26B',
        alpha: Math.random() * 0.6 + 0.3
      });
    }
  }

  draw() {
    const { ctx, width, height, time } = this;
    ctx.clearRect(0, 0, width, height);

    const cx = this.mouse.isHover ? this.mouse.x : width * 0.5;
    const cy = this.mouse.isHover ? this.mouse.y : height * 0.52;

    // Background exponential growth curve
    ctx.strokeStyle = 'rgba(255, 90, 31, 0.25)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let x = 20; x < width - 20; x += 8) {
      const progress = (x - 20) / (width - 40);
      const y = height * 0.85 - Math.pow(progress, 2.4) * (height * 0.65) + Math.sin(x * 0.04 + time * 2) * 4;
      if (x === 20) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();

    // Ascending kinetic particle vortex
    this.particles.forEach((p) => {
      p.angle += p.speed * (this.mouse.isHover ? 1.6 : 1.0);
      p.yOffset -= 0.6; // Upward buoyant drift

      if (p.yOffset < -55) {
        p.yOffset = 45;
        p.radius = Math.random() * 85 + 15;
      }

      // 3D perspective ellipse projection
      const px = cx + Math.cos(p.angle) * p.radius;
      const py = cy + Math.sin(p.angle) * (p.radius * 0.35) + p.yOffset;

      const depthAlpha = (Math.sin(p.angle) + 1.2) / 2.2;
      const finalAlpha = p.alpha * depthAlpha;

      ctx.beginPath();
      ctx.arc(px, py, p.size * (depthAlpha * 0.8 + 0.4), 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = Math.min(1, Math.max(0.1, finalAlpha));
      ctx.fill();
      ctx.globalAlpha = 1;
    });

    // Glowing Apex Pulsar
    const apexX = width - 40;
    const apexY = height * 0.22;
    const apexPulse = Math.sin(time * 4) * 3;

    ctx.save();
    ctx.shadowColor = '#FF5A1F';
    ctx.shadowBlur = 18;
    ctx.fillStyle = '#FF5A1F';
    ctx.beginPath();
    ctx.arc(apexX, apexY, 5 + apexPulse * 0.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Top Header info
    ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
    ctx.font = '600 10px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('ACELERADOR DE ROAS Y ESCALA', 16, 24);

    ctx.fillStyle = '#FF5A1F';
    ctx.fillText('ROAS 4.8x · +340% CONVERSIÓN', width - 165, 24);
  }
}
