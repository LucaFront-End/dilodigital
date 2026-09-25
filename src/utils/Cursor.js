// Awwwards Interactive Magnetic Cursor
import { sounds } from './SoundEngine.js';

export class CustomCursor {
  constructor() {
    // Only init on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    this.mouse = { x: -100, y: -100 };
    this.pos = { x: -100, y: -100 };
    this.speed = 0.18; // smooth interpolation speed
    this.label = '';
    this.isHovered = false;

    this.initDOM();
    this.bindEvents();
    this.render();
  }

  initDOM() {
    this.cursor = document.createElement('div');
    this.cursor.className = 'aww-cursor';

    this.dot = document.createElement('div');
    this.dot.className = 'aww-cursor-dot';

    this.ring = document.createElement('div');
    this.ring.className = 'aww-cursor-ring';

    this.badge = document.createElement('div');
    this.badge.className = 'aww-cursor-badge';
    this.badge.textContent = '';

    this.cursor.appendChild(this.dot);
    this.cursor.appendChild(this.ring);
    this.cursor.appendChild(this.badge);
    document.body.appendChild(this.cursor);
  }

  bindEvents() {
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      this.cursor.classList.add('is-active');
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
      this.cursor.classList.remove('is-active');
    });

    // Delegate hover states
    document.addEventListener('mouseover', (e) => {
      const target = e.target.closest('[data-cursor], a, button, .interactive-card, input, select');
      if (target) {
        const cursorType = target.getAttribute('data-cursor') || 'hover';
        this.setCursorState(cursorType);
        sounds.playHover();
      }
    });

    document.addEventListener('mouseout', (e) => {
      const target = e.target.closest('[data-cursor], a, button, .interactive-card, input, select');
      if (target) {
        this.resetCursorState();
      }
    });

    document.addEventListener('mousedown', () => {
      this.cursor.classList.add('is-down');
      sounds.playClick();
    });

    document.addEventListener('mouseup', () => {
      this.cursor.classList.remove('is-down');
    });
  }

  setCursorState(type) {
    this.isHovered = true;
    this.cursor.className = 'aww-cursor is-active';
    this.cursor.classList.add(`state-${type}`);

    if (type === 'view') {
      this.badge.textContent = 'VER';
    } else if (type === 'explore') {
      this.badge.textContent = 'EXPLORAR';
    } else if (type === 'drag') {
      this.badge.textContent = 'DESLIZAR';
    } else if (type === 'cotizar') {
      this.badge.textContent = 'COTIZAR';
    } else {
      this.badge.textContent = '';
    }
  }

  resetCursorState() {
    this.isHovered = false;
    this.cursor.className = 'aww-cursor is-active';
    this.badge.textContent = '';
  }

  render() {
    this.pos.x += (this.mouse.x - this.pos.x) * this.speed;
    this.pos.y += (this.mouse.y - this.pos.y) * this.speed;

    this.cursor.style.transform = `translate3d(${this.pos.x}px, ${this.pos.y}px, 0)`;

    requestAnimationFrame(() => this.render());
  }
}
