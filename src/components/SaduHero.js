// ================================================================
// DILO DIGITAL — SPLINE 3D HERO (SADU-STYLE INTRO + SPLINE HERO)
// Intro: "Somos Dilo Digital" text 3D flip + image shutter + cinematic expand
// Hero: Minimalist split layout with Spline 3D robot + sticky scroll lines
// ================================================================

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Application } from '@splinetool/runtime';

gsap.registerPlugin(ScrollTrigger);

/* ── Asset URLs for Loader Shutter Images ── */
const IMGS = {
  i1: 'https://www.sadumedia.com/wp-content/uploads/2025/06/0e3479a7dafb42bac87188f122f446f91a671346-480x267.jpeg',
  i2: 'https://www.sadumedia.com/wp-content/uploads/2025/06/5a59c5d0639ac1e8adea57d31e6fd1bcc7f38196-480x263.jpeg',
  i3: 'https://www.sadumedia.com/wp-content/uploads/2025/06/9631dea991b6d2e67b55a5cf3be4ea4c46221947-480x326.jpeg',
  i4: 'https://www.sadumedia.com/wp-content/uploads/2025/06/b3355dc09596a8ed6757a31aa43aca437c18f867-480x265.jpeg',
  i5: 'https://www.sadumedia.com/wp-content/uploads/2025/06/dbd5a15e67b130c4a80f31bd76cc904f70a3fadf-480x326.jpeg',
  i6: 'https://www.sadumedia.com/wp-content/uploads/2025/06/e2ccb866e2301283e57ed1410de55e07ed81f536-480x270.jpeg',
};

const LOADER_IMGS = [
  'https://www.sadumedia.com/wp-content/uploads/2025/06/mcdonalds-mccrispy-chicken-scaled-1-480x270.jpg',
  'https://www.sadumedia.com/wp-content/uploads/2025/06/mcdonalds-mini-kufta-dc-480x270.jpg',
  'https://www.sadumedia.com/wp-content/uploads/2025/06/sbd-fraud-campaign-480x270.jpg',
  'https://www.sadumedia.com/wp-content/uploads/2025/06/Formula-E-05-scaled-2-480x272.jpeg',
  'https://www.sadumedia.com/wp-content/uploads/2025/06/formula-e-jedda-e-prix-480x270.jpg',
];

const SPLINE_SCENE_URL = 'https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode';

const VIDEO_FULL = 'https://player.vimeo.com/progressive_redirect/playback/1005912608/rendition/1080p/file.mp4?loc=external&oauth2_token_id=1792346465&signature=02390617c05215e31e50654a97063c01bd4191c8bfd1aad4c29a726eea75ace8';

function createThumb(src) {
  return `
    <div class="sm-thumb">
      <img src="${src}" alt="Agency Showcase" loading="lazy">
    </div>
  `;
}

