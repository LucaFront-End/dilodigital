// ================================================================
// DILO DIGITAL — SERVICES STACK MATHEMATICAL SVG SCENES
// Algorithmic Line Drawings for Legal, Branding, Tech & AI
// Exact Knnekt Studio / 21st.dev Mathematical Animation Engine
// ================================================================

export const W = 1280;
export const H = 536;
export const INK = "#16253f";
export const ACCENT = "#FF5A1F"; // Dilo Signature Orange
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
export const cubic = (a, c1, c2, b, p) => quad(mix(a, c1, p), mix(c1, c2, p), mix(c2, b, p), p);
export const pt = (p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`;
export const fade = (t, loop) => prog(t, 0, 0.25) * (1 - prog(t, loop - 0.7, loop));

export const draw = (p) =>
  `pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="${(1 - p).toFixed(4)}" ${p > 0 ? '' : 'visibility="hidden"'}`;

export const line = 'fill="none" stroke="#16253f" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"';
export const hair = 'fill="none" stroke="#16253f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-opacity="0.22"';
export const mono = `font-family: ${MONO_FONT}; letter-spacing: 1px;`;

// ----------------------------------------------------------------
// 1. LEGAL & COMPLIANCE SCENE (Blindaje Legal & IMPI)
// ----------------------------------------------------------------
const L_DOC = [235, 245];
const L_CAP = [640, 230];
const L_SLICES = [
  { start: 0, share: 0.6, color: INK, opacity: 0.85 },
  { start: 0.6, share: 0.25, color: INK, opacity: 0.35 },
  { start: 0.85, share: 0.15, color: ACCENT, opacity: 1 },
];
const L_TEXT = [210, 190, 215, 160, 205, 180, 212, 120];
const L_SLOTS = Array.from({ length: 6 }, (_, i) => ({
  x: 880 + (i % 3) * 115,
  y: 150 + Math.floor(i / 3) * 150,
  from: i === 3 || i === 5 ? L_CAP : L_DOC,
}));

export function drawLegal(t) {
  const stamp = prog(t, 3.3, 3.7);
  const ipP = inOut(prog(t, 3.9, 4.6));
  const ip = quad([520, 450], [440, 330], [260, 317], ipP);
  const shackle = out(prog(t, 10.6, 11.1));

  let outSvg = `<g opacity="${fade(t, 13).toFixed(3)}">`;

  // Page draws itself
  outSvg += `<path d="M100 40H340L370 70V450H100Z" ${line} ${draw(inOut(prog(t, 0.1, 0.9)))} />`;
  outSvg += `<path d="M340 40V70H370" ${line} ${draw(prog(t, 0.8, 1))} />`;
  outSvg += `<line x1="130" y1="90" x2="270" y2="90" ${line} stroke-width="5" ${draw(prog(t, 0.6, 1))} />`;

  // Text lines
  L_TEXT.forEach((w, i) => {
    outSvg += `<line x1="130" y1="${125 + i * 24}" x2="${130 + w}" y2="${125 + i * 24}" ${line} stroke-width="2" stroke-opacity="0.4" ${draw(prog(t, 0.9 + i * 0.2, 1.25 + i * 0.2))} />`;
  });

  outSvg += `<line x1="130" y1="317" x2="280" y2="317" ${line} stroke-width="2" stroke="${ACCENT}" ${draw(prog(t, 4.6, 5))} />`;
  outSvg += `<line x1="130" y1="404" x2="300" y2="404" ${hair} ${draw(prog(t, 2.3, 2.6))} />`;

  // Signature
  outSvg += `<path d="M140 392C155 360 165 402 178 380S200 360 205 388S230 400 240 372S262 380 290 384" ${line} ${draw(inOut(prog(t, 2.6, 3.3)))} />`;

  // Wax Stamp
  if (stamp > 0) {
    const sScale = (1.5 - 0.5 * out(stamp)).toFixed(3);
    const sOpacity = out(stamp).toFixed(3);
    outSvg += `
      <g transform="translate(330 392) scale(${sScale})" opacity="${sOpacity}">
        <circle r="30" ${line} fill="#fff" stroke="${ACCENT}" />
        <circle r="21" ${line} stroke="${ACCENT}" stroke-width="2" stroke-dasharray="3 5" />
        <path d="M-8 0l5 6l11 -12" ${line} stroke="${ACCENT}" />
      </g>
    `;
  }

  // IP Assignment diamond
  if (ipP < 1) {
    outSvg += `<rect x="${(ip[0] - 9).toFixed(1)}" y="${(ip[1] - 9).toFixed(1)}" width="18" height="18" rx="2" fill="${ACCENT}" opacity="${prog(t, 3.6, 3.9).toFixed(3)}" transform="rotate(45 ${pt(ip)})" />`;
  }

  // Cap table
  outSvg += `<circle cx="${L_CAP[0]}" cy="${L_CAP[1]}" r="120" ${hair} stroke-opacity="0.15" opacity="${prog(t, 4.8, 5.1).toFixed(3)}" />`;
  L_SLICES.forEach(({ start, share, color, opacity }, i) => {
    const p = inOut(prog(t, 5 + i * 0.45, 5.5 + i * 0.45));
    const mid = (start + share / 2) * TAU - Math.PI / 2;
    const dash = `${Math.max(0, share * p - 0.008).toFixed(4)} 1`;
    outSvg += `
      <g>
        <circle cx="${L_CAP[0]}" cy="${L_CAP[1]}" r="120" fill="none" stroke="${color}" stroke-opacity="${opacity}" stroke-width="20" pathLength="1" stroke-dasharray="${dash}" stroke-dashoffset="${-start}" transform="rotate(-90 ${pt(L_CAP)})" ${p > 0 ? '' : 'visibility="hidden"'} />
        <text x="${(L_CAP[0] + 170 * Math.cos(mid)).toFixed(1)}" y="${(L_CAP[1] + 170 * Math.sin(mid) + 7).toFixed(1)}" text-anchor="middle" font-size="20" fill="${INK}" fill-opacity="0.55" opacity="${prog(t, 5.4 + i * 0.45, 5.7 + i * 0.45).toFixed(3)}" style="${mono}">
          ${Math.round(share * 100)}%
        </text>
      </g>
    `;
  });

  // Data Room Slots
  L_SLOTS.forEach(({ x, y, from }, i) => {
    const s = 7.1 + i * 0.4;
    const p = prog(t, s, s + 0.8);
    const to = [x + 47, y + 68];
    const pos = quad(from, [(from[0] + to[0]) / 2, Math.min(from[1], to[1]) - 140], to, inOut(p));
    const tick = prog(t, s + 0.8, s + 1.1);

    outSvg += `<path d="M${x} ${y}h36l8 12h51v108h-95Z" ${line} stroke-width="2" stroke-opacity="0.5" ${draw(inOut(prog(t, 6.2 + i * 0.1, 6.9 + i * 0.1)))} />`;

    if (p > 0) {
      const fScale = lerp(0.8, 1, p).toFixed(3);
      outSvg += `<g transform="translate(${pt(pos)}) scale(${fScale})">`;
      if (from === L_CAP) {
        outSvg += `<circle r="17" ${line} stroke-width="2" /><path d="M0 -17A17 17 0 0 1 16.2 5.3" ${line} stroke-width="6" />`;
      } else {
        outSvg += `<rect x="-15" y="-20" width="30" height="40" rx="3" ${line} fill="#fff" stroke-width="2" /><path d="M-8 -8H8M-8 0H8M-8 8H2" ${line} stroke-width="2" stroke-opacity="0.5" />`;
      }
      outSvg += `</g>`;
    }

    if (tick > 0) {
      outSvg += `
        <g transform="translate(${x + 90} ${y + 20}) scale(${back(tick).toFixed(3)})">
          <circle r="12" fill="${ACCENT}" />
          <path d="M-5 0l3.5 4l7 -8" ${line} stroke="#fff" stroke-width="2.5" />
        </g>
      `;
    }
  });

  // Data Room Outer Frame & Padlock
  outSvg += `<rect x="860" y="120" width="360" height="330" rx="16" ${hair} ${draw(inOut(prog(t, 9.8, 10.6)))} />`;
  const shackleY = (-14 * (1 - shackle)).toFixed(1);
  outSvg += `
    <g opacity="${prog(t, 10.2, 10.5).toFixed(3)}">
      <path d="M1028 80V66A12 12 0 0 1 1052 66V80" ${line} transform="translate(0 ${shackleY})" />
      <rect x="1020" y="78" width="40" height="30" rx="6" ${line} fill="${shackle >= 1 ? INK : '#fff'}" />
    </g>
  `;

  outSvg += `</g>`;
  return outSvg;
}

// ----------------------------------------------------------------
// 2. GROWTH & BRANDING SCENE (Identidad Visual & Posicionamiento)
// ----------------------------------------------------------------
const G_YOU = [310, 150];
const G_BRAND = [540, 150];
const G_AXES = [
  ["premium", 230, 74, "middle"],
  ["accesible", 230, 402, "middle"],
  ["simple", 92, 256, "start"],
  ["experto", 368, 256, "end"],
];
const G_RIVALS = [
  [130, 130], [175, 160], [150, 195], [200, 120],
  [120, 290], [170, 310], [140, 345], [205, 335],
  [185, 280], [260, 285], [300, 325], [340, 290], [280, 350]
];
const G_CHANNELS = [110, 230, 350];
const G_SPOUT = [1080, 300];
const G_LOOP = { cx: 1082, cy: 444, rx: 172, ry: 46 };
const gSlot = (k) => [950 + k * 44, 440];
const G_WON = [0, 4, 8, 10];
const G_LEADS = Array.from({ length: 12 }, (_, i) => ({
  start: 6.3 + i * 0.18,
  from: [910, G_CHANNELS[i % 3]],
  rim: [985 + ((i * 71) % 190), 114],
  won: G_WON.indexOf(i),
}));
const G_REFERRERS = [1, 2, 3];

function renderPerson(at, color = INK, s = 1, opacity = 1) {
  return `
    <g transform="translate(${pt(at)}) scale(${s})" opacity="${opacity}">
      <circle cy="-12" r="8" fill="${color}" />
      <path d="M-13 16Q0 -4 13 16" ${line} stroke="${color}" />
    </g>
  `;
}

export function drawGrowth(t) {
  const axes = inOut(prog(t, 0.1, 0.9));
  const aim = quad([150, 300], [380, 400], G_YOU, inOut(prog(t, 0.5, 1.8)));
  const lock = prog(t, 1.8, 2.2);
  const hop = inOut(prog(t, 2.3, 2.8));
  const leads = G_LEADS.filter((l) => t >= l.start + 0.7).length;

  let outSvg = `<g opacity="${fade(t, 13).toFixed(3)}">`;

  // Market map positioning
  outSvg += `<rect x="232" y="92" width="136" height="136" fill="${ACCENT}" fill-opacity="${(0.08 * lock).toFixed(3)}" />`;
  outSvg += `<line x1="90" y1="230" x2="370" y2="230" ${hair} ${draw(axes)} />`;
  outSvg += `<line x1="230" y1="370" x2="230" y2="90" ${hair} ${draw(axes)} />`;

  G_AXES.forEach(([label, x, y, anchor]) => {
    outSvg += `<text x="${x}" y="${y}" text-anchor="${anchor}" font-size="19" fill="${INK}" fill-opacity="0.45" opacity="${prog(t, 0.5, 0.9).toFixed(3)}" style="${mono}">${label}</text>`;
  });

  G_RIVALS.forEach(([x, y], i) => {
    outSvg += `<circle cx="${x}" cy="${y}" r="6" fill="${INK}" opacity="${(0.28 * prog(t, 0.3 + i * 0.05, 0.6 + i * 0.05)).toFixed(3)}" />`;
  });

  // Crosshair
  const aimOpacity = (prog(t, 0.3, 0.6) * (1 - prog(t, 2.2, 2.5))).toFixed(3);
  outSvg += `
    <g transform="translate(${pt(aim)})" opacity="${aimOpacity}">
      <circle r="${(26 - 8 * prog(t, 1.6, 1.9)).toFixed(1)}" ${line} stroke-width="2" />
      <path d="M-42 0H-32M32 0H42M0 -42V-32M0 32V42" ${line} stroke-width="2" />
    </g>
  `;

  if (lock > 0) {
    outSvg += `<circle cx="${G_YOU[0]}" cy="${G_YOU[1]}" r="${(9 * back(lock)).toFixed(1)}" fill="${INK}" />`;
  }
  outSvg += `<text x="${G_YOU[0] + 18}" y="${G_YOU[1] - 16}" font-size="19" fill="${INK}" fill-opacity="0.55" opacity="${prog(t, 2, 2.3).toFixed(3)}" style="${mono}">tu marca</text>`;

  // Branding: monogram, logo, palette
  outSvg += `<line x1="${G_YOU[0] + 14}" y1="150" x2="490" y2="150" ${hair} stroke-dasharray="4 8" opacity="${prog(t, 2.3, 2.6).toFixed(3)}" />`;
  if (hop > 0 && hop < 1) {
    outSvg += `<circle cx="${lerp(G_YOU[0], G_BRAND[0], hop).toFixed(1)}" cy="150" r="9" fill="${INK}" />`;
  }
  outSvg += `<rect x="490" y="100" width="100" height="100" rx="22" ${line} ${draw(inOut(prog(t, 2.4, 3)))} />`;
  outSvg += `<circle cx="${G_BRAND[0]}" cy="${G_BRAND[1]}" r="24" ${line} stroke-width="2" ${draw(inOut(prog(t, 2.6, 3)))} transform="rotate(-90 ${pt(G_BRAND)})" />`;
  outSvg += `<path d="M540 126A24 24 0 0 1 564 150" ${line} stroke="${ACCENT}" stroke-width="6" ${draw(prog(t, 3, 3.3))} />`;
  outSvg += `<circle cx="${G_BRAND[0]}" cy="${G_BRAND[1]}" r="${(10 * back(prog(t, 2.8, 3.1))).toFixed(1)}" fill="${INK}" />`;
  outSvg += `<line x1="490" y1="232" x2="580" y2="232" ${line} stroke-width="6" ${draw(prog(t, 3.1, 3.4))} />`;
  outSvg += `<line x1="490" y1="254" x2="550" y2="254" ${line} stroke-width="2" stroke-opacity="0.4" ${draw(prog(t, 3.3, 3.5))} />`;

  [INK, ACCENT, "none"].forEach((fill, i) => {
    outSvg += `<circle cx="${502 + i * 38}" cy="290" r="${(12 * back(prog(t, 3.3 + i * 0.1, 3.6 + i * 0.1))).toFixed(1)}" ${fill === 'none' ? hair : `fill="${fill}"`} />`;
  });

  // Marketing Channels
  G_CHANNELS.forEach((y, i) => {
    outSvg += `<path d="M590 150C640 150 640 ${y} 690 ${y}" ${hair} stroke-opacity="0.35" ${draw(inOut(prog(t, 3.6 + i * 0.15, 4.2 + i * 0.15)))} />`;
  });

  const ICONS = [
    '<rect x="-40" y="-20" width="80" height="40" rx="20" /><circle cx="-18" cy="-2" r="8" /><path d="M-12 4l6 6" /><path d="M2 0H24" stroke-width="2" stroke-opacity="0.35" />',
    '<rect x="-40" y="-28" width="80" height="56" rx="8" /><path d="M-8 -14L14 0L-8 14Z" />',
    '<rect x="-40" y="-26" width="80" height="52" rx="6" /><path d="M-40 -26L0 4L40 -26" />'
  ];

  G_CHANNELS.forEach((y, i) => {
    outSvg += `<g transform="translate(730 ${y}) scale(${back(prog(t, 3.9 + i * 0.15, 4.3 + i * 0.15)).toFixed(3)})" ${line} fill="#fff">${ICONS[i]}</g>`;
  });

  if (t > 4.3) {
    G_CHANNELS.forEach((y, i) => {
      [0, 1].forEach((k) => {
        const u = ((t - 4.3) * 0.6 + k / 2 + i * 0.2) % 1;
        const [x, py] = cubic([590, 150], [640, 150], [640, y], [690, y], u);
        const o = (prog(t, 4.3, 4.6) * Math.sin(Math.PI * u)).toFixed(3);
        outSvg += `<circle cx="${x.toFixed(1)}" cy="${py.toFixed(1)}" r="5" fill="${ACCENT}" opacity="${o}" />`;
      });
    });
  }

  // Content creation posts
  G_CHANNELS.forEach((y, i) => {
    const s = 4.8 + i * 0.3;
    outSvg += `
      <g>
        <line x1="770" y1="${y}" x2="800" y2="${y}" ${hair} ${draw(prog(t, s - 0.1, s + 0.1))} />
        <rect x="800" y="${y - 40}" width="110" height="80" rx="8" ${line} stroke-width="2" ${draw(inOut(prog(t, s, s + 0.5)))} />
        <g opacity="${prog(t, s + 0.3, s + 0.6).toFixed(3)}">
          <rect x="810" y="${y - 30}" width="42" height="34" rx="4" ${hair} stroke-opacity="0.4" />
          <path d="M814 ${y}l11 -11l8 8l6 -5l9 8" ${line} stroke-width="2" stroke-opacity="0.5" />
          <circle cx="843" cy="${y - 22}" r="3.5" fill="${ACCENT}" />
        </g>
        <path d="M862 ${y - 22}H898M862 ${y - 10}H886M810 ${y + 18}H898M810 ${y + 30}H868" ${line} stroke-width="2" stroke-opacity="0.35" ${draw(prog(t, s + 0.4, s + 0.9))} />
      </g>
    `;
  });

  // Demand Generation Funnel
  outSvg += `<path d="M960 110H1200M960 110L1060 290V330M1200 110L1100 290V330" ${line} stroke-width="2" stroke-opacity="0.5" ${draw(inOut(prog(t, 5.9, 6.6)))} />`;
  outSvg += `<text x="1024" y="250" text-anchor="end" font-size="19" fill="${INK}" fill-opacity="0.55" opacity="${prog(t, 6.4, 6.8).toFixed(3)}" style="${mono}">${leads} leads</text>`;

  G_LEADS.forEach(({ start, from, rim, won }) => {
    const e = t - start;
    if (e < 0 || e > (won >= 0 ? 1.7 : 1.2)) return;
    let pos;
    let o = prog(e, 0, 0.2);
    if (e < 0.7) {
      pos = quad(from, [(from[0] + rim[0]) / 2, 40], rim, inOut(prog(e, 0, 0.7)));
    } else if (e < 1.2) {
      pos = mix(rim, G_SPOUT, inOut(prog(e, 0.7, 1.2)));
      if (won < 0) o = 1 - prog(e, 0.8, 1.1);
    } else {
      pos = quad(G_SPOUT, [1080, 380], [gSlot(won)[0], 428], inOut(prog(e, 1.2, 1.7)));
    }
    outSvg += `<circle cx="${pos[0].toFixed(1)}" cy="${pos[1].toFixed(1)}" r="7" fill="${INK}" opacity="${o.toFixed(3)}" />`;
  });

  G_WON.forEach((idxWon, k) => {
    const s = back(prog(t, G_LEADS[idxWon].start + 1.7, G_LEADS[idxWon].start + 2));
    if (s > 0) {
      outSvg += renderPerson(gSlot(k), INK, s);
    }
  });

  // Retention Loop
  outSvg += `<ellipse cx="${G_LOOP.cx}" cy="${G_LOOP.cy}" rx="${G_LOOP.rx}" ry="${G_LOOP.ry}" ${hair} ${draw(inOut(prog(t, 9.8, 10.5)))} />`;
  outSvg += `<path d="M${G_LOOP.cx + G_LOOP.rx - 8} ${G_LOOP.cy - 6}l8 10l8 -10" ${line} stroke-width="2" stroke-opacity="0.4" opacity="${prog(t, 10.4, 10.7).toFixed(3)}" />`;

  [0, 1].forEach((k) => {
    const theta = (t - 10) * 1.4 + k * Math.PI;
    const cx = (G_LOOP.cx + G_LOOP.rx * Math.cos(theta)).toFixed(1);
    const cy = (G_LOOP.cy + G_LOOP.ry * Math.sin(theta)).toFixed(1);
    outSvg += `<circle cx="${cx}" cy="${cy}" r="5" fill="${INK}" opacity="${prog(t, 10.4, 10.7).toFixed(3)}" />`;
  });

  G_REFERRERS.forEach((k, j) => {
    const start = 10.2 + j * 0.35;
    const ping = prog(t, start, start + 0.6);
    const p = prog(t, start + 0.3, start + 1);
    if (ping <= 0) return;
    const from = gSlot(k);
    const to = gSlot(4 + j);
    if (ping < 1) {
      outSvg += `<circle cx="${from[0]}" cy="${from[1] - 12}" r="${(10 + 24 * out(ping)).toFixed(1)}" ${line} stroke="${ACCENT}" stroke-width="2" stroke-opacity="${(0.7 * (1 - ping)).toFixed(3)}" />`;
    }
    if (p > 0) {
      const pPos = quad(from, [(from[0] + to[0]) / 2, 350], to, inOut(p));
      outSvg += renderPerson(pPos, ACCENT, lerp(0.6, 1, p), prog(t, start + 0.3, start + 0.5));
    }
  });

  outSvg += `</g>`;
  return outSvg;
}

// ----------------------------------------------------------------
// 3. TECHNOLOGY SCENE (Desarrollo Headless & E-Commerce)
// ----------------------------------------------------------------
const T_WIRES = [
  [[470, 60], [520, 10], [960, 10], [1000, 100]],
  [[790, 240], [840, 240], [850, 222], [900, 222]],
  [[540, 380], [620, 470], [840, 430], [900, 312]],
];
const T_SPARK = [240, 232, 236, 220, 224, 205, 210, 190, 184, 170].map((y, i) => [140 + i * (350 / 9), y]);

export function drawTechnology(t) {
  const auto = t >= 8.8 ? Math.floor((t - 8.8) * 2) % 3 : -1;
  const sparkEnd = prog(t, 8.3, 8.6);

  let outSvg = `<g opacity="${fade(t, 12).toFixed(3)}">`;

  // Desktop browser frame
  outSvg += `<rect x="90" y="60" width="450" height="350" rx="14" ${line} ${draw(inOut(prog(t, 0.2, 1.2)))} />`;
  outSvg += `<line x1="90" y1="100" x2="540" y2="100" ${hair} ${draw(prog(t, 0.9, 1.3))} />`;
  [116, 136, 156].forEach((x, i) => {
    outSvg += `<circle cx="${x}" cy="80" r="5" fill="${INK}" opacity="${(0.3 * prog(t, 1 + i * 0.08, 1.2 + i * 0.08)).toFixed(3)}" />`;
  });
  outSvg += `<path d="M120 126H200M400 126H430M445 126H475M490 126H510" ${line} stroke-width="2" stroke-opacity="0.5" ${draw(prog(t, 1.1, 1.6))} />`;
  outSvg += `<rect x="120" y="150" width="390" height="120" rx="8" ${hair} ${draw(inOut(prog(t, 1.2, 1.8)))} />`;
  [120, 256, 392].forEach((x, i) => {
    outSvg += `<rect x="${x}" y="290" width="118" height="90" rx="8" ${hair} ${draw(inOut(prog(t, 1.6 + i * 0.2, 2.2 + i * 0.2)))} />`;
  });

  // Mobile App Frame
  outSvg += `<rect x="620" y="70" width="170" height="340" rx="26" ${line} ${draw(inOut(prog(t, 2.2, 3.2)))} />`;
  outSvg += `<line x1="680" y1="90" x2="730" y2="90" ${line} stroke-opacity="0.5" ${draw(prog(t, 3, 3.3))} />`;
  [0, 1, 2, 3, 4].forEach((i) => {
    const y = 128 + i * 52;
    const p = out(prog(t, 2.8 + i * 0.22, 3.3 + i * 0.22));
    outSvg += `
      <g opacity="${p.toFixed(3)}" transform="translate(${((1 - p) * 12).toFixed(1)} 0)">
        <circle cx="650" cy="${y}" r="11" ${hair} />
        <path d="M672 ${y - 5}H745M672 ${y + 8}H720" ${line} stroke-width="2" stroke-opacity="0.35" />
        <path d="M757 ${y}l5 5l10 -10" ${line} stroke="${ACCENT}" ${draw(prog(t, 9 + i * 0.3, 9.25 + i * 0.3))} />
      </g>
    `;
  });

  // Ops Stack cards
  [100, 190, 280].forEach((y, i) => {
    const p = out(prog(t, 4 + i * 0.35, 4.6 + i * 0.35));
    const isLit = auto === i;
    outSvg += `
      <g opacity="${p.toFixed(3)}" transform="translate(0 ${(-(1 - p) * 50).toFixed(1)})">
        <rect x="900" y="${y}" width="290" height="64" rx="12" ${line} fill="#fff" />
        <circle cx="926" cy="${y + 32}" r="7" fill="${isLit ? ACCENT : INK}" fill-opacity="${isLit ? 1 : 0.3}" />
        <path d="M950 ${y + 26}H1080M950 ${y + 40}H1030" ${line} stroke-width="2" stroke-opacity="0.35" />
      </g>
    `;
  });

  // Wires & data packets
  T_WIRES.forEach((c, i) => {
    outSvg += `<path d="M${pt(c[0])}C${pt(c[1])} ${pt(c[2])} ${pt(c[3])}" ${hair} stroke-opacity="0.35" ${draw(inOut(prog(t, 5.4 + i * 0.2, 6.2 + i * 0.2)))} />`;
  });

  if (t > 6.2) {
    T_WIRES.forEach((c, i) => {
      [0, 1, 2].forEach((k) => {
        let u = ((t - 6.2) * 0.4 + k / 3 + i * 0.11) % 1;
        if (i === 1) u = 1 - u;
        const [x, y] = cubic(c[0], c[1], c[2], c[3], u);
        const op = (prog(t, 6.2, 6.6) * Math.sin(Math.PI * u)).toFixed(3);
        outSvg += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="6" fill="${ACCENT}" opacity="${op}" />`;
      });
    });
  }

  // Analytics Sparkline Chart
  outSvg += `<line x1="140" y1="252" x2="490" y2="252" ${hair} stroke-dasharray="4 8" opacity="${prog(t, 6.8, 7.2).toFixed(3)}" />`;
  outSvg += `<polyline points="${T_SPARK.map(pt).join(' ')}" ${line} ${draw(inOut(prog(t, 7, 8.4)))} />`;

  if (sparkEnd > 0) {
    const pulseRad = (7 + ((t * 18) % 22)).toFixed(1);
    const pulseOp = (0.5 * (1 - ((t * 18) % 22) / 22)).toFixed(3);
    outSvg += `
      <circle cx="${T_SPARK[9][0]}" cy="${T_SPARK[9][1]}" r="${(7 * back(sparkEnd)).toFixed(1)}" fill="${ACCENT}" />
      <circle cx="${T_SPARK[9][0]}" cy="${T_SPARK[9][1]}" r="${pulseRad}" ${line} stroke="${ACCENT}" stroke-width="2" stroke-opacity="${pulseOp}" />
    `;
  }

  // Automation Gear
  outSvg += `
    <circle cx="1045" cy="430" r="26" ${line} stroke-width="2" stroke-dasharray="12 9" opacity="${prog(t, 8.8, 9.2).toFixed(3)}" transform="rotate(${(t * 90).toFixed(1)} 1045 430)" />
    <circle cx="1045" cy="430" r="6" fill="${ACCENT}" opacity="${prog(t, 8.8, 9.2).toFixed(3)}" />
  `;

  outSvg += `</g>`;
  return outSvg;
}

