import { useEffect, useState } from 'react';
import { getAccessibilityPrefs } from './accessibility';

// Returns true when "toggleLeitor" (screen-reader optimized) is enabled
export function useSrOptimized() {
  const [srOpt, setSrOpt] = useState(() => getAccessibilityPrefs().toggleLeitor === true);
  useEffect(() => {
    const onAcc = (e) => {
      const v = e?.detail?.toggleLeitor;
      if (typeof v === 'boolean') setSrOpt(v);
      else setSrOpt(getAccessibilityPrefs().toggleLeitor === true);
    };
    window.addEventListener('jt:accessibility-updated', onAcc);
    onAcc({ detail: getAccessibilityPrefs() });
    return () => window.removeEventListener('jt:accessibility-updated', onAcc);
  }, []);
  return srOpt;
}

// Helper that returns props only if condition is true
export function srProps(enabled, props) {
  return enabled ? props : {};
}
