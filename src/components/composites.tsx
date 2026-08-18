import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

/* ---------- Dialog ---------- */
export interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}
export function Dialog({ open, onClose, title, children, actions }: DialogProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);
  if (!open) return null;
  return createPortal(
    <div className="ume-dialog-scrim" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="ume-dialog" role="dialog" aria-modal="true" aria-label={title}>
        <h2 className="ume-dialog__title">{title}</h2>
        <p className="ume-dialog__body">{children}</p>
        {actions && <div className="ume-dialog__actions">{actions}</div>}
      </div>
    </div>,
    document.body
  );
}

/* ---------- Toast ---------- */
export interface ToastItem { id: number; message: string; actionLabel?: string; onAction?: () => void }
interface ToastContextValue { push: (message: string, opts?: { actionLabel?: string; onAction?: () => void }) => void }
const ToastContext = React.createContext<ToastContextValue>({ push: () => {} });
export const useToast = () => React.useContext(ToastContext);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const nextId = useRef(1);
  const push = useCallback((message: string, opts?: { actionLabel?: string; onAction?: () => void }) => {
    const id = nextId.current++;
    setToasts((t) => [...t, { id, message, actionLabel: opts?.actionLabel, onAction: opts?.onAction }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4000);
  }, []);
  return (
    <ToastContext.Provider value={{ push }}>
      {children}
      {createPortal(
        <div className="ume-toast-region">
          {toasts.map((t) => (
            <div key={t.id} className="ume-toast" role="status">
              <span>{t.message}</span>
              {t.actionLabel && (
                <button className="ume-toast__action" onClick={() => { t.onAction?.(); setToasts((x) => x.filter((y) => y.id !== t.id)); }}>
                  {t.actionLabel}
                </button>
              )}
            </div>
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
}

/* ---------- Avatar / Facepile ---------- */
export interface AvatarProps {
  name?: string;
  src?: string;
  size?: 'sm' | 'md' | 'lg';
}
export function Avatar({ name = '', src, size = 'md' }: AvatarProps) {
  const initials = name.split(/\s+/).map((w) => w[0]).filter(Boolean).slice(0, 2).join('').toUpperCase();
  return (
    <span className={`ume-avatar ume-avatar--${size}`} aria-label={name}>
      {src ? <img src={src} alt={name} /> : initials}
    </span>
  );
}
export function Facepile({ children }: { children: React.ReactNode }) {
  return <span className="ume-facepile">{children}</span>;
}

/* ---------- Chip ---------- */
export type ChipTone = 'neutral' | 'success' | 'warning' | 'danger' | 'info' | 'plum';
export interface ChipProps { label: string; tone?: ChipTone }
export function Chip({ label, tone = 'neutral' }: ChipProps) {
  return <span className={`ume-chip${tone !== 'neutral' ? ` ume-chip--${tone}` : ''}`}>{label}</span>;
}

/* ---------- Card ---------- */
export function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`ume-card ${className}`.trim()}>{children}</div>;
}

/* ---------- Tooltip ---------- */
export interface TooltipProps { content: string; children: React.ReactNode }
export function Tooltip({ content, children }: TooltipProps) {
  return (
    <span className="ume-tooltip-wrap">
      {children}
      <span className="ume-tooltip" role="tooltip">{content}</span>
    </span>
  );
}

/* ---------- Typography ---------- */
export function H1({ children }: { children: React.ReactNode }) { return <h1 className="ume-h1">{children}</h1>; }
export function H2({ children }: { children: React.ReactNode }) { return <h2 className="ume-h2">{children}</h2>; }
export function H3({ children }: { children: React.ReactNode }) { return <h3 className="ume-h3">{children}</h3>; }
export function Body({ children }: { children: React.ReactNode }) { return <p className="ume-body">{children}</p>; }
export function Caption({ children }: { children: React.ReactNode }) { return <p className="ume-caption">{children}</p>; }
export function Mono({ children }: { children: React.ReactNode }) { return <span className="ume-mono">{children}</span>; }

/* ---------- ThemeProvider ---------- */
export type UmeTheme = 'light' | 'dark';
export function UmeProvider({ theme = 'light', children }: { theme?: UmeTheme; children: React.ReactNode }) {
  return (
    <div className="ume-root" data-ume-theme={theme}>
      {children}
    </div>
  );
}