// ----------------------------------------------------------------
// 4. AI & AUTOMATION SCENE (IA, Funnels & Escala Comercial)
// ----------------------------------------------------------------
const A_AGENT = [600, 270];
const A_FEED = [410, 323];
const A_TOOLS = [[850, 120], [850, 270], [850, 420]];
const A_DONE = [1110, 330];
const A_TEAM = [1110, 110];
const A_SEG = 0.5;
const A_PROMPT = "> triage inbound leads";
const A_DATA = Array.from({ length: 16 }, (_, i) => ({
  from: [100 + ((i * 97) % 280), 210 + ((i * 53) % 240)],
  to: [130 + (i % 4) * 80, 230 + Math.floor(i / 4) * 62],
}));
const A_TOKENS = Array.from({ length: 14 }, (_, k) => {
  const rare = k % 5 === 3;
  const b = [1, 0, 2, 1, 2, 0][k % 6];
  const next = b === 2 ? 1 : b + 1;
  const path = rare
    ? [A_FEED, A_AGENT, A_TOOLS[0], A_TEAM]
    : k % 4 === 1
    ? [A_FEED, A_AGENT, A_TOOLS[b], A_TOOLS[next], A_DONE]
    : [A_FEED, A_AGENT, A_TOOLS[b], A_DONE];
  const start = 4.8 + k * 0.4;
  return { rare, path, start, end: start + (path.length - 1) * A_SEG };
});

