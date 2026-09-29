// ================================================================
// DILO DIGITAL — DINAMETRA SERVICES KINETIC SCENES
// Mathematical Algorithmic SVG Vector Drawings for the 6 Core Services
// Fluid, Beautiful, High-Framerate & 100% Meaningful
// ================================================================

export const W = 600;
export const H = 420;
export const INK = "#16253F";
export const ACCENT = "#FF5A1F"; // Dilo Orange
export const MINT = "#10B981";  // Success Mint
export const BLUE = "#3B82F6";  // Tech Blue
export const TAU = Math.PI * 2;
export const MONO_FONT = 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace';

export const clamp = (v) => Math.min(1, Math.max(0, v));
export const prog = (t, a, b) => clamp((t - a) / (b - a));
export const inOut = (p) => (p < 0.5 ? 4 * p * p * p : 1 - (-2 * p + 2) ** 3 / 2);
export const out = (p) => 1 - (1 - p) ** 3;
export const back = (p) => 1 + 2.70158 * (p - 1) ** 3 + 1.70158 * (p - 1) ** 2;
export const lerp = (a, b, p) => a + (b - a) * p;
export const mix = (a, b, p) => [lerp(a[0], b[0], p), lerp(a[1], b[1], p)];
export const quad = (a, c, b, p) => mix(mix(a, c, p), mix(c, b, p), p);
export const pt = (p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`;
export const fade = (t, loop) => prog(t, 0, 0.3) * (1 - prog(t, loop - 0.6, loop));

export const draw = (p) =>
  `pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="${(1 - p).toFixed(4)}" ${p > 0 ? '' : 'visibility="hidden"'}`;

export const line = 'fill="none" stroke="#16253F" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"';
export const hair = 'fill="none" stroke="#16253F" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" stroke-opacity="0.25"';
export const mono = `font-family: ${MONO_FONT}; letter-spacing: 0.8px;`;

// ────────────────────────────────────────────────────────────────
// 1. REGISTRO DE MARCA IMPI SCENE (LOOP: 10s)
// ────────────────────────────────────────────────────────────────
export function drawImpi(t) {
  const pDoc = inOut(prog(t, 0.2, 1.2));
  const pShield = inOut(prog(t, 1.0, 2.2));
  const stamp = prog(t, 3.2, 3.8);
  const pCheck = inOut(prog(t, 3.8, 4.4));
  const ipP = inOut(prog(t, 5.0, 5.8));
  const ip = quad([300, 340], [390, 280], [440, 160], ipP);

  let outSvg = `<g opacity="${fade(t, 10).toFixed(3)}">`;

  // Central Radar Rings
  const radarP = (t * 0.8) % 1;
  outSvg += `<circle cx="300" cy="210" r="${80 + radarP * 70}" ${hair} stroke="${ACCENT}" stroke-opacity="${(1 - radarP) * 0.4}" stroke-width="2" />`;
  outSvg += `<circle cx="300" cy="210" r="${40 + radarP * 50}" ${hair} stroke="${MINT}" stroke-opacity="${(1 - radarP) * 0.5}" stroke-width="1.5" />`;

  // Official Certificate Parchment
  outSvg += `<path d="M180 80 H420 V340 H180 Z" fill="#FFFFFF" stroke="${INK}" stroke-width="2.2" stroke-opacity="0.2" rx="12" />`;
  outSvg += `<path d="M200 100 H400 V320 H200 Z" fill="none" stroke="${INK}" stroke-width="1.2" stroke-dasharray="4 4" stroke-opacity="0.3" rx="8" />`;

  // Document lines drawing in
  for (let i = 0; i < 5; i++) {
    const lp = prog(t, 0.8 + i * 0.2, 1.3 + i * 0.2);
    outSvg += `<line x1="220" y1="${130 + i * 22}" x2="${320 + (i % 2) * 50}" y2="${130 + i * 22}" ${line} stroke-width="2" stroke-opacity="0.35" ${draw(lp)} />`;
  }

  // Official Security Shield Drawing
  const shieldD = "M300 70 L380 110 V200 C380 270 300 310 300 310 C300 310 220 270 220 200 V110 Z";
  outSvg += `<path d="${shieldD}" ${line} stroke="${ACCENT}" stroke-width="3" ${draw(pShield)} />`;
  outSvg += `<path d="M300 88 L362 120 V195 C362 250 300 286 300 286 C300 286 238 250 238 195 V120 Z" ${hair} stroke="${ACCENT}" stroke-opacity="0.35" ${draw(pShield)} />`;

  // Wax Seal Stamping Down
  if (stamp > 0) {
    const sScale = (1.4 - 0.4 * out(stamp)).toFixed(3);
    const sOpacity = out(stamp).toFixed(3);
    outSvg += `
      <g transform="translate(300 205) scale(${sScale})" opacity="${sOpacity}">
        <circle r="36" fill="#FFFFFF" stroke="${MINT}" stroke-width="3" />
        <circle r="28" fill="none" stroke="${MINT}" stroke-width="1.8" stroke-dasharray="3 4" />
        <path d="M-10 -1 L-3 6 L12 -9" fill="none" stroke="${MINT}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" ${draw(pCheck)} />
      </g>
    `;
  }

  // Floating Trademark Diamond (®)
  if (ipP > 0) {
    const dScale = (0.7 + 0.3 * ipP).toFixed(3);
    outSvg += `
      <g transform="translate(${pt(ip)}) scale(${dScale})" opacity="${prog(t, 5.0, 5.6).toFixed(3)}">
        <rect x="-18" y="-18" width="36" height="36" rx="8" fill="${ACCENT}" transform="rotate(45)" />
        <text x="0" y="6" font-size="18" fill="#FFFFFF" font-weight="900" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif">®</text>
      </g>
    `;
  }

  // Label caption
  outSvg += `<text x="300" y="375" text-anchor="middle" font-size="14" font-weight="700" fill="${INK}" fill-opacity="0.75" style="${mono}">EXPEDIENTE IMPI OFICIAL CONCEDIDO</text>`;

  outSvg += `</g>`;
  return outSvg;
}

// ────────────────────────────────────────────────────────────────
// 2. MARKETING PERFORMANCE & ROAS SCENE (LOOP: 10s)
// ────────────────────────────────────────────────────────────────
export function drawMarketing(t) {
  let outSvg = `<g opacity="${fade(t, 10).toFixed(3)}">`;

  // Coordinate axes
  outSvg += `<line x1="80" y1="330" x2="520" y2="330" ${hair} stroke-width="2" />`;
  outSvg += `<line x1="80" y1="330" x2="80" y2="70" ${hair} stroke-width="2" />`;

  // Grid lines
  for (let i = 1; i <= 4; i++) {
    const y = 330 - i * 55;
    outSvg += `<line x1="80" y1="${y}" x2="520" y2="${y}" stroke="${INK}" stroke-opacity="0.08" stroke-dasharray="4 6" />`;
  }

  // Channel Nodes (Google, Meta, TikTok)
  const channels = [
    { name: "Google Ads", x: 140, y: 280, color: "#4285F4", stat: "9.4% CTR" },
    { name: "Meta Ads", x: 250, y: 220, color: "#1877F2", stat: "142 Leads" },
    { name: "Scale ROAS", x: 380, y: 140, color: ACCENT, stat: "4.8X" },
  ];

  // Exponential Growth Curve Drawing
  const curveP = inOut(prog(t, 0.5, 4.0));
  const curvePath = "M80 320 C180 310 240 250 340 180 S460 90 500 80";
  outSvg += `
    <defs>
      <linearGradient id="dmGrowGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${ACCENT}" stop-opacity="0.25"/>
        <stop offset="100%" stop-color="${ACCENT}" stop-opacity="0.0"/>
      </linearGradient>
    </defs>
    <path d="${curvePath} L500 330 L80 330 Z" fill="url(#dmGrowGrad)" opacity="${curveP.toFixed(3)}" />
    <path d="${curvePath}" fill="none" stroke="${ACCENT}" stroke-width="3.5" stroke-linecap="round" ${draw(curveP)} />
  `;

  // Pulsing Signal Waves from Nodes
  channels.forEach((ch, idx) => {
    const nodeP = prog(t, 1.2 + idx * 0.8, 2.0 + idx * 0.8);
    const pulseP = (t * 1.2 + idx * 0.4) % 1;

    if (nodeP > 0) {
      outSvg += `<circle cx="${ch.x}" cy="${ch.y}" r="${12 + pulseP * 24}" fill="none" stroke="${ch.color}" stroke-opacity="${(1 - pulseP) * 0.45}" stroke-width="1.8" />`;
      outSvg += `<circle cx="${ch.x}" cy="${ch.y}" r="8" fill="${ch.color}" />`;
      outSvg += `<circle cx="${ch.x}" cy="${ch.y}" r="4" fill="#FFFFFF" />`;

      // Stat card pill above node
      outSvg += `
        <g transform="translate(${ch.x}, ${ch.y - 25})" opacity="${nodeP.toFixed(3)}">
          <rect x="-42" y="-12" width="84" height="20" rx="6" fill="#FFFFFF" stroke="${ch.color}" stroke-width="1.5" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.06))" />
          <text x="0" y="2" text-anchor="middle" font-size="10" font-weight="800" fill="${INK}" style="${mono}">${ch.stat}</text>
        </g>
      `;
    }
  });

  // Target Rocket Peak
  const rocketP = prog(t, 3.8, 5.0);
  if (rocketP > 0) {
    outSvg += `
      <g transform="translate(500, 80) scale(${out(rocketP)})">
        <circle r="18" fill="${ACCENT}" />
        <text x="0" y="5" text-anchor="middle" font-size="12" font-weight="900" fill="#FFFFFF" font-family="'Plus Jakarta Sans'">ROAS</text>
      </g>
    `;
  }

  // Live Conversion Ticker text at bottom
  outSvg += `<text x="300" y="375" text-anchor="middle" font-size="14" font-weight="700" fill="${INK}" fill-opacity="0.75" style="${mono}">CONVERSIÓN MULTICANAL: +185% ROAS POSITIVO</text>`;

  outSvg += `</g>`;
  return outSvg;
}

// ────────────────────────────────────────────────────────────────
// 3. WEB & E-COMMERCE HEADLESS SCENE (LOOP: 10s)
// ────────────────────────────────────────────────────────────────
export function drawWeb(t) {
  let outSvg = `<g opacity="${fade(t, 10).toFixed(3)}">`;

  // Browser Window Wireframe
  const pWin = inOut(prog(t, 0.2, 1.2));
  outSvg += `
    <rect x="120" y="70" width="360" height="260" rx="14" fill="#FFFFFF" stroke="${INK}" stroke-width="2.5" ${draw(pWin)} />
    <path d="M120 110 H480" stroke="${INK}" stroke-width="2" stroke-opacity="0.2" ${draw(pWin)} />
  `;

  // Browser Dots
  outSvg += `<circle cx="145" cy="90" r="4.5" fill="#EF4444" opacity="${pWin.toFixed(3)}" />`;
  outSvg += `<circle cx="160" cy="90" r="4.5" fill="#F59E0B" opacity="${pWin.toFixed(3)}" />`;
  outSvg += `<circle cx="175" cy="90" r="4.5" fill="#10B981" opacity="${pWin.toFixed(3)}" />`;

  // Address Bar with SSL Lock
  outSvg += `<rect x="200" y="80" width="200" height="20" rx="6" fill="#F1F5F9" opacity="${pWin.toFixed(3)}" />`;
  outSvg += `<text x="300" y="94" text-anchor="middle" font-size="10" font-weight="600" fill="${INK}" fill-opacity="0.6" style="${mono}">https://dilo.mx &lt; 0.8s</text>`;

  // Responsive device morph (Mobile phone inside desktop)
  const pMobile = inOut(prog(t, 1.5, 2.5));
  outSvg += `
    <rect x="360" y="140" width="95" height="170" rx="10" fill="#FFFFFF" stroke="${ACCENT}" stroke-width="2.2" filter="drop-shadow(0 4px 12px rgba(255,90,31,0.15))" ${draw(pMobile)} />
    <line x1="390" y1="150" x2="425" y2="150" stroke="${ACCENT}" stroke-width="2" stroke-linecap="round" opacity="${pMobile.toFixed(3)}" />
  `;

  // High-Speed Gauge Arc (< 0.8s PageSpeed 100)
  const gaugeP = inOut(prog(t, 2.8, 4.2));
  const cx = 220, cy = 210, r = 55;
  const startAngle = -Math.PI * 0.8;
  const endAngle = Math.PI * 0.8;
  const currAngle = lerp(startAngle, endAngle, gaugeP);

  outSvg += `
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${INK}" stroke-opacity="0.1" stroke-width="8" stroke-dasharray="4 4" />
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${MINT}" stroke-width="8" pathLength="1" stroke-dasharray="${gaugeP} 1" stroke-linecap="round" transform="rotate(-90 ${cx} ${cy})" />
    <text x="${cx}" y="${cy - 2}" text-anchor="middle" font-size="24" font-weight="900" fill="${MINT}" font-family="'Plus Jakarta Sans'">100</text>
    <text x="${cx}" y="${cy + 18}" text-anchor="middle" font-size="10" font-weight="800" fill="${INK}" fill-opacity="0.6" style="${mono}">PAGESPEED</text>
  `;

  // Tech stack pills drawing (React, Headless, Stripe)
  const stackP = prog(t, 4.4, 5.5);
  outSvg += `
    <g transform="translate(150, 285)" opacity="${stackP.toFixed(3)}">
      <rect x="0" y="0" width="60" height="20" rx="6" fill="#F1F5F9" stroke="${BLUE}" stroke-width="1.2" />
      <text x="30" y="14" text-anchor="middle" font-size="9" font-weight="700" fill="${BLUE}" style="${mono}">REACT</text>
    </g>
    <g transform="translate(220, 285)" opacity="${stackP.toFixed(3)}">
      <rect x="0" y="0" width="70" height="20" rx="6" fill="#F1F5F9" stroke="${ACCENT}" stroke-width="1.2" />
      <text x="35" y="14" text-anchor="middle" font-size="9" font-weight="700" fill="${ACCENT}" style="${mono}">HEADLESS</text>
    </g>
  `;

  // Label caption
  outSvg += `<text x="300" y="375" text-anchor="middle" font-size="14" font-weight="700" fill="${INK}" fill-opacity="0.75" style="${mono}">INGENIERÍA WEB HEADLESS: VELOCIDAD SUB-SEGUNDO</text>`;

  outSvg += `</g>`;
  return outSvg;
}

