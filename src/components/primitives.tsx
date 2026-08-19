import React from 'react';
import { Icon, UmeIconName } from './Icon';

/* ---------- Button ---------- */
export type ButtonVariant = 'primary' | 'accent' | 'secondary' | 'ghost' | 'danger' | 'danger-solid';
export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  variant?: ButtonVariant;
  size?: 'sm' | 'md';
  children?: React.ReactNode;
}
export function Button({ variant = 'primary', size = 'md', className = '', ...rest }: ButtonProps) {
  return <button className={`ume-btn ume-btn--${variant} ume-btn--${size} ${className}`.trim()} {...rest} />;
}

/* ---------- IconButton ---------- */
export type IconButtonVariant = 'primary' | 'accent' | 'secondary' | 'ghost' | 'danger';
export interface IconButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  label: string;
  variant?: IconButtonVariant;
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
}
export function IconButton({ label, variant = 'secondary', size = 'md', className = '', ...rest }: IconButtonProps) {
  return (
    <button
      aria-label={label}
      className={`ume-iconbtn ume-iconbtn--${variant} ume-iconbtn--${size} ${className}`.trim()}
      {...rest}
    />
  );
}

/* ---------- Input ---------- */
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  helperText?: string;
  error?: string;
  startAdornment?: React.ReactNode;
}
export function Input({ label, helperText, error, startAdornment, id, ...rest }: InputProps) {
  const inputId = id || React.useId();
  const field = (
    <div className={`ume-input${error ? ' ume-input--error' : ''}`}>
      {startAdornment}
      <input id={inputId} aria-invalid={!!error} {...rest} />
    </div>
  );
  if (!label && !helperText && !error) return field;
  return (
    <div className="ume-field">
      {label && <label className="ume-field__label" htmlFor={inputId}>{label}</label>}
      {field}
      {(error || helperText) && (
        <span className={`ume-field__helper${error ? ' ume-field__helper--error' : ''}`}>{error || helperText}</span>
      )}
    </div>
  );
}

/* ---------- Toggle ---------- */
export interface ToggleProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
}
export function Toggle({ checked, onChange, disabled, label }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      className="ume-toggle"
      onClick={() => onChange(!checked)}
    />
  );
}

/* ---------- Tabs ---------- */
export interface TabItem { id: string; label: string }
export interface TabsProps {
  tabs: TabItem[];
  active: string;
  onChange: (id: string) => void;
}
export function Tabs({ tabs, active, onChange }: TabsProps) {
  return (
    <div className="ume-tabs" role="tablist">
      {tabs.map((t) => (
        <button
          key={t.id}
          role="tab"
          aria-selected={t.id === active}
          className={`ume-tab${t.id === active ? ' ume-tab--active' : ''}`}
          onClick={() => onChange(t.id)}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

/* ---------- Divider ---------- */
export function Divider() {
  return <hr className="ume-divider" />;
}

/* ---------- Skeleton ---------- */
export interface SkeletonProps { width?: number | string; height?: number | string }
export function Skeleton({ width = '100%', height = 14 }: SkeletonProps) {
  return <div className="ume-skeleton" style={{ width, height }} aria-hidden="true" />;
}

/* ---------- Progress ---------- */
export interface ProgressProps { value: number }
export function Progress({ value }: ProgressProps) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div className="ume-progress" role="progressbar" aria-valuenow={clamped} aria-valuemin={0} aria-valuemax={100}>
      <div className="ume-progress__bar" style={{ width: `${clamped}%` }} />
    </div>
  );
}

/* ---------- Badge ---------- */
export type BadgeTone = 'neutral'|'success'|'warning'|'danger'|'info'|'plum'|'blue';
export type BadgeVariant = 'solid'|'soft'|'outline'|'dot';
export interface BadgeProps {
  label: string;
  tone?: BadgeTone;
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  icon?: UmeIconName;
  anchor?: boolean;
}
export function Badge({ label, tone = 'neutral', variant = 'soft', size = 'md', icon, anchor }: BadgeProps) {
  const inner = icon ? <><Icon name={icon} size={12} />{label}</> : label;
  return (
    <span className={`ume-badge ume-badge--${tone} ume-badge--${variant} ume-badge--${size}${anchor ? ' ume-badge--anchor' : ''}`}>
      {inner}
    </span>
  );
}

/* ---------- Breadcrumb ---------- */
export interface Crumb { label: string; href?: string }
export function Breadcrumb({ items, separator = '/' }: { items: Crumb[]; separator?: string }) {
  return (
    <nav className="ume-breadcrumb" aria-label="Breadcrumb">
      {items.map((c, i) => {
        const isLast = i === items.length - 1;
        const cls = `ume-breadcrumb__item${isLast ? ' ume-breadcrumb__item--current' : ''}`;
        return (
          <span key={i} className="ume-breadcrumb__crumb">
            {c.href && !isLast ? (
              <a className={cls} href={c.href}>{c.label}</a>
            ) : (
              <span className={cls}>{c.label}</span>
            )}
            {!isLast && <span className="ume-breadcrumb__sep" aria-hidden="true">{separator}</span>}
          </span>
        );
      })}
    </nav>
  );
}

/* ---------- Filter ---------- */
export interface FilterOption { value: string; label: string }
export interface FilterProps {
  label: string;
  options: FilterOption[];
  value?: string;
  onChange?: (value: string) => void;
}
export function Filter({ label, options, value, onChange }: FilterProps) {
  return (
    <div className="ume-filter">
      <span className="ume-filter__label">{label}</span>
      <button className="ume-filter__trigger" aria-haspopup="listbox">
        <span>{options.find((o) => o.value === value)?.label ?? options[0]?.label}</span>
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m4 6 4 4 4-4" />
        </svg>
      </button>
    </div>
  );
}

/* ---------- Checklist ---------- */
export interface ChecklistItem { id: string; label: string; checked?: boolean; helper?: string; disabled?: boolean }
export function Checklist({ items, onToggle }: { items: ChecklistItem[]; onToggle?: (id: string) => void }) {
  return (
    <ul className="ume-checklist">
      {items.map((it) => (
        <li key={it.id} className={`ume-checklist__item${it.checked ? ' ume-checklist__item--checked' : ''}${it.disabled ? ' ume-checklist__item--disabled' : ''}`}>
          <label className="ume-checklist__row">
            <input
              type="checkbox"
              className="ume-checklist__cb"
              defaultChecked={it.checked}
              disabled={it.disabled}
              onChange={() => onToggle?.(it.id)}
            />
            <span className="ume-checklist__cb-box" aria-hidden="true">
              <svg viewBox="0 0 16 16" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m3 8 3.5 3.5L13 5" />
              </svg>
            </span>
            <span className="ume-checklist__body">
              <span className="ume-checklist__label">{it.label}</span>
              {it.helper && <span className="ume-checklist__helper">{it.helper}</span>}
            </span>
          </label>
        </li>
      ))}
    </ul>
  );
}