export function renderSaduHero() {
  return `
  <!-- ================================================================
       1. SADU MEDIA INTRO LOADER
       ================================================================ -->
  <div class="sm-loader-bg" id="sm-loader-bg"></div>

  <div class="sm-loader-host" id="sm-loader-host">
    <div class="sm-loader-content" id="sm-loader-content">
      <!-- Top Row: SOMOS + slot + DILO -->
      <div class="sm-loader-row-top">
        <span class="sm-loader-title" id="sm-loader-title-0">Somos</span>
        <div class="sm-loader-placeholder-desktop" id="sm-loader-slot-desktop"></div>
        <span class="sm-loader-title" id="sm-loader-title-1">Dilo</span>
      </div>
      <!-- Mobile placeholder -->
      <div class="sm-loader-placeholder-mobile" id="sm-loader-slot-mobile"></div>
      <!-- Bottom Row: DIGITAL -->
      <span class="sm-loader-title sm-loader-title-bottom" id="sm-loader-title-2">Digital</span>
    </div>

    <!-- Media container: Shutter preview images that flip over the slot -->
    <div class="sm-loader-medias" id="sm-loader-medias">
      ${LOADER_IMGS.map((src, i) => `
        <div class="sm-loader-media" data-slide-index="${i}">
          <img src="${src}" alt="Showcase Preview">
        </div>
      `).join('')}
    </div>
  </div>

  <!-- ================================================================
       2. MAIN HERO SECTION (Live Miniature -> Fullscreen Spline 3D Hero)
       ================================================================ -->
  <section class="sm-home-cover" id="sm-home-cover">

    <div class="sm-hero-loader-frame is-intro-active" id="sm-hero-loader-frame">
      <!-- ① SPLINE 3D HERO BANNER -->
      <div class="sm-hero-spline-wrap" id="sm-hero-spline-wrap">
        <!-- Spotlight mouse-follow glow -->
        <div class="sm-hero-spotlight" id="sm-hero-spotlight"></div>

      <!-- Spline 3D Canvas (covers right portion, extends full height) -->
      <div class="sm-hero-spline-container" id="sm-hero-spline-container">
        <canvas id="spline-canvas" class="sm-spline-canvas"></canvas>
        <!-- Fallback loader while Spline loads -->
        <div class="sm-spline-loader" id="sm-spline-loader">
          <div class="sm-spline-spinner"></div>
        </div>
      </div>

      <!-- Bottom gradient fade to hide robot legs -->
      <div class="sm-hero-bottom-fade"></div>

      <div class="sm-hero-split">
        <!-- Left: Editorial Copy -->
        <div class="sm-hero-left" id="sm-hero-left">
          <div class="sm-hero-eyebrow" id="sm-hero-eyebrow">
            <span class="sm-hero-pulse-dot"></span>
            <span>AGENCIA CREATIVA · CDMX & GLOBAL</span>
          </div>

          <h1 class="sm-hero-headline" id="sm-hero-headline">
            <span class="sm-hero-line">CONSTRUIMOS</span>
            <span class="sm-hero-line">MARCAS QUE</span>
            <span class="sm-hero-line sm-hero-headline-accent sm-rotator-line">
              <span class="sm-rotator-viewport" id="sm-rotator-viewport" title="Clic para cambiar">
                <span class="sm-rotator-active" id="sm-rotator-active">DOMINAN</span>
              </span>
              <span class="sm-rotator-underline" id="sm-rotator-underline"></span>
            </span>
          </h1>

          <p class="sm-hero-desc" id="sm-hero-desc">
            Branding, ingeniería web headless, performance ads y blindaje legal IMPI. 
            Resultados medibles en sprints de 15 días.
          </p>

          <div class="sm-hero-actions" id="sm-hero-actions">
            <button class="sm-hero-btn-primary" onclick="window.dispatchEvent(new CustomEvent('open-cotizador-modal'))">
              <span>Cotizar Proyecto</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
            <a href="https://wa.me/525592441070" target="_blank" rel="noopener" class="sm-hero-btn-secondary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.697c.969.529 1.777.784 2.806.784 3.18 0 5.767-2.586 5.768-5.766.001-3.18-2.586-5.766-5.768-5.766zm9.969 5.766c0 5.505-4.479 9.984-9.969 9.984-1.748 0-3.385-.452-4.815-1.246l-5.216 1.369 1.393-5.086c-.885-1.488-1.393-3.228-1.393-5.021 0-5.505 4.479-9.984 9.969-9.984 5.505 0 10.026 4.479 10.026 9.984z"/>
              </svg>
              <span>WhatsApp Directo</span>
            </a>
          </div>

          <!-- Micro Trust Chips -->
          <div class="sm-hero-trust-row" id="sm-hero-trust-row">
            <span class="sm-hero-trust-chip">⚡ Sprint de 15 días</span>
            <span class="sm-hero-trust-chip">🛡️ Blindaje IMPI</span>
            <span class="sm-hero-trust-chip">✦ 0% Templates</span>
          </div>
        </div>

        <!-- Right: spacer (actual canvas is absolutely positioned behind) -->
        <div class="sm-hero-right-spacer" aria-hidden="true"></div>
      </div>
    </div>

    <!-- ② TYPOGRAPHY STACKING LINES (Dilo Digital Master Showcase) -->
    <div class="sm-lines-wrapper" id="sm-lines-wrapper">
      <div class="sm-lines-stage" id="sm-lines-stage">

        <!-- Line 0: Hook statement -->
        <div class="sm-line-item sm-line-0" data-line-index="0">
          <div class="sm-line-sticky-inner">
            <div class="sm-line-title">Creamos tu marca. Construimos su identidad.</div>
          </div>
        </div>

        <!-- Line 1: Branding & Diseño with 6 thumbnails -->
        <div class="sm-line-item sm-line-1" data-line-index="1">
          <div class="sm-line-sticky-inner">
            <div class="sm-line-thumbs thumbs-left">
              ${createThumb(IMGS.i1)}
              ${createThumb(IMGS.i2)}
              ${createThumb(IMGS.i3)}
            </div>
            <div class="sm-line-title">Branding & Diseño</div>
            <div class="sm-line-thumbs thumbs-right">
              ${createThumb(IMGS.i4)}
              ${createThumb(IMGS.i5)}
              ${createThumb(IMGS.i6)}
            </div>
          </div>
        </div>

        <!-- Line 2: Marketing Digital with 6 thumbnails -->
        <div class="sm-line-item sm-line-2" data-line-index="2">
          <div class="sm-line-sticky-inner">
            <div class="sm-line-thumbs thumbs-left">
              ${createThumb(IMGS.i6)}
              ${createThumb(IMGS.i5)}
              ${createThumb(IMGS.i4)}
            </div>
            <div class="sm-line-title">Marketing Digital</div>
            <div class="sm-line-thumbs thumbs-right">
              ${createThumb(IMGS.i3)}
              ${createThumb(IMGS.i2)}
              ${createThumb(IMGS.i1)}
            </div>
          </div>
        </div>

        <!-- Line 3: Final punchline -->
        <div class="sm-line-item sm-line-3" data-line-index="3">
          <div class="sm-line-sticky-inner">
            <div class="sm-line-title">Resultados Reales.</div>
          </div>
        </div>

        <!-- ③ EDITORIAL SUBTITLE & 3D BUTTON (Integrated compactly below Line 3) -->
        <div class="sm-stage-footer" id="sm-stage-footer">
          <p class="sm-subtitle-text">
            Branding, marketing digital, desarrollo web, producción audiovisual y registro de marca.<br>
            Estrategias integrales y resultados medibles para marcas con ambición.
          </p>
          <div class="sm-button-wrap">
            <a href="#/cotizar" class="sm-btn-3d" id="sm-cta-btn"
               onclick="event.preventDefault(); window.dispatchEvent(new CustomEvent('open-cotizador-modal'))">
              <div class="sm-btn-flipper">
                <div class="sm-btn-face f-top">Cotizar Proyecto.</div>
                <div class="sm-btn-face f-main">Cotizar Proyecto.</div>
                <div class="sm-btn-face f-bot">Cotizar Proyecto.</div>
              </div>
            </a>
          </div>
        </div>

      </div>
    </div>
  </div>

    <!-- ⑤ 1080P REEL POPUP MODAL -->
    <div class="sm-popup" id="sm-video-popup">
      <div class="sm-popup-video-box">
        <video id="sm-popup-video-player" src="${VIDEO_FULL}" controls playsinline></video>
      </div>
      <button class="sm-btn-3d sm-popup-close-btn" id="sm-popup-close" aria-label="Cerrar Video">
        <div class="sm-btn-flipper">
          <div class="sm-btn-face f-top">Cerrar.</div>
          <div class="sm-btn-face f-main">Cerrar.</div>
          <div class="sm-btn-face f-bot">Cerrar.</div>
        </div>
      </button>
    </div>

  </section>
  `;
}