// ────────────────────────────────────────────────────────────────
// 4. BRANDING & IDENTIDAD VISUAL SCENE (LOOP: 10s)
// ────────────────────────────────────────────────────────────────
export function drawBranding(t) {
  let outSvg = `<g opacity="${fade(t, 10).toFixed(3)}">`;

  const cx = 300, cy = 200;

  // Sacred Geometry Construction Circles expanding
  const pCircles = inOut(prog(t, 0.2, 2.0));
  const radii = [120, 85, 55, 34];
  radii.forEach((r, idx) => {
    outSvg += `<circle cx="${cx}" cy="${cy}" r="${r}" ${hair} stroke-dasharray="4 5" ${draw(pCircles)} />`;
  });

  // Tangent and Cross Guides
  const pLines = inOut(prog(t, 1.4, 3.0));
  outSvg += `<line x1="${cx - 150}" y1="${cy}" x2="${cx + 150}" y2="${cy}" stroke="${INK}" stroke-width="1.2" stroke-opacity="0.3" ${draw(pLines)} />`;
  outSvg += `<line x1="${cx}" y1="${cy - 140}" x2="${cx}" y2="${cy + 140}" stroke="${INK}" stroke-width="1.2" stroke-opacity="0.3" ${draw(pLines)} />`;
  outSvg += `<line x1="${cx - 100}" y1="${cy - 100}" x2="${cx + 100}" y2="${cy + 100}" stroke="${ACCENT}" stroke-width="1" stroke-opacity="0.4" stroke-dasharray="3 3" ${draw(pLines)} />`;

  // Golden Monogram Logo Creation
  const pLogo = inOut(prog(t, 3.2, 5.0));
  const monogramPath = `M${cx - 40} ${cy - 50} H${cx + 10} C${cx + 45} ${cy - 50} ${cx + 55} ${cy - 20} ${cx + 55} ${cy} C${cx + 55} ${cy + 20} ${cx + 45} ${cy + 50} ${cx + 10} ${cy + 50} H${cx - 40} Z`;
  outSvg += `<path d="${monogramPath}" fill="none" stroke="${ACCENT}" stroke-width="5" stroke-linejoin="round" ${draw(pLogo)} />`;
  outSvg += `<line x1="${cx - 40}" y1="${cy - 60}" x2="${cx - 40}" y2="${cy + 60}" stroke="${INK}" stroke-width="3" stroke-linecap="round" ${draw(pLogo)} />`;

  // Color Palette Satellites orbiting around the logo
  const orbitP = (t * 0.6) % 1;
  const swatches = [
    { col: ACCENT, r: 100, off: 0 },
    { col: INK, r: 100, off: TAU / 3 },
    { col: "#FAF7FD", r: 100, off: (TAU * 2) / 3 },
  ];

  swatches.forEach(({ col, r, off }) => {
    const a = orbitP * TAU + off;
    const sx = cx + Math.cos(a) * r;
    const sy = cy + Math.sin(a) * r;
    outSvg += `
      <g transform="translate(${sx.toFixed(1)}, ${sy.toFixed(1)})" opacity="${prog(t, 4.0, 5.0).toFixed(3)}">
        <circle r="14" fill="${col}" stroke="#FFFFFF" stroke-width="2.5" filter="drop-shadow(0 2px 6px rgba(0,0,0,0.15))" />
      </g>
    `;
  });

  // Label caption
  outSvg += `<text x="300" y="375" text-anchor="middle" font-size="14" font-weight="700" fill="${INK}" fill-opacity="0.75" style="${mono}">ARQUITECTURA DE MARCA: GEOMETRÍA ÁUREA</text>`;

  outSvg += `</g>`;
  return outSvg;
}

