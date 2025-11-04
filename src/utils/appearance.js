const FONT_KEY = 'jt-font';
const SIDEBAR_KEY = 'jt-sidebar';

export function getFontPref() {
  const v = typeof window !== 'undefined' ? window.localStorage.getItem(FONT_KEY) : null;
  return v === 'pequena' || v === 'media' || v === 'grande' ? v : 'media';
}

export function getSidebarPref() {
  const v = typeof window !== 'undefined' ? window.localStorage.getItem(SIDEBAR_KEY) : null;
  return v === 'detalhada' ? 'detalhada' : 'compacta';
}

export function setFontPref(v) {
  try { window.localStorage.setItem(FONT_KEY, v); } catch {}
  applyAppearance();
}

export function setSidebarPref(v) {
  try { window.localStorage.setItem(SIDEBAR_KEY, v); } catch {}
  applyAppearance();
}

export function applyAppearance() {
  if (typeof document === 'undefined') return;
  const body = document.body;
  if (!body) return;

  body.classList.remove('painel-fonte-pequena', 'painel-fonte-media', 'painel-fonte-grande');
  const font = getFontPref();
  const fontClass = font === 'pequena' ? 'painel-fonte-pequena' : font === 'grande' ? 'painel-fonte-grande' : 'painel-fonte-media';
  body.classList.add(fontClass);

  const sidebar = getSidebarPref();
  body.classList.toggle('sidebar-detalhada', sidebar === 'detalhada');

  try {
    if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
      const evt = new CustomEvent('jt:appearance-updated', { detail: { font, sidebar } });
      window.dispatchEvent(evt);
    }
  } catch {}
}

export function initAppearance() {
  applyAppearance();
  if (typeof window !== 'undefined') {
    window.addEventListener('storage', (e) => {
      if (e.key === FONT_KEY || e.key === SIDEBAR_KEY) {
        applyAppearance();
      }
    });
  }
}

export default {
  getFontPref,
  getSidebarPref,
  setFontPref,
  setSidebarPref,
  applyAppearance,
  initAppearance,
};
