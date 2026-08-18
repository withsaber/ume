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

/* ---------- Banner ---------- */
export type BannerTone = 'neutral' | 'info' | 'success' | 'warning' | 'danger' | 'accent';
export interface BannerCTA { label: string; onClick?: () => void }
export interface BannerProps {
  label: string;
  tone?: BannerTone;
  icon?: React.ReactNode;
  ctas?: BannerCTA[];
}
export function Banner({ label, tone = 'neutral', icon, ctas = [] }: BannerProps) {
  return (
    <div className={`ume-banner${tone !== 'neutral' ? ` ume-banner--${tone}` : ''}`} role="status">
      {icon && <span className="ume-banner__icon">{icon}</span>}
      <span className="ume-banner__label">{label}</span>
      {ctas.length > 0 && (
        <span className="ume-banner__ctas">
          {ctas.map((c, i) => (
            <button key={i} className="ume-banner__cta" onClick={c.onClick}>{c.label}</button>
          ))}
        </span>
      )}
    </div>
  );
}

/* ---------- ButtonGroup ---------- */
export interface ButtonGroupProps {
  children: React.ReactNode;
  fullWidth?: boolean;
  stacked?: boolean;
}
export function ButtonGroup({ children, fullWidth, stacked }: ButtonGroupProps) {
  return (
    <div
      className={`ume-buttongroup${fullWidth ? ' ume-buttongroup--full' : ''}${stacked ? ' ume-buttongroup--stacked' : ''}`}
      role="group"
    >
      {children}
    </div>
  );
}
export interface ButtonGroupItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  destructive?: boolean;
  icon?: React.ReactNode;
}
export function ButtonGroupItem({ label, destructive, icon, ...rest }: ButtonGroupItemProps) {
  return (
    <button className={`ume-buttongroup__item${destructive ? ' ume-buttongroup__item--destructive' : ''}`} {...rest}>
      {icon}
      {label}
    </button>
  );
}

/* ---------- CircularProgress ---------- */
export interface CircularProgressProps {
  progress?: number;
  spinner?: boolean;
  size?: number;
  strokeWidth?: number;
}
export function CircularProgress({ progress, spinner, size = 32, strokeWidth = 3 }: CircularProgressProps) {
  const r = (size - strokeWidth) / 2;
  const c = 2 * Math.PI * r;
  const clamped = Math.max(0, Math.min(100, progress ?? 0));
  const offset = spinner ? c * 0.72 : c * (1 - clamped / 100);
  return (
    <span
      className={`ume-cprogress${spinner ? ' ume-cprogress--spinner' : ''}`}
      role="progressbar"
      aria-valuenow={spinner ? undefined : clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size}>
        <circle className="ume-cprogress__track" cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={strokeWidth} />
        <circle
          className="ume-cprogress__bar"
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={strokeWidth}
          strokeDasharray={c}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
    </span>
  );
}

/* ---------- Dropdown ---------- */
export interface DropdownProps {
  open: boolean;
  children: React.ReactNode;
  className?: string;
}
export function Dropdown({ open, children, className = '' }: DropdownProps) {
  if (!open) return null;
  return (
    <div className={`ume-dropdown ${className}`.trim()} role="menu">
      {children}
    </div>
  );
}
export interface DropdownItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  icon?: React.ReactNode;
  destructive?: boolean;
  end?: React.ReactNode;
}
export function DropdownItem({ label, icon, destructive, end, children, ...rest }: DropdownItemProps) {
  return (
    <button
      className={`ume-dropdown-item${destructive ? ' ume-dropdown-item--danger' : ''}`}
      role="menuitem"
      {...rest}
    >
      {icon && <span className="ume-dropdown-item__icon">{icon}</span>}
      {children || label}
      {end && <span className="ume-dropdown-item__end">{end}</span>}
    </button>
  );
}

/* ---------- IconText ---------- */
export interface IconTextProps {
  label: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  filled?: boolean;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}
export function IconText({ label, startIcon, endIcon, filled, disabled, onClick }: IconTextProps) {
  const cls = `ume-icontext${filled ? ' ume-icontext--filled' : ''}`;
  const inner = (
    <>
      {startIcon && <span className="ume-icontext__icon">{startIcon}</span>}
      {label}
      {endIcon && <span className="ume-icontext__icon">{endIcon}</span>}
    </>
  );
  if (onClick) {
    return (
      <button className={cls} onClick={onClick} disabled={disabled}>
        {inner}
      </button>
    );
  }
  return <span className={cls}>{inner}</span>;
}

/* ---------- ThemeProvider ---------- */
export type UmeTheme = 'light' | 'dark';
export function UmeProvider({ theme = 'light', children }: { theme?: UmeTheme; children: React.ReactNode }) {
  return (
    <div className="ume-root" data-ume-theme={theme}>
      {children}
    </div>
  );
}
