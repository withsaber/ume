import React from 'react';

/* ---------- Button ---------- */
export type ButtonVariant = 'primary' | 'accent' | 'secondary' | 'ghost' | 'danger' | 'danger-solid';
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: 'sm' | 'md';
}
export function Button({ variant = 'primary', size = 'md', className = '', ...rest }: ButtonProps) {
  return <button className={`ume-btn ume-btn--${variant} ume-btn--${size} ${className}`.trim()} {...rest} />;
}

/* ---------- IconButton ---------- */
export type IconButtonVariant = 'primary' | 'accent' | 'secondary' | 'ghost' | 'danger';
export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: IconButtonVariant;
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
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
  checked: boolean;
  onChange: (checked: boolean) => void;
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
