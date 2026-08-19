import React, { useState, forwardRef } from 'react';
import { Icon, UmeIconName } from './Icon';
import './ext-inputs.css';

/* ---------- Password ---------- */
export interface PasswordProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  helper?: string;
  error?: string;
  showStrength?: boolean;
}
function passwordStrength(pw: string): 0 | 1 | 2 | 3 {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
  if (/\d/.test(pw) || /[^A-Za-z0-9]/.test(pw)) score++;
  return Math.min(3, score) as 0 | 1 | 2 | 3;
}
export const Password = forwardRef<HTMLInputElement, PasswordProps>(function Password(
  { label, helper, error, showStrength, id, className = '', ...rest },
  ref,
) {
  const [shown, setShown] = useState(false);
  const iid = id ?? `pw-${React.useId()}`;
  const pw = (rest.value ?? rest.defaultValue ?? '') as string;
  const score = showStrength ? passwordStrength(String(pw)) : null;
  const labelEl = label ? <label htmlFor={iid} className="ume-extfield__label">{label}</label> : null;
  return (
    <div className={`ume-extfield ${error ? 'ume-extfield--error' : ''} ${className}`.trim()}>
      {labelEl}
      <div className="ume-extfield__shell">
        <span className="ume-extfield__lead"><Icon name="lock" size={16} /></span>
        <input
          ref={ref}
          id={iid}
          type={shown ? 'text' : 'password'}
          className="ume-extfield__input"
          {...rest}
        />
        <button
          type="button"
          className="ume-extfield__trail"
          aria-label={shown ? 'Hide password' : 'Show password'}
          onClick={() => setShown((s) => !s)}
        >
          <Icon name={shown ? 'eye-off' : 'eye'} size={16} />
        </button>
      </div>
      {showStrength && score != null && (
        <div className="ume-extfield__strength" aria-label={`Password strength: ${score} of 3`}>
          <span className={`ume-extfield__bar ${score >= 1 ? 'is-on' : ''}`} />
          <span className={`ume-extfield__bar ${score >= 2 ? 'is-on' : ''}`} />
          <span className={`ume-extfield__bar ${score >= 3 ? 'is-on' : ''}`} />
          <span className="ume-extfield__strengthlabel">
            {score === 0 ? 'Too weak' : score === 1 ? 'Weak' : score === 2 ? 'Good' : 'Strong'}
          </span>
        </div>
      )}
      {(error || helper) && (
        <div className={`ume-extfield__help ${error ? 'ume-extfield__help--error' : ''}`}>{error || helper}</div>
      )}
    </div>
  );
});

/* ---------- PhoneInput ---------- */
export interface PhoneInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  helper?: string;
  error?: string;
  prefix?: string;
}
export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(function PhoneInput(
  { label, helper, error, prefix = '+880', id, className = '', ...rest },
  ref,
) {
  const iid = id ?? `ph-${React.useId()}`;
  return (
    <div className={`ume-extfield ${error ? 'ume-extfield--error' : ''} ${className}`.trim()}>
      {label && <label htmlFor={iid} className="ume-extfield__label">{label}</label>}
      <div className="ume-extfield__shell">
        <span className="ume-extfield__prefix">{prefix}</span>
        <input
          ref={ref}
          id={iid}
          type="tel"
          inputMode="tel"
          placeholder="1700 000 000"
          className="ume-extfield__input ume-extfield__input--mono"
          {...rest}
        />
      </div>
      {(error || helper) && (
        <div className={`ume-extfield__help ${error ? 'ume-extfield__help--error' : ''}`}>{error || helper}</div>
      )}
    </div>
  );
});

