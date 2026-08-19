import { useEffect } from 'react';
import type React from 'react';

/* ---------- useOnClickOutside ---------- */
/** Calls handler when a pointer down happens outside ref.current. */
export function useOnClickOutside(
  ref: React.RefObject<HTMLElement>,
  handler: (e: MouseEvent | TouchEvent) => void,
  active = true
) {
  useEffect(() => {
    if (!active) return;
    const listener = (e: MouseEvent | TouchEvent) => {
      const el = ref.current;
      if (!el || !(e.target instanceof Node) || el.contains(e.target)) return;
      handler(e);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler, active]);
}

/* ---------- useOnEscapePress ---------- */
/** Calls handler when the Escape key is pressed. */
export function useOnEscapePress(handler: () => void, active = true) {
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handler();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [handler, active]);
}