export function drawEnablement(t) {
  const typed = Math.floor(prog(t, 0.4, 2) * A_PROMPT.length);
  const cursor = t < 2.8 && (t * 2) % 1 < 0.5 ? "_" : "";
  const handled = A_TOKENS.filter((k) => !k.rare && k.end <= t).length;
  const lastDone = Math.max(-1, ...A_TOKENS.filter((k) => !k.rare && k.end <= t).map((k) => k.end));
  const lastUp = Math.max(-1, ...A_TOKENS.filter((k) => k.rare && k.end <= t).map((k) => k.end));
  const doneFlash = prog(t, lastDone, lastDone + 0.5);
  const upFlash = prog(t, lastUp, lastUp + 0.7);
  const edges = inOut(prog(t, 3.6, 4.4));
  const exits = inOut(prog(t, 4.1, 4.8));

  let outSvg = `<g opacity="${fade(t, 12).toFixed(3)}">`;

  // Prompt systems
  outSvg += `<rect x="80" y="80" width="356" height="76" rx="12" ${line} ${draw(inOut(prog(t, 0.1, 0.7)))} />`;
  outSvg += `<text x="102" y="126" font-size="21" fill="${INK}" style="${mono}">${A_PROMPT.slice(0, typed)}${cursor}</text>`;

  // Data Records Matrix
  A_DATA.forEach(({ from, to }, i) => {
    const [x, y] = mix(from, to, inOut(prog(t, 1.8 + i * 0.04, 2.8 + i * 0.04)));
    outSvg += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="6" fill="${INK}" opacity="${(0.5 * prog(t, 1.1 + i * 0.03, 1.5 + i * 0.03)).toFixed(3)}" />`;
  });

  outSvg += `<path d="M436 118L${pt(A_AGENT)}M${pt(A_FEED)}L${pt(A_AGENT)}" ${hair} ${draw(prog(t, 2.8, 3.5))} />`;

  A_TOOLS.forEach((p) => {
    outSvg += `<line x1="${A_AGENT[0]}" y1="${A_AGENT[1]}" x2="${p[0]}" y2="${p[1]}" ${hair} ${draw(edges)} />`;
    outSvg += `<line x1="${p[0]}" y1="${p[1]}" x2="${A_DONE[0]}" y2="${A_DONE[1]}" ${hair} ${draw(exits)} />`;
  });

  outSvg += `<line x1="850" y1="120" x2="850" y2="420" ${hair} stroke-dasharray="3 9" opacity="${exits.toFixed(3)}" />`;
  outSvg += `<line x1="${A_TOOLS[0][0]}" y1="${A_TOOLS[0][1]}" x2="${A_TEAM[0] - 36}" y2="${A_TEAM[1]}" ${hair} ${draw(exits)} />`;

  // AI Agent Core
  outSvg += `<circle cx="${A_AGENT[0]}" cy="${A_AGENT[1]}" r="38" ${line} fill="#fff" ${draw(inOut(prog(t, 2.6, 3.2)))} />`;
  outSvg += `<circle cx="${A_AGENT[0]}" cy="${A_AGENT[1]}" r="54" ${line} stroke-width="2" stroke-dasharray="4 12" opacity="${(0.5 * prog(t, 3, 3.4)).toFixed(3)}" transform="rotate(${(t * 40).toFixed(1)} ${pt(A_AGENT)})" />`;
  outSvg += `<circle cx="${A_AGENT[0]}" cy="${A_AGENT[1]}" r="${(8 * back(prog(t, 3, 3.3))).toFixed(1)}" fill="${INK}" />`;

  // Custom AI Tools
  const TOOL_SHAPES = [
    '<rect x="-20" y="-20" width="40" height="40" rx="6" />',
    '<rect x="-17" y="-17" width="34" height="34" rx="4" transform="rotate(45)" />',
    '<circle r="22" />'
  ];
  const TOOL_NAMES = ["qualify", "reply", "book"];

  A_TOOLS.forEach(([x, y], i) => {
    const p = back(prog(t, 3.9 + i * 0.15, 4.3 + i * 0.15));
    outSvg += `
      <g transform="translate(${x} ${y})">
        <g transform="scale(${p.toFixed(3)})" ${line} fill="#fff">
          ${TOOL_SHAPES[i]}
        </g>
        <text x="40" y="7" font-size="19" fill="${INK}" fill-opacity="0.55" opacity="${prog(t, 4.2, 4.6).toFixed(3)}" style="${mono}">
          ${TOOL_NAMES[i]}
        </text>
      </g>
    `;
  });

  // Where work lands (Done vs Team Escalation)
  const landOpacity = prog(t, 4.4, 4.8).toFixed(3);
  outSvg += `
    <g opacity="${landOpacity}">
      <circle cx="${A_DONE[0]}" cy="${A_DONE[1]}" r="26" ${line} />
      <circle cx="${A_DONE[0]}" cy="${A_DONE[1]}" r="12" fill="${INK}" />
  `;

  if (doneFlash > 0 && doneFlash < 1) {
    outSvg += `<circle cx="${A_DONE[0]}" cy="${A_DONE[1]}" r="${(26 + 20 * out(doneFlash)).toFixed(1)}" ${line} stroke-width="2" stroke-opacity="${(1 - doneFlash).toFixed(3)}" />`;
  }
  outSvg += `
      <text x="${A_DONE[0]}" y="${A_DONE[1] + 62}" font-size="19" text-anchor="middle" fill="${INK}" fill-opacity="0.55" style="${mono}">
        ${handled} handled
      </text>
      <circle cx="${A_TEAM[0]}" cy="${A_TEAM[1] - 20}" r="14" ${line} />
      <path d="M${A_TEAM[0] - 26} ${A_TEAM[1] + 24}Q${A_TEAM[0]} ${A_TEAM[1] - 14} ${A_TEAM[0] + 26} ${A_TEAM[1] + 24}" ${line} />
  `;

  if (upFlash > 0 && upFlash < 1) {
    outSvg += `<circle cx="${A_TEAM[0]}" cy="${A_TEAM[1]}" r="${(40 + 24 * out(upFlash)).toFixed(1)}" ${line} stroke="${ACCENT}" stroke-width="2" stroke-opacity="${(1 - upFlash).toFixed(3)}" />`;
  }
  outSvg += `
      <text x="${A_TEAM[0] + 44}" y="${A_TEAM[1] + 7}" font-size="19" fill="${INK}" fill-opacity="0.55" style="${mono}">
        tu equipo
      </text>
    </g>
  `;

  // Tokens flowing
  A_TOKENS.forEach(({ rare, path, start, end }) => {
    if (t < start || t > end + 0.15) return;
    const e = Math.min((t - start) / A_SEG, path.length - 1.0001);
    const i = Math.floor(e);
    const [x, y] = mix(path[i], path[i + 1], inOut(e - i));
    if (rare) {
      outSvg += `
        <g>
          <circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="12" ${line} stroke="${ACCENT}" stroke-width="2" />
          <circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="6" fill="${ACCENT}" />
        </g>
      `;
    } else {
      outSvg += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="7" fill="${INK}" />`;
    }
  });

  outSvg += `</g>`;
  return outSvg;
}