/* ---------- CardNumber ---------- */
export type CardBrand = 'visa' | 'mastercard' | 'amex' | 'discover' | 'generic';
export interface CardNumberProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  helper?: string;
  error?: string;
}
function detectBrand(digits: string): CardBrand {
  if (/^4/.test(digits)) return 'visa';
  if (/^(5[1-5]|2[2-7])/.test(digits)) return 'mastercard';
  if (/^3[47]/.test(digits)) return 'amex';
  if (/^6(011|5)/.test(digits)) return 'discover';
  return 'generic';
}
function formatCard(digits: string): string {
  const d = digits.replace(/\D/g, '').slice(0, 19);
  const groups = d.match(/.{1,4}/g) || [];
  return groups.join(' ');
}
const BRAND_COLORS: Record<CardBrand, string> = {
  visa: '#1A1F71', mastercard: '#EB001B', amex: '#2E77BB', discover: '#FF6000', generic: '#6E6E6A',
};
export const CardNumber = forwardRef<HTMLInputElement, CardNumberProps>(function CardNumber(
  { label, helper, error, id, className = '', value, defaultValue, onChange, ...rest },
  ref,
) {
  const iid = id ?? `cn-${React.useId()}`;
  const [internal, setInternal] = useState((defaultValue as string) ?? '');
  const isControlled = value !== undefined;
  const raw = isControlled ? String(value ?? '') : internal;
  const brand = detectBrand(raw.replace(/\D/g, ''));
  const formatted = formatCard(raw);
  return (
    <div className={`ume-extfield ${error ? 'ume-extfield--error' : ''} ${className}`.trim()}>
      {label && <label htmlFor={iid} className="ume-extfield__label">{label}</label>}
      <div className="ume-extfield__shell">
        <input
          ref={ref}
          id={iid}
          type="text"
          inputMode="numeric"
          autoComplete="cc-number"
          className="ume-extfield__input ume-extfield__input--mono"
          value={formatted}
          onChange={(e) => {
            const v = e.target.value;
            if (!isControlled) setInternal(v);
            onChange?.(e);
          }}
          {...rest}
        />
        <span className="ume-extfield__brand" style={{ background: BRAND_COLORS[brand] }}>
          {brand === 'generic' ? '••••' : brand.toUpperCase()}
        </span>
      </div>
      {(error || helper) && (
        <div className={`ume-extfield__help ${error ? 'ume-extfield__help--error' : ''}`}>{error || helper}</div>
      )}
    </div>
  );
});

/* ---------- ExpiryCVC (split field) ---------- */
export interface ExpiryCVCProps {
  label?: string;
  helper?: string;
  error?: string;
  expiry?: string;
  cvc?: string;
  onExpiryChange?: (v: string) => void;
  onCvcChange?: (v: string) => void;
}
function formatExpiry(v: string): string {
  const d = v.replace(/\D/g, '').slice(0, 4);
  if (d.length < 3) return d;
  return `${d.slice(0, 2)}/${d.slice(2)}`;
}
export function ExpiryCVC({ label, helper, error, expiry = '', cvc = '', onExpiryChange, onCvcChange }: ExpiryCVCProps) {
  return (
    <div className={`ume-extsplit ${error ? 'ume-extfield--error' : ''}`}>
      {label && <div className="ume-extfield__label">{label}</div>}
      <div className="ume-extsplit__row">
        <div className="ume-extfield__shell ume-extsplit__cell">
          <input
            type="text"
            inputMode="numeric"
            autoComplete="cc-exp"
            placeholder="MM/YY"
            className="ume-extfield__input ume-extfield__input--mono"
            value={expiry}
            onChange={(e) => onExpiryChange?.(formatExpiry(e.target.value))}
          />
        </div>
        <div className="ume-extfield__shell ume-extsplit__cell">
          <input
            type="text"
            inputMode="numeric"
            autoComplete="cc-csc"
            placeholder="CVC"
            maxLength={4}
            className="ume-extfield__input ume-extfield__input--mono"
            value={cvc}
            onChange={(e) => onCvcChange?.(e.target.value.replace(/\D/g, ''))}
          />
        </div>
      </div>
      {(error || helper) && (
        <div className={`ume-extfield__help ${error ? 'ume-extfield__help--error' : ''}`}>{error || helper}</div>
      )}
    </div>
  );
}