// ────────────────────────────────────────────────────────────────
// 5. AUTOMATIZACIONES & AGENTES IA 24/7 SCENE (LOOP: 10s)
// ────────────────────────────────────────────────────────────────
export function drawAi(t) {
  let outSvg = `<g opacity="${fade(t, 10).toFixed(3)}">`;

  const cx = 300, cy = 200;

  // Central AI Core Hexagon
  const pHex = inOut(prog(t, 0.2, 1.4));
  const hexRadius = 40;
  let hexD = "";
  for (let i = 0; i < 6; i++) {
    const a = (i * Math.PI) / 3;
    const hx = cx + Math.cos(a) * hexRadius;
    const hy = cy + Math.sin(a) * hexRadius;
    hexD += (i === 0 ? "M" : "L") + `${hx.toFixed(1)} ${hy.toFixed(1)} `;
  }
  hexD += "Z";
  outSvg += `<path d="${hexD}" fill="#FFFFFF" stroke="${ACCENT}" stroke-width="3" filter="drop-shadow(0 4px 14px rgba(255,90,31,0.2))" ${draw(pHex)} />`;
  outSvg += `<circle cx="${cx}" cy="${cy}" r="12" fill="${ACCENT}" opacity="${pHex.toFixed(3)}" />`;

  // Neural Synapse Branching Lines to 4 service hubs
  const hubs = [
    { name: "WhatsApp", x: 150, y: 130, col: MINT },
    { name: "CRM API", x: 450, y: 130, col: BLUE },
    { name: "Make / Zapier", x: 150, y: 270, col: "#A855F7" },
    { name: "Funnels IA", x: 450, y: 270, col: ACCENT },
  ];

  hubs.forEach((hub, idx) => {
    const pLine = inOut(prog(t, 1.2 + idx * 0.3, 2.2 + idx * 0.3));
    outSvg += `<path d="M${cx} ${cy} C${(cx + hub.x) / 2} ${cy} ${(cx + hub.x) / 2} ${hub.y} ${hub.x} ${hub.y}" fill="none" stroke="${hub.col}" stroke-width="2" stroke-dasharray="4 4" ${draw(pLine)} />`;

    // Data packet traveling along the wire
    const packetT = (t * 1.5 + idx * 0.35) % 1;
    const packetPos = mix([cx, cy], [hub.x, hub.y], packetT);
    outSvg += `<circle cx="${packetPos[0]}" cy="${packetPos[1]}" r="4" fill="${hub.col}" filter="drop-shadow(0 0 6px ${hub.col})" />`;

    // Hub node card
    outSvg += `
      <g transform="translate(${hub.x}, ${hub.y})" opacity="${pLine.toFixed(3)}">
        <rect x="-45" y="-16" width="90" height="32" rx="8" fill="#FFFFFF" stroke="${hub.col}" stroke-width="1.8" filter="drop-shadow(0 2px 8px rgba(0,0,0,0.06))" />
        <circle cx="-28" cy="0" r="4" fill="${hub.col}" />
        <text x="5" y="4" text-anchor="middle" font-size="10" font-weight="800" fill="${INK}" style="${mono}">${hub.name}</text>
      </g>
    `;
  });

  // Conversational response badge (⚡ < 15s)
  const pResponse = prog(t, 3.5, 4.8);
  if (pResponse > 0) {
    outSvg += `
      <g transform="translate(${cx}, ${cy + 65})" opacity="${pResponse.toFixed(3)}">
        <rect x="-65" y="-12" width="130" height="24" rx="12" fill="${MINT}" />
        <text x="0" y="4" text-anchor="middle" font-size="10" font-weight="800" fill="#FFFFFF" style="${mono}">⚡ RESPUESTA &lt; 15s</text>
      </g>
    `;
  }

  // Label caption
  outSvg += `<text x="300" y="375" text-anchor="middle" font-size="14" font-weight="700" fill="${INK}" fill-opacity="0.75" style="${mono}">AGENTES DE IA 24/7 & AUTOMATIZACIONES</text>`;

  outSvg += `</g>`;
  return outSvg;
}

