// ================================================================
// PIXEL-PERFECT SADU MEDIA HERO REPLICA FOR DILO DIGITAL
// Replicates exact Sadu Media intro loader, 3D character flips,
// cinematic video expand animation, and native sticky scroll lines.
// ================================================================

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ── Asset URLs from Sadu Media CDN ── */
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

const VIDEO_LOOP = '/video/hero-reel.mp4';
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
       1. SADU MEDIA INTRO LOADER (Video expands between letters)
       ================================================================ -->
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

    <!-- Media container: Starts clipped into the slot, then expands to 100vw x 100vh -->
    <div class="sm-loader-medias" id="sm-loader-medias">
      ${LOADER_IMGS.map((src, i) => `
        <div class="sm-loader-media" data-slide-index="${i}">
          <img src="${src}" alt="Showcase Preview">
        </div>
      `).join('')}
      <!-- Final slide: Promo video (local, instant playback without lag) -->
      <div class="sm-loader-media sm-loader-media-video" data-slide-index="${LOADER_IMGS.length}">
        <video id="sm-loader-video-el" src="${VIDEO_LOOP}" autoplay loop muted playsinline preload="auto"></video>
      </div>
      <div class="sm-loader-media-overlay"></div>
    </div>
  </div>

  <!-- ================================================================
       2. MAIN HERO SECTION
       ================================================================ -->
  <section class="sm-home-cover" id="sm-home-cover">

    <!-- ① FULLSCREEN HERO VIDEO BANNER -->
    <div class="sm-hero-video-wrap" id="sm-hero-video-wrap">
      <div class="sm-hero-video-media" id="sm-hero-video-media">
        <video id="sm-hero-bg-video" src="${VIDEO_LOOP}" autoplay loop muted playsinline preload="auto"></video>
        <div class="sm-hero-video-overlay"></div>

        <!-- Follow-Mouse Cursor ("Ver Reel") -->
        <div class="sm-follow-mouse" id="sm-follow-mouse">
          <span class="sm-cursor-text-left" id="sm-cursor-left">Ver</span>
          <div class="sm-cursor-diamond-box" id="sm-cursor-diamond">
            <div class="sm-cursor-corner c-t"></div>
            <div class="sm-cursor-corner c-r"></div>
            <div class="sm-cursor-center" id="sm-cursor-center"></div>
            <div class="sm-cursor-corner c-b"></div>
            <div class="sm-cursor-corner c-l"></div>
          </div>
          <span class="sm-cursor-text-right" id="sm-cursor-right">Reel</span>
        </div>
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

    /* ═══════════════════════════════════════════════════
       A. LOADER ANIMATION (Exact Sadu Media replication)
       ═══════════════════════════════════════════════════ */
    const loaderHost = document.getElementById('sm-loader-host');
    const loaderContent = document.getElementById('sm-loader-content');
    const mediasWrapper = document.getElementById('sm-loader-medias');
    const title0 = document.getElementById('sm-loader-title-0');
    const title1 = document.getElementById('sm-loader-title-1');
    const title2 = document.getElementById('sm-loader-title-2');
    const slotDesktop = document.getElementById('sm-loader-slot-desktop');
    const slotMobile = document.getElementById('sm-loader-slot-mobile');

    // Strict Scroll-Lock during intro animation:
    // Prevents user from scrolling during loader and ensures page stays pinned at top
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

    // 1. Initialize Hero sticky stages and ScrollTrigger pins immediately upfront
    initHeroCoverAppear();

    if (loaderHost && mediasWrapper && title0 && title1 && title2) {
      lockScroll();
      const slot = isMobile ? slotMobile : slotDesktop;
      const mediaSlides = Array.from(mediasWrapper.querySelectorAll('.sm-loader-media'));

      // Explicit Video Handshake & Preload:
      const loaderVid = document.getElementById('sm-loader-video-el');
      const heroVid = document.getElementById('sm-hero-bg-video');

      [loaderVid, heroVid].forEach(v => {
        if (v) {
          v.muted = true;
          v.defaultMuted = true;
          v.playsInline = true;
          v.setAttribute('playsinline', '');
          v.setAttribute('webkit-playsinline', '');
          v.load();
          const p = v.play();
          if (p !== undefined) p.catch(() => {});
        }
      });

      // Split characters for 3D tumbling effect
      const chars0 = splitChars(title0, 'sm-loader-char');
      const chars1 = splitChars(title1, 'sm-loader-char');
      const chars2 = splitChars(title2, 'sm-loader-char');
      const allChars = [...chars0, ...chars1, ...chars2];

      // Measure bounding boxes
      const slotBounds = slot.getBoundingClientRect();
      const wrapBounds = mediasWrapper.getBoundingClientRect();

      // Compute center offsets from placeholder slot to center of screen
      const slotCenterX = slotBounds.left + slotBounds.width / 2;
      const slotCenterY = slotBounds.top + slotBounds.height / 2;
      const wrapCenterX = wrapBounds.left + wrapBounds.width / 2;
      const wrapCenterY = wrapBounds.top + wrapBounds.height / 2;

      const initialOffsetX = slotCenterX - wrapCenterX;
      const initialOffsetY = slotCenterY - wrapCenterY;

      // Compute clip-path insets so wrapper matches the slot when opened
      const clipTopBottom = Math.max(0, (wrapBounds.height - slotBounds.height) / 2);
      const clipLeftRight = Math.max(0, (wrapBounds.width - slotBounds.width) / 2);

      // Initial scale so inner video/images fill the slot nicely
      const initialScale = Math.max(
        slotBounds.height / Math.max(1, wrapBounds.height),
        slotBounds.width / Math.max(1, wrapBounds.width)
      ) + 0.25;

      // STARTING STATE:
      gsap.set(mediasWrapper, {
        autoAlpha: 0,
        x: initialOffsetX,
        y: initialOffsetY,
        clipPath: `inset(${clipTopBottom}px ${wrapBounds.width / 2}px round 12px)`
      });

      mediaSlides.forEach(slide => {
        gsap.set(slide, { autoAlpha: 0 });
        const inners = slide.querySelectorAll('img, video');
        inners.forEach(inner => gsap.set(inner, { scale: initialScale }));
      });

      // Characters start rotated 90deg backwards (lying down flat)
      gsap.set(allChars, {
        autoAlpha: 0,
        rotateX: 90
      });

      // On desktop, shift "WE" and "ARE" to sit right next to each other in the center
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

      // Build Master Sadu Loader Timeline
      const tl = gsap.timeline({
        delay: 0.15
      });

      // 1. Flip in all characters in 3D (0 -> 0.8s)
      tl.to(allChars, {
        autoAlpha: 1,
        duration: 0.35,
        ease: 'power2.out',
        stagger: 0.02
      }, 0);
      tl.to(allChars, {
        rotateX: 0,
        duration: 0.8,
        ease: 'expo.out',
        stagger: 0.02
      }, 0);

      // 2. Slide "WE" left and "ARE" right (0.5s -> 1.75s)
      if (!isMobile) {
        tl.to([title0, title1], {
          x: 0,
          duration: 1.25,
          ease: 'expo.inOut'
        }, 0.5);
      }

      // 3. Simultaneously reveal the slot between them (unfolds from 0px width to slot width)
      tl.to(mediasWrapper, {
        autoAlpha: 1,
        duration: 0.3,
        ease: 'power2.out'
      }, 0.5);

      tl.to(mediasWrapper, {
        clipPath: `inset(${clipTopBottom}px ${clipLeftRight}px round 12px)`,
        duration: 1.25,
        ease: 'expo.inOut'
      }, 0.5);

      // 4. Shutter flip of agency projects inside slot (0.65s -> 1.75s)
      const shutterStart = 0.65;
      const shutterDuration = 1.1;
      const step = shutterDuration / mediaSlides.length;
      mediaSlides.forEach((slide, idx) => {
        const time = shutterStart + idx * step;
        tl.set(mediaSlides, { autoAlpha: 0 }, time);
        tl.set(slide, { autoAlpha: 1 }, time);
        if (idx === mediaSlides.length - 1) {
          tl.add(() => {
            if (loaderVid) {
              loaderVid.currentTime = 0;
              loaderVid.play().catch(() => {});
            }
            if (heroVid) {
              heroVid.play().catch(() => {});
            }
          }, time);
        }
      });

      // 5. Brief cinematic hold on the promo video (1.75s -> 2.15s)
      tl.to({}, { duration: 0.4 });

      // 6. CINEMATIC FULLSCREEN EXPANSION! (2.15s -> 3.65s)
      tl.to(mediasWrapper, {
        clipPath: 'inset(0px 0px round 0px)',
        x: 0,
        y: 0,
        duration: 1.5,
        ease: 'expo.inOut'
      }, '+=0.05');

      // Zoom video inside to natural scale 1
      const allInners = mediasWrapper.querySelectorAll('img, video');
      tl.to(allInners, {
        scale: 1,
        duration: 1.5,
        ease: 'expo.inOut'
      }, '<');

      // Fade out title text as video engulfs the screen
      tl.to(loaderContent, {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out'
      }, '<+=0.3');

      // 7. Video timestamp sync before fading out loader
      tl.add(() => {
        if (heroVid && loaderVid) {
          try {
            if (!isNaN(loaderVid.currentTime) && loaderVid.currentTime > 0) {
              heroVid.currentTime = loaderVid.currentTime;
            }
          } catch (e) {}
          heroVid.play().catch(() => {});
        }
      });

      // 8. Seamless cross-fade of loader host into hero banner (no black screens!)
      tl.to(loaderHost, {
        opacity: 0,
        duration: 0.45,
        ease: 'power2.inOut',
        onComplete: () => {
          unlockScroll();
          loaderHost.remove();
          if (typeof window.__smRevealLine0 === 'function') {
            window.__smRevealLine0();
          }
          ScrollTrigger.sort();
          ScrollTrigger.refresh();
        }
      });

    } else {
      if (typeof window.__smRevealLine0 === 'function') {
        window.__smRevealLine0();
      }
    }

    /* ═══════════════════════════════════════════════════
     B. HERO COVER APPEAR & STICKY SCROLL LINES
     ═══════════════════════════════════════════════════ */
    function initHeroCoverAppear() {
      const linesWrapper = document.getElementById('sm-lines-wrapper');
      const lines = Array.from(document.querySelectorAll('.sm-line-item'));
      const heroCover = document.getElementById('sm-home-cover');
      const bgVideo = document.getElementById('sm-hero-bg-video');

      if (bgVideo) {
        bgVideo.play().catch(() => {});
      }

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

      // Line 0 reveal function
      window.__smRevealLine0 = () => {
        const line0Chars = Array.from(lines[0].querySelectorAll('.sm-line-char'));
        gsap.fromTo(line0Chars, 
          { autoAlpha: 0, rotateX: 90 },
          { autoAlpha: 1, rotateX: 0, duration: 0.8, ease: 'expo.out', stagger: 0.015 }
        );
      };

      // Desktop Sticky Stacking Mechanics
      if (window.innerWidth >= 1200) {
        setupDesktopStickyLines(linesWrapper, lines, heroCover);
      } else {
        setupMobileLines(lines);
      }

      // Follow mouse cursor
      initFollowMouse();

      // Video popup player
      initVideoPopup();

      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    }

    function setupDesktopStickyLines(linesWrapper, lines, heroCover) {
      // Line elements:
      // lines[0]: Hook (Creamos tu marca. Construimos su identidad.)
      // lines[1]: Branding & Diseño (with 6 thumbnails)
      // lines[2]: Marketing Digital (with 6 thumbnails)
      // lines[3]: Resultados Reales.
      const line1Chars = Array.from(lines[1].querySelectorAll('.sm-line-char'));
      const line1Thumbs = Array.from(lines[1].querySelectorAll('.sm-thumb'));
      const line2Chars = Array.from(lines[2].querySelectorAll('.sm-line-char'));
      const line2Thumbs = Array.from(lines[2].querySelectorAll('.sm-thumb'));
      const line3Chars = Array.from(lines[3].querySelectorAll('.sm-line-char'));
      const stageFooter = document.getElementById('sm-stage-footer');

      // Ensure starting states:
      gsap.set(line1Chars, { autoAlpha: 0, rotateX: 90 });
      gsap.set(line1Thumbs, { autoAlpha: 0, scale: 0.75, rotateX: 45 });
      gsap.set(line2Chars, { autoAlpha: 0, rotateX: 90 });
      gsap.set(line2Thumbs, { autoAlpha: 0, scale: 0.75, rotateX: 45 });
      gsap.set(line3Chars, { autoAlpha: 0, rotateX: 90 });
      if (stageFooter) {
        gsap.set(stageFooter, { autoAlpha: 0, y: 24 });
      }

      // Master Pinned Scrubbed Timeline
      // end: '+=3400' provides the weighty, luxurious scroll requested:
      // "el scroll un poco mas pesado osea que dure mas con cada palabra, sino pasa todo ultra rapido."
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: linesWrapper,
          start: 'top top',
          end: '+=3400',
          pin: true,
          scrub: 0.8,
          anticipatePin: 0,
          fastScrollEnd: true,
          preventOverlaps: true,
          invalidateOnRefresh: true
        }
      });

      // 0.00 -> 0.08: Initial hold on Line 0 (user begins scrolling, reads Line 0)
      tl.to({}, { duration: 0.08 });

      // 0.08 -> 0.32: Reveal Line 1 (Branding & Diseño + 6 thumbs)
      tl.to(line1Chars, {
        autoAlpha: 1,
        rotateX: 0,
        duration: 0.20,
        ease: 'power2.out',
        stagger: 0.008
      }, 0.08);
      tl.to(line1Thumbs, {
        autoAlpha: 1,
        scale: 1,
        rotateX: 0,
        duration: 0.20,
        ease: 'back.out(1.4)',
        stagger: 0.015
      }, 0.10);

      // 0.32 -> 0.40: Weighty hold on Line 1 (user comfortably reads every word)
      tl.to({}, { duration: 0.08 });

      // At 0.40: Line 1 thumbs gently dim to 0.25 to shift focus cleanly to Line 2
      tl.to(line1Thumbs, {
        autoAlpha: 0.25,
        duration: 0.06,
        ease: 'power2.out'
      }, 0.40);

      // 0.42 -> 0.66: Reveal Line 2 (Marketing Digital + 6 thumbs)
      tl.to(line2Chars, {
        autoAlpha: 1,
        rotateX: 0,
        duration: 0.20,
        ease: 'power2.out',
        stagger: 0.008
      }, 0.42);
      tl.to(line2Thumbs, {
        autoAlpha: 1,
        scale: 1,
        rotateX: 0,
        duration: 0.20,
        ease: 'back.out(1.4)',
        stagger: 0.015
      }, 0.44);

      // 0.66 -> 0.74: Weighty hold on Line 2
      tl.to({}, { duration: 0.08 });

      // At 0.74: Line 2 thumbs gently dim to 0.25 to focus on final punchline
      tl.to(line2Thumbs, {
        autoAlpha: 0.25,
        duration: 0.06,
        ease: 'power2.out'
      }, 0.72);

      // 0.74 -> 0.88: Reveal Line 3 ("Resultados Reales.")
      tl.to(line3Chars, {
        autoAlpha: 1,
        rotateX: 0,
        duration: 0.14,
        ease: 'power2.out',
        stagger: 0.012
      }, 0.74);

      // 0.88 -> 0.95: Reveal Subtitle & 3D Button directly below Line 3 (zero empty void!)
      if (stageFooter) {
        tl.to(stageFooter, {
          autoAlpha: 1,
          y: 0,
          duration: 0.08,
          ease: 'power2.out'
        }, 0.88);
      }

      // 0.95 -> 1.00: Final hold showing all lines + Subtitle + Button in complete harmony
      tl.to({}, { duration: 0.05 });

      // Parallax on top video banner
      const videoMedia = document.getElementById('sm-hero-video-media');
      if (videoMedia) {
        gsap.to(videoMedia, {
          y: '22%',
          ease: 'none',
          scrollTrigger: {
            trigger: '#sm-hero-video-wrap',
            start: 'top top',
            end: 'bottom top',
            scrub: true
          }
        });
      }
    }

    function setupMobileLines(lines) {
      lines.forEach((line) => {
        const chars = Array.from(line.querySelectorAll('.sm-line-char'));
        gsap.fromTo(chars,
          { autoAlpha: 0, y: 30 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.015,
            scrollTrigger: {
              trigger: line,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        );
      });
      const stageFooter = document.getElementById('sm-stage-footer');
      if (stageFooter) {
        gsap.fromTo(stageFooter,
          { autoAlpha: 0, y: 30 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            scrollTrigger: {
              trigger: stageFooter,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        );
      }
    }

    /* ═══════════════════════════════════════════════════
     C. FOLLOW MOUSE CURSOR
     ═══════════════════════════════════════════════════ */
    function initFollowMouse() {
      const banner = document.getElementById('sm-hero-video-wrap');
      const cursor = document.getElementById('sm-follow-mouse');
      const center = document.getElementById('sm-cursor-center');
      const leftText = document.getElementById('sm-cursor-left');
      const rightText = document.getElementById('sm-cursor-right');

      if (!banner || !cursor) return;

      let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
      let pos = { x: mouse.x, y: mouse.y };
      let isHovering = false;

      banner.addEventListener('mouseenter', () => {
        isHovering = true;
        cursor.classList.add('is-active');

        gsap.fromTo(center, { scale: 0 }, { scale: 1, duration: 0.5, ease: 'back.out(1.7)' });
        if (leftText) gsap.fromTo(leftText, { x: 15, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4 });
        if (rightText) gsap.fromTo(rightText, { x: -15, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4 });
      });

      banner.addEventListener('mouseleave', () => {
        isHovering = false;
        cursor.classList.remove('is-active');
      });

      banner.addEventListener('mousemove', (e) => {
        const rect = banner.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
      });

      const loop = () => {
        if (isHovering) {
          pos.x += (mouse.x - pos.x) * 0.14;
          pos.y += (mouse.y - pos.y) * 0.14;
          cursor.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
        }
        requestAnimationFrame(loop);
      };
      requestAnimationFrame(loop);
    }

    /* ═══════════════════════════════════════════════════
     D. VIDEO POPUP MODAL
     ═══════════════════════════════════════════════════ */
    function initVideoPopup() {
      const banner = document.getElementById('sm-hero-video-wrap');
      const popup = document.getElementById('sm-video-popup');
      const player = document.getElementById('sm-popup-video-player');
      const closeBtn = document.getElementById('sm-popup-close');

      if (!banner || !popup || !player) return;

      banner.addEventListener('click', () => {
        popup.classList.add('is-open');
        player.play().catch(() => {});
      });

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