// Split text into individual 3D rotatable spans
function splitChars(el, className = 'sm-loader-char') {
  const text = el.textContent.trim();
  el.innerHTML = text.split('').map(char => {
    if (char === ' ') {
      return `<span class="${className}" style="display:inline-block; width:0.32em;">&nbsp;</span>`;
    }
    return `<span class="${className}">${char}</span>`;
  }).join('');
  return Array.from(el.querySelectorAll(`.${className}`));
}

export function initSaduHeroEvents() {
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => startExperience());
  } else {
    setTimeout(startExperience, 100);
  }

  function startExperience() {
    const isMobile = window.innerWidth < 1200;

    // ═══════════════════════════════════════════════════
    // START SPLINE LOADING IMMEDIATELY (non-blocking)
    // ═══════════════════════════════════════════════════
    let splineApp = null;
    initSplineScene();

    // Initialize Hero sticky stages and ScrollTrigger pins
    initHeroCoverAppear();

    /* ═══════════════════════════════════════════════════
       A. LOADER ANIMATION (Live Miniature Hero -> Fullscreen)
       ═══════════════════════════════════════════════════ */
    const loaderHost = document.getElementById('sm-loader-host');
    const loaderBg = document.getElementById('sm-loader-bg');
    const loaderContent = document.getElementById('sm-loader-content');
    const mediasWrapper = document.getElementById('sm-loader-medias');
    const title0 = document.getElementById('sm-loader-title-0');
    const title1 = document.getElementById('sm-loader-title-1');
    const title2 = document.getElementById('sm-loader-title-2');
    const slotDesktop = document.getElementById('sm-loader-slot-desktop');
    const slotMobile = document.getElementById('sm-loader-slot-mobile');
    const heroFrame = document.getElementById('sm-hero-loader-frame');
    const heroWrap = document.getElementById('sm-hero-spline-wrap');

    // Strict Scroll-Lock during intro animation
    const preventScroll = (e) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };
    const preventKeys = (e) => {
      if (['Space', 'ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End'].includes(e.code)) {
        e.preventDefault();
      }
    };

    const lockScroll = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      window.addEventListener('wheel', preventScroll, { passive: false });
      window.addEventListener('touchmove', preventScroll, { passive: false });
      window.addEventListener('keydown', preventKeys, { passive: false });
    };

    const unlockScroll = () => {
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
      window.removeEventListener('keydown', preventKeys);
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    };

    if (loaderHost && mediasWrapper && title0 && title1 && title2 && heroFrame && heroWrap) {
      lockScroll();
      const slot = isMobile ? slotMobile : slotDesktop;
      const mediaSlides = Array.from(mediasWrapper.querySelectorAll('.sm-loader-media'));

      // Split characters for 3D tumbling effect
      const chars0 = splitChars(title0, 'sm-loader-char');
      const chars1 = splitChars(title1, 'sm-loader-char');
      const chars2 = splitChars(title2, 'sm-loader-char');
      const allChars = [...chars0, ...chars1, ...chars2];

      // Measure bounding boxes
      const wrapWidth = window.innerWidth;
      const wrapHeight = window.innerHeight;
      const slotBounds = slot.getBoundingClientRect();

      const slotCenterX = slotBounds.left + slotBounds.width / 2;
      const slotCenterY = slotBounds.top + slotBounds.height / 2;
      const wrapCenterX = wrapWidth / 2;
      const wrapCenterY = wrapHeight / 2;

      const initialOffsetX = slotCenterX - wrapCenterX;
      const initialOffsetY = slotCenterY - wrapCenterY;

      // Scale so the live hero fits and covers the slot without letterboxing
      const initialScale = Math.max(
        slotBounds.width / wrapWidth,
        slotBounds.height / wrapHeight
      );

      const clipTop = Math.max(0, slotBounds.top);
      const clipLeft = Math.max(0, slotBounds.left);
      const clipBottom = Math.max(0, wrapHeight - slotBounds.bottom);
      const clipRight = Math.max(0, wrapWidth - slotBounds.right);

      // STARTING STATE:
      // 1. Hero frame is clipped to the slot with 12px rounded corners
      gsap.set(heroFrame, {
        clipPath: `inset(${clipTop}px ${clipRight}px ${clipBottom}px ${clipLeft}px round 12px)`,
        autoAlpha: 1
      });

      // 2. Live hero is scaled down into the slot in miniature resolution
      gsap.set(heroWrap, {
        x: initialOffsetX,
        y: initialOffsetY,
        scale: initialScale,
        transformOrigin: 'center center'
      });

      // 3. Shutter images wrapper is also clipped to the slot
      gsap.set(mediasWrapper, {
        autoAlpha: 0,
        clipPath: `inset(${clipTop}px ${clipRight}px ${clipBottom}px ${clipLeft}px round 12px)`
      });

      mediaSlides.forEach(slide => {
        gsap.set(slide, { autoAlpha: 0 });
      });

      gsap.set(allChars, { autoAlpha: 0, rotateX: 90 });

      if (!isMobile) {
        const t0Bounds = title0.getBoundingClientRect();
        const t1Bounds = title1.getBoundingClientRect();
        const screenMid = window.innerWidth / 2;
        const initialGap = 24;
        const shift0 = (screenMid - initialGap / 2) - t0Bounds.right;
        const shift1 = (screenMid + initialGap / 2) - t1Bounds.left;
        gsap.set(title0, { x: shift0 });
        gsap.set(title1, { x: shift1 });
      }

      // Build Master Loader Timeline
      const tl = gsap.timeline({ delay: 0.15 });

      // 1. Flip in characters
      tl.to(allChars, { autoAlpha: 1, duration: 0.35, ease: 'power2.out', stagger: 0.02 }, 0);
      tl.to(allChars, { rotateX: 0, duration: 0.8, ease: 'expo.out', stagger: 0.02 }, 0);

      // 2. Slide titles apart
      if (!isMobile) {
        tl.to([title0, title1], { x: 0, duration: 1.25, ease: 'expo.inOut' }, 0.5);
      }

      // 3. Reveal slot with showcase images
      tl.to(mediasWrapper, { autoAlpha: 1, duration: 0.25, ease: 'power2.out' }, 0.5);

      // 4. Shutter flip showcase images
      const shutterStart = 0.65;
      const shutterDuration = 1.0;
      const step = shutterDuration / mediaSlides.length;
      mediaSlides.forEach((slide, idx) => {
        const time = shutterStart + idx * step;
        tl.set(mediaSlides, { autoAlpha: 0 }, time);
        tl.set(slide, { autoAlpha: 1 }, time);
      });

      // 5. Fade out shutter images to reveal the LIVE MINIATURE HERO in the slot!
      const heroRevealTime = shutterStart + shutterDuration;
      tl.to(mediasWrapper, { autoAlpha: 0, duration: 0.25, ease: 'power2.out' }, heroRevealTime);

      // 6. Hold on the live miniature hero in the slot (showing live 3D Spline model & headline in miniature)
      tl.to({}, { duration: 0.45 });

      // 7. CINEMATIC FULLSCREEN EXPANSION (The live hero itself expands to full screen, no refresh!)
      tl.to(heroFrame, {
        clipPath: 'inset(0px 0px 0px 0px round 0px)',
        duration: 1.45,
        ease: 'expo.inOut',
        onStart: () => {
          const header = document.getElementById('site-header');
          if (header) header.classList.remove('is-intro-hidden');
        }
      }, '+=0.05');

      tl.to(heroWrap, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 1.45,
        ease: 'expo.inOut'
      }, '<');

      // Fade title text and dark background
      tl.to([loaderContent, loaderBg], {
        opacity: 0,
        duration: 0.65,
        ease: 'power2.out'
      }, '<+=0.3');

      // 8. Seamless completion: clean up fixed positioning, no refresh!
      tl.to({}, {
        duration: 0.05,
        onComplete: () => {
          gsap.set(heroFrame, { clearProps: 'all' });
          gsap.set(heroWrap, { clearProps: 'all' });
          heroFrame.classList.remove('is-intro-active');

          const header = document.getElementById('site-header');
          if (header) header.classList.remove('is-intro-hidden');
          unlockScroll();

          loaderHost?.remove();
          loaderBg?.remove();

          if (typeof window.__smRevealLine0 === 'function') {
            window.__smRevealLine0();
          }
          initHeadlineRotator();
          ScrollTrigger.sort();
          ScrollTrigger.refresh();
        }
      });

    } else {
      if (heroFrame) heroFrame.classList.remove('is-intro-active');
      const header = document.getElementById('site-header');
      if (header) header.classList.remove('is-intro-hidden');
      if (typeof window.__smRevealLine0 === 'function') {
        window.__smRevealLine0();
      }
      initHeadlineRotator();
    }

    /* ═══════════════════════════════════════════════════
     HEADLINE 3D KINETIC ROTATOR
     ═══════════════════════════════════════════════════ */
    function initHeadlineRotator() {
      const viewport = document.getElementById('sm-rotator-viewport');
      const activeEl = document.getElementById('sm-rotator-active');
      const underline = document.getElementById('sm-rotator-underline');

      if (!viewport || !activeEl) return;

      const WORDS = ['DOMINAN', 'CONVIERTEN', 'ESCALAN', 'FACTURAN', 'LIDERAN', 'TRASCIENDEN'];
      let currentWordIndex = 0;
      let isWordAnimating = false;

      function createWordElement(word) {
        const wrap = document.createElement('span');
        wrap.className = 'sm-rot-word';
        word.split('').forEach(char => {
          const span = document.createElement('span');
          span.className = 'sm-rot-char';
          span.textContent = char;
          wrap.appendChild(span);
        });
        return wrap;
      }

      // Initial word setup with char spans
      activeEl.innerHTML = '';
      const initialWordEl = createWordElement(WORDS[0]);
      activeEl.appendChild(initialWordEl);

      // Measure & lock initial width
      const initialWidth = initialWordEl.offsetWidth;
      if (initialWidth > 0) {
        viewport.style.width = `${initialWidth}px`;
        if (underline) underline.style.width = `${initialWidth}px`;
      }

      // Allow user to click to rotate immediately
      viewport.addEventListener('click', () => {
        if (!isWordAnimating) rotateToNextWord();
      });

      // Auto rotation interval
      const timer = setInterval(() => {
        if (document.hidden || isWordAnimating) return;
        rotateToNextWord();
      }, 3000);

      function rotateToNextWord() {
        if (isWordAnimating) return;
        isWordAnimating = true;

        const nextIndex = (currentWordIndex + 1) % WORDS.length;
        const nextWord = WORDS[nextIndex];

        const currentWordEl = activeEl.querySelector('.sm-rot-word');
        const currentChars = currentWordEl ? Array.from(currentWordEl.querySelectorAll('.sm-rot-char')) : [];

        // Build new word
        const nextWordEl = createWordElement(nextWord);
        nextWordEl.style.position = 'absolute';
        nextWordEl.style.top = '0';
        nextWordEl.style.left = '0';
        nextWordEl.style.visibility = 'hidden';
        activeEl.appendChild(nextWordEl);

        const nextWidth = nextWordEl.offsetWidth;
        nextWordEl.style.visibility = '';

        const nextChars = Array.from(nextWordEl.querySelectorAll('.sm-rot-char'));

        // Prep incoming characters (rotated down, shifted down, faded)
        gsap.set(nextChars, {
          rotateX: -90,
          y: '100%',
          opacity: 0,
          transformOrigin: '50% 100%'
        });

        const tl = gsap.timeline({
          onComplete: () => {
            if (currentWordEl) currentWordEl.remove();
            nextWordEl.style.position = '';
            currentWordIndex = nextIndex;
            isWordAnimating = false;
          }
        });

        // 1. Current letters roll up and out in 3D
        if (currentChars.length > 0) {
          tl.to(currentChars, {
            rotateX: 90,
            y: '-100%',
            opacity: 0,
            duration: 0.38,
            ease: 'power2.in',
            stagger: 0.016,
            transformOrigin: '50% 0%'
          }, 0);
        }

        // 2. Smoothly animate container and underline width
        tl.to(viewport, {
          width: nextWidth,
          duration: 0.45,
          ease: 'expo.out'
        }, 0.12);

        if (underline) {
          tl.to(underline, {
            width: nextWidth,
            duration: 0.45,
            ease: 'expo.out'
          }, 0.12);

          tl.fromTo(underline,
            { filter: 'drop-shadow(0 0 4px #FF5A1F)' },
            { filter: 'drop-shadow(0 0 16px #FF5A1F)', duration: 0.25, yoyo: true, repeat: 1 },
            0.18
          );
        }

        // 3. Next letters roll in from below with mechanical bounce snap
        tl.to(nextChars, {
          rotateX: 0,
          y: '0%',
          opacity: 1,
          duration: 0.52,
          ease: 'back.out(1.6)',
          stagger: 0.02
        }, 0.16);
      }
    }

    /* ═══════════════════════════════════════════════════
     SPLINE 3D SCENE INITIALIZATION + MOUSE FORWARDING
     ═══════════════════════════════════════════════════ */
    function initSplineScene() {
      const canvas = document.getElementById('spline-canvas');
      const loader = document.getElementById('sm-spline-loader');
      const heroWrap = document.getElementById('sm-hero-spline-wrap');

      if (!canvas) return;

      // Load Spline scene
      splineApp = new Application(canvas);
      splineApp.load(SPLINE_SCENE_URL)
        .then(() => {
          // Fade out spinner
          if (loader) {
            gsap.to(loader, {
              autoAlpha: 0,
              duration: 0.5,
              ease: 'power2.out',
              onComplete: () => loader.remove()
            });
          }

          // Setup mouse forwarding: forward pointer events from entire hero
          // section to the Spline canvas so the robot follows cursor everywhere
          if (heroWrap && canvas) {
            setupMouseForwarding(heroWrap, canvas);
          }
        })
        .catch((err) => {
          console.warn('Spline scene failed to load:', err);
          if (loader) loader.remove();
        });
    }

    function setupMouseForwarding(heroWrap, canvas) {
      if (!heroWrap || !canvas) return;

      const handlePointer = (e) => {
        // Prevent recursive loop with synthetic events
        if (!e.isTrusted) return;

        const syntheticEvent = new PointerEvent('pointermove', {
          clientX: e.clientX,
          clientY: e.clientY,
          screenX: e.screenX,
          screenY: e.screenY,
          pageX: e.pageX,
          pageY: e.pageY,
          bubbles: false,
          cancelable: true,
          pointerId: 1,
          pointerType: 'mouse',
          isPrimary: true,
          width: 1,
          height: 1,
        });
        canvas.dispatchEvent(syntheticEvent);
      };

      heroWrap.addEventListener('pointermove', handlePointer, { passive: true });
    }

    /* ═══════════════════════════════════════════════════
     B. HERO COVER APPEAR & STICKY SCROLL LINES
     ═══════════════════════════════════════════════════ */
    function initHeroCoverAppear() {
      const linesWrapper = document.getElementById('sm-lines-wrapper');
      const lines = Array.from(document.querySelectorAll('.sm-line-item'));

      if (!linesWrapper || lines.length === 0) return;

      // Split text of each line into characters
      lines.forEach(line => {
        const titleEl = line.querySelector('.sm-line-title');
        if (titleEl) {
          splitChars(titleEl, 'sm-line-char');
        }
      });

      // Initial state: hide lines 1-3
      lines.forEach((line, idx) => {
        const chars = Array.from(line.querySelectorAll('.sm-line-char'));
        const thumbs = Array.from(line.querySelectorAll('.sm-thumb'));
        if (idx > 0) {
          gsap.set(chars, { autoAlpha: 0, rotateX: 90 });
          gsap.set(thumbs, { autoAlpha: 0, scale: 0.8 });
        }
      });

      // Line 0 reveal
      window.__smRevealLine0 = () => {
        const line0Chars = Array.from(lines[0].querySelectorAll('.sm-line-char'));
        gsap.fromTo(line0Chars, 
          { autoAlpha: 0, rotateX: 90 },
          { autoAlpha: 1, rotateX: 0, duration: 0.8, ease: 'expo.out', stagger: 0.015 }
        );
      };

      if (window.innerWidth >= 1200) {
        setupDesktopStickyLines(linesWrapper, lines);
      } else {
        setupMobileLines(lines);
      }

      // Spotlight mouse-follow on hero
      initSpotlight();

      // Video popup player
      initVideoPopup();

      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    }

    function setupDesktopStickyLines(linesWrapper, lines) {
      const line1Chars = Array.from(lines[1].querySelectorAll('.sm-line-char'));
      const line1Thumbs = Array.from(lines[1].querySelectorAll('.sm-thumb'));
      const line2Chars = Array.from(lines[2].querySelectorAll('.sm-line-char'));
      const line2Thumbs = Array.from(lines[2].querySelectorAll('.sm-thumb'));
      const line3Chars = Array.from(lines[3].querySelectorAll('.sm-line-char'));
      const stageFooter = document.getElementById('sm-stage-footer');

      gsap.set(line1Chars, { autoAlpha: 0, rotateX: 90 });
      gsap.set(line1Thumbs, { autoAlpha: 0, scale: 0.75, rotateX: 45 });
      gsap.set(line2Chars, { autoAlpha: 0, rotateX: 90 });
      gsap.set(line2Thumbs, { autoAlpha: 0, scale: 0.75, rotateX: 45 });
      gsap.set(line3Chars, { autoAlpha: 0, rotateX: 90 });
      if (stageFooter) gsap.set(stageFooter, { autoAlpha: 0, y: 24 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: linesWrapper,
          start: 'top top',
          end: '+=3200',
          pin: true,
          pinSpacing: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true
        }
      });

      tl.to({}, { duration: 0.08 });

      tl.to(line1Chars, { autoAlpha: 1, rotateX: 0, duration: 0.20, ease: 'power2.out', stagger: 0.008 }, 0.08);
      tl.to(line1Thumbs, { autoAlpha: 1, scale: 1, rotateX: 0, duration: 0.20, ease: 'back.out(1.4)', stagger: 0.015 }, 0.10);

      tl.to({}, { duration: 0.08 });

      tl.to(line1Thumbs, { autoAlpha: 0.25, duration: 0.06, ease: 'power2.out' }, 0.40);

      tl.to(line2Chars, { autoAlpha: 1, rotateX: 0, duration: 0.20, ease: 'power2.out', stagger: 0.008 }, 0.42);
      tl.to(line2Thumbs, { autoAlpha: 1, scale: 1, rotateX: 0, duration: 0.20, ease: 'back.out(1.4)', stagger: 0.015 }, 0.44);

      tl.to({}, { duration: 0.08 });

      tl.to(line2Thumbs, { autoAlpha: 0.25, duration: 0.06, ease: 'power2.out' }, 0.72);

      tl.to(line3Chars, { autoAlpha: 1, rotateX: 0, duration: 0.14, ease: 'power2.out', stagger: 0.012 }, 0.74);

      if (stageFooter) {
        tl.to(stageFooter, { autoAlpha: 1, y: 0, duration: 0.08, ease: 'power2.out' }, 0.88);
      }

      tl.to({}, { duration: 0.05 });
    }

    function setupMobileLines(lines) {
      lines.forEach((line) => {
        const chars = Array.from(line.querySelectorAll('.sm-line-char'));
        gsap.fromTo(chars,
          { autoAlpha: 0, y: 30 },
          {
            autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.015,
            scrollTrigger: { trigger: line, start: 'top 85%', toggleActions: 'play none none none' }
          }
        );
      });
      const stageFooter = document.getElementById('sm-stage-footer');
      if (stageFooter) {
        gsap.fromTo(stageFooter,
          { autoAlpha: 0, y: 30 },
          {
            autoAlpha: 1, y: 0, duration: 0.6,
            scrollTrigger: { trigger: stageFooter, start: 'top 85%', toggleActions: 'play none none none' }
          }
        );
      }
    }

    /* ═══════════════════════════════════════════════════
     C. SPOTLIGHT MOUSE-FOLLOW ON HERO
     ═══════════════════════════════════════════════════ */
    function initSpotlight() {
      const heroWrap = document.getElementById('sm-hero-spline-wrap');
      const spotlight = document.getElementById('sm-hero-spotlight');

      if (!heroWrap || !spotlight) return;

      let mouse = { x: 0, y: 0 };
      let pos = { x: 0, y: 0 };
      let isHovering = false;

      heroWrap.addEventListener('mouseenter', () => {
        isHovering = true;
        gsap.to(spotlight, { autoAlpha: 1, duration: 0.3 });
      });

      heroWrap.addEventListener('mouseleave', () => {
        isHovering = false;
        gsap.to(spotlight, { autoAlpha: 0, duration: 0.3 });
      });

      heroWrap.addEventListener('mousemove', (e) => {
        const rect = heroWrap.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
      });

      const loop = () => {
        if (isHovering) {
          pos.x += (mouse.x - pos.x) * 0.08;
          pos.y += (mouse.y - pos.y) * 0.08;
          spotlight.style.transform = `translate(${pos.x - 200}px, ${pos.y - 200}px)`;
        }
        requestAnimationFrame(loop);
      };
      requestAnimationFrame(loop);
    }

    /* ═══════════════════════════════════════════════════
     D. VIDEO POPUP MODAL
     ═══════════════════════════════════════════════════ */
    function initVideoPopup() {
      const popup = document.getElementById('sm-video-popup');
      const player = document.getElementById('sm-popup-video-player');
      const closeBtn = document.getElementById('sm-popup-close');

      if (!popup || !player) return;

      const close = () => {
        popup.classList.remove('is-open');
        player.pause();
      };

      if (closeBtn) closeBtn.addEventListener('click', close);
      popup.addEventListener('click', (e) => {
        if (e.target === popup) close();
      });

      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && popup.classList.contains('is-open')) {
          close();
        }
      });
    }
  }
}
