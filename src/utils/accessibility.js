// Utilities to persist and apply accessibility preferences across the dashboard

const ACCESS_KEY = 'jt-accessibility';

// Default preferences
const defaultPrefs = {
  altoContraste: false,
  dislexico: false,
  focoVisivel: true,
  feedbackSonoro: false,
  toggleLeitor: false, // screen reader optimized / reduced motion
  // Cursor personalizado
  cursorEnabled: false,
  cursorSize: 'medium', // 'small' | 'medium' | 'large'
  cursorColor: '#00e0ff', // hex; can be provided as rgb also
};

export function getAccessibilityPrefs() {
  if (typeof window === 'undefined') return { ...defaultPrefs };
  try {
    const raw = window.localStorage.getItem(ACCESS_KEY);
    if (!raw) return { ...defaultPrefs };
    const parsed = JSON.parse(raw);
    return { ...defaultPrefs, ...parsed };
  } catch {
    return { ...defaultPrefs };
  }
}

export function setAccessibilityPrefs(prefs) {
  try { window.localStorage.setItem(ACCESS_KEY, JSON.stringify(prefs)); } catch {}
  applyAccessibility(prefs);
}

// Web Audio simple tones for success/error feedback
export function playFeedback(type = 'success') {
  const prefs = getAccessibilityPrefs();
  if (!prefs.feedbackSonoro) return;
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = 'sine';
    o.frequency.value = type === 'error' ? 220 : 880; // low for error, high for success
    o.connect(g);
    g.connect(ctx.destination);
    g.gain.setValueAtTime(0.0001, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.25);
    o.start();
    o.stop(ctx.currentTime + 0.3);
  } catch {
    // ignore if AudioContext is not available
  }
}

export function applyAccessibility(p) {
  if (typeof document === 'undefined') return;
  const prefs = p || getAccessibilityPrefs();
  const body = document.body;
  if (!body) return;

  // Toggle classes on <body>
  body.classList.toggle('high-contrast', !!prefs.altoContraste);
  body.classList.toggle('dyslexic-font', !!prefs.dislexico);
  body.classList.toggle('focus-visible-mode', !!prefs.focoVisivel);
  body.classList.toggle('sound-feedback', !!prefs.feedbackSonoro);
  body.classList.toggle('sr-optimized', !!prefs.toggleLeitor);

  // Cursor personalizado via CSS cursor URL (mantém comportamento nativo)
  const enableCursor = !!prefs.cursorEnabled;
  if (enableCursor) {
    applyCustomCursor(prefs);
  } else {
    removeCustomCursor();
  }

  // Broadcast a custom event so components could react if needed
  try {
    const evt = new CustomEvent('jt:accessibility-updated', { detail: { ...prefs } });
    window.dispatchEvent(evt);
  } catch {}
}

export function initAccessibility() {
  // Apply once on startup
  applyAccessibility();
  if (typeof window !== 'undefined') {
    window.addEventListener('storage', (e) => {
      if (e.key === ACCESS_KEY) applyAccessibility();
    });
  }
}

// ---------- Custom Cursor Implementation (CSS cursor URL) ----------
function applyCustomCursor(prefs) {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  // Evitar em dispositivos touch (pointer: coarse)
  try {
    const m = window.matchMedia('(pointer: coarse)');
    if (m && m.matches) { removeCustomCursor(); return; }
  } catch {}

  const body = document.body;
  if (!body) return;

  const color = normalizeColor(prefs.cursorColor || defaultPrefs.cursorColor);
  const sizeKey = (prefs.cursorSize || 'medium');
  const sizeMap = { small: 16, medium: 24, large: 32 }; // 32px seguro p/ Firefox
  const dim = sizeMap[sizeKey] || sizeMap.medium;

  const arrow = buildCursorDataUrl('arrow', color, dim);
  const hand = buildCursorDataUrl('hand', color, dim);

  body.classList.add('custom-cursor');
  body.style.setProperty('--jt-cursor-arrow', `url("${arrow.url}")`);
  body.style.setProperty('--jt-cursor-arrow-hotspot', `${arrow.hotspotX} ${arrow.hotspotY}`);
  body.style.setProperty('--jt-cursor-hand', `url("${hand.url}")`);
  body.style.setProperty('--jt-cursor-hand-hotspot', `${hand.hotspotX} ${hand.hotspotY}`);
}

function removeCustomCursor() {
  if (typeof document === 'undefined') return;
  const body = document.body;
  if (!body) return;
  body.classList.remove('custom-cursor');
  body.style.removeProperty('--jt-cursor-arrow');
  body.style.removeProperty('--jt-cursor-arrow-hotspot');
  body.style.removeProperty('--jt-cursor-hand');
  body.style.removeProperty('--jt-cursor-hand-hotspot');
}

function normalizeColor(c) {
  if (!c) return defaultPrefs.cursorColor;
  // Permitir strings rgb(r,g,b) ou #hex; devolver como rgb(...) para consistência visual
  const s = String(c).trim();
  if (s.startsWith('#')) return hexToRgb(s);
  if (s.startsWith('rgb')) return s;
  return s; // qualquer válido será aplicado pelo CSS
}

function hexToRgb(hex) {
  let h = hex.replace('#','');
  if (h.length === 3) h = h.split('').map(ch => ch+ch).join('');
  const num = parseInt(h, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `rgb(${r}, ${g}, ${b})`;
}

function buildCursorDataUrl(type, color, size) {
  // Construir SVG simples: arrow (ponteiro) e hand (mãozinha pointer)
  // Hotspot aproximado na ponta da seta / ponta do dedo
  let svg = '';
  let hotspot = { x: 1, y: 1 };
  const stroke = 'rgba(0,0,0,0.6)';
  if (type === 'arrow') {
    // Um arrow genérico: triângulo + haste
    svg = `<?xml version="1.0" encoding="UTF-8"?><svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 32 32">
      <g>
        <path d="M3,2 L17,16 L12,16 L12,22 L9,19 L6,22 L6,16 L1,16 Z" fill="${color}" stroke="${stroke}" stroke-width="1" stroke-linejoin="round" />
      </g>
    </svg>`;
    hotspot = { x: 3, y: 3 };
  } else {
    // Hand cursor simplificado (indicador)
    svg = `<?xml version="1.0" encoding="UTF-8"?><svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 32 32">
      <g>
        <path d="M8 18c0-2 2-2 2 0v2h1v-9c0-2 2-2 2 0v9h1v-8c0-2 2-2 2 0v8h1v-6c0-2 2-2 2 0v9c0 3-2 5-5 5h-4c-3 0-6-3-6-6v-4c0-2 2-2 2 0v2h2z" fill="${color}" stroke="${stroke}" stroke-width="1" stroke-linejoin="round" />
      </g>
    </svg>`;
    hotspot = { x: 8, y: 4 };
  }
  const encoded = 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
  return { url: encoded, hotspotX: hotspot.x, hotspotY: hotspot.y };
}

export default {
  getAccessibilityPrefs,
  setAccessibilityPrefs,
  applyAccessibility,
  initAccessibility,
  playFeedback,
};