// ----------------------------------------------------------------
// SCENE REGISTRY
// ----------------------------------------------------------------
export const SCENES = {
  legal: {
    loop: 13,
    still: 11.6,
    draw: drawLegal,
    steps: [
      [0, 1.8, "Búsqueda Fonética IMPI"],
      [1.8, 3.6, "Dictamen & Contratos"],
      [3.6, 5.0, "Asignación de Marca (IP)"],
      [5.0, 7.0, "Clasificación NIZA"],
      [7.0, 9.4, "Expediente Oficial IMPI"],
      [9.4, 13.0, "Título de Concesión"],
    ],
  },
  growth: {
    loop: 13,
    still: 11.9,
    draw: drawGrowth,
    steps: [
      [0, 2.2, "Posicionamiento"],
      [2.2, 3.6, "Branding & Logo"],
      [3.6, 4.8, "Canales Digitales"],
      [4.8, 6.2, "Diseño de Contenido"],
      [6.2, 9.8, "Generación de Demanda"],
      [9.8, 13.0, "Retención & Comunidad"],
    ],
  },
  technology: {
    loop: 12,
    still: 10.6,
    draw: drawTechnology,
    steps: [
      [0, 2.4, "Sitio Web Headless"],
      [2.4, 4.2, "App & Mobile First"],
      [4.2, 5.6, "Ops Stack & Cloud"],
      [5.6, 7.1, "Integraciones & Pagos"],
      [7.1, 8.8, "Analítica & PageSpeed"],
      [8.8, 12.0, "Automatización Total"],
    ],
  },
  ai: {
    loop: 12,
    still: 10.2,
    draw: drawEnablement,
    steps: [
      [0, 2.0, "Prompt Systems"],
      [2.0, 3.6, "Estructuración de Datos"],
      [3.6, 5.0, "Agentes IA a la Medida"],
      [5.0, 7.0, "Flujos Automatizados"],
      [7.0, 8.8, "Ventas & Soporte 24/7"],
      [8.8, 12.0, "Escala con Tu Equipo"],
    ],
  },
};
