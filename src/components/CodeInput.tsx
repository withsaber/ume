import React from 'react';
import './codeinput.css';

/* ---------- CodeInput (one-time code / OTP) ---------- */
export interface CodeInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  onComplete?: (value: string) => void;
  disabled?: boolean;
  error?: boolean | string;
  masked?: boolean;
  autoFocus?: boolean;
  className?: string;
  'aria-label'?: string;
}
export function CodeInput({
  length = 6,
  value,
  onChange,
  onComplete,
  disabled = false,
  error,
  masked = false,
  autoFocus = false,
  className = '',
  'aria-label': ariaLabel = 'One-time code',
}: CodeInputProps) {
  const inputsRef = React.useRef<Array<HTMLInputElement | null>>([]);
  // Mirror of the latest committed value. Updated synchronously in commit() so
  // fast typing (several keystrokes before React re-renders) never reads a stale prop.
  const valueRef = React.useRef(value);
  valueRef.current = value;
  const chars = Array.from({ length }, (_, i) => valueRef.current[i] ?? '');

  const focusCell = (i: number) => {
    const clamped = Math.max(0, Math.min(length - 1, i));
    const el = inputsRef.current[clamped];
    if (el) {
      el.focus();
      el.select();
    }
  };

  const commit = (next: string) => {
    const wasComplete = valueRef.current.length === length;
    valueRef.current = next;
    onChange(next);
    if (!wasComplete && next.length === length) onComplete?.(next);
  };

  const handleChange = (i: number, raw: string) => {
    const ch = raw.slice(-1);
    if (!ch) return;
    const v = valueRef.current;
    commit((v.slice(0, i) + ch + v.slice(i + 1)).slice(0, length));
    if (i < length - 1) focusCell(i + 1);
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    const v = valueRef.current;
    if (e.key === 'Backspace') {
      e.preventDefault();
      if (v[i]) {
        commit(v.slice(0, i) + v.slice(i + 1));
      } else if (i > 0) {
        commit(v.slice(0, i - 1));
        focusCell(i - 1);
      }
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      focusCell(i - 1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      focusCell(i + 1);
    }
  };

  const handleFocus = (i: number) => {
    // never leave a gap: redirect focus to the first empty cell
    const target = Math.min(i, valueRef.current.length);
    if (target !== i) focusCell(target);
    else inputsRef.current[i]?.select();
  };

  const handlePaste = (i: number, e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text').replace(/\s+/g, '');
    if (!text) return;
    const next = (valueRef.current.slice(0, i) + text).slice(0, length);
    commit(next);
    focusCell(Math.min(next.length, length - 1));
  };

  return (
    <div className={`ume-codeinput${error ? ' ume-codeinput--error' : ''} ${className}`.trim()}>
      <div role="group" aria-label={ariaLabel} className="ume-codeinput__cells">
        {chars.map((ch, i) => (
          <input
            key={i}
            ref={(el) => { inputsRef.current[i] = el; }}
            type={masked ? 'password' : 'text'}
            className={`ume-codeinput__cell${ch ? ' ume-codeinput__cell--filled' : ''}`}
            value={ch}
            maxLength={1}
            disabled={disabled}
            autoFocus={autoFocus && i === 0}
            autoComplete={i === 0 ? 'one-time-code' : 'off'}
            aria-label={`Character ${i + 1} of ${length}`}
            aria-invalid={!!error || undefined}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onFocus={() => handleFocus(i)}
            onPaste={(e) => handlePaste(i, e)}
          />
        ))}
      </div>
      {typeof error === 'string' && (
        <span className="ume-field__helper ume-field__helper--error">{error}</span>
      )}
    </div>
  );
}