// ────────────────────────────────────────────────────────────────
// 6. REPORTES EN VIVO & ANALÍTICA BI SCENE (LOOP: 10s)
// ────────────────────────────────────────────────────────────────
export function drawReportes(t) {
  let outSvg = `<g opacity="${fade(t, 10).toFixed(3)}">`;

  // Isometric Ground Grid Plane
  const pGrid = inOut(prog(t, 0.2, 1.4));
  for (let i = 0; i <= 5; i++) {
    const y = 240 + i * 16;
    outSvg += `<line x1="${160 - i * 15}" y1="${y}" x2="${440 + i * 15}" y2="${y}" stroke="${INK}" stroke-opacity="0.08" ${draw(pGrid)} />`;
  }

  // 5 Dynamic Rising Isometric Equalizer Bars
  const bars = [
    { x: 190, maxH: 90, col: "#4285F4", speed: 1.2 },
    { x: 245, maxH: 140, col: ACCENT, speed: 1.5 },
    { x: 300, maxH: 180, col: MINT, speed: 1.1 },
    { x: 355, maxH: 130, col: "#A855F7", speed: 1.4 },
    { x: 410, maxH: 160, col: ACCENT, speed: 1.3 },
  ];

  const baseY = 290;
  bars.forEach((b, idx) => {
    const wave = Math.sin(t * b.speed + idx) * 0.25 + 0.75;
    const h = b.maxH * wave * inOut(prog(t, 0.8 + idx * 0.2, 2.2 + idx * 0.2));
    const topY = baseY - h;

    outSvg += `
      <!-- Bar front face -->
      <rect x="${b.x - 16}" y="${topY}" width="32" height="${h}" fill="${b.col}" fill-opacity="0.85" rx="3" />
      <!-- Bar top cap -->
      <polygon points="${b.x - 16},${topY} ${b.x},${topY - 8} ${b.x + 16},${topY} ${b.x},${topY + 6}" fill="${b.col}" />
    `;
  });

  // Floating Trend Line connecting the bar peaks
  const pTrend = inOut(prog(t, 2.2, 4.0));
  let trendD = "";
  bars.forEach((b, idx) => {
    const wave = Math.sin(t * b.speed + idx) * 0.25 + 0.75;
    const topY = baseY - b.maxH * wave;
    trendD += (idx === 0 ? "M" : "L") + `${b.x} ${topY - 14} `;
  });
  outSvg += `<path d="${trendD}" fill="none" stroke="${INK}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" ${draw(pTrend)} />`;

  // Radar circular sweep around top peak
  const radarSweep = (t * 0.7) % 1;
  outSvg += `<circle cx="300" cy="90" r="${30 + radarSweep * 40}" fill="none" stroke="${MINT}" stroke-opacity="${(1 - radarSweep) * 0.4}" stroke-width="1.8" />`;
  outSvg += `
    <g transform="translate(300, 75)" opacity="${prog(t, 3.5, 4.5).toFixed(3)}">
      <rect x="-40" y="-12" width="80" height="22" rx="6" fill="#FFFFFF" stroke="${MINT}" stroke-width="1.8" filter="drop-shadow(0 2px 6px rgba(0,0,0,0.08))" />
      <text x="0" y="3" text-anchor="middle" font-size="11" font-weight="900" fill="${MINT}" style="${mono}">GA4 · 4.8X</text>
    </g>
  `;

  // Label caption
  outSvg += `<text x="300" y="375" text-anchor="middle" font-size="14" font-weight="700" fill="${INK}" fill-opacity="0.75" style="${mono}">REPORTES EN TIEMPO REAL: LOOKER STUDIO & GA4</text>`;

  outSvg += `</g>`;
  return outSvg;
}

export const SCENES = {
  'registro-marca': { draw: drawImpi, loop: 10 },
  'marketing': { draw: drawMarketing, loop: 10 },
  'web-ecommerce': { draw: drawWeb, loop: 10 },
  'branding': { draw: drawBranding, loop: 10 },
  'automatizacion': { draw: drawAi, loop: 10 },
  'reportes': { draw: drawReportes, loop: 10 },
};
