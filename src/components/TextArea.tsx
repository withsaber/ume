import React from 'react';
import './textarea.css';

/* ---------- TextArea ---------- */
export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
}
export function TextArea({ label, helperText, error, id, rows = 3, className = '', ...rest }: TextAreaProps) {
  const textareaId = id || React.useId();
  const field = (
    <textarea
      id={textareaId}
      rows={rows}
      aria-invalid={!!error}
      className={`ume-textarea${error ? ' ume-textarea--error' : ''} ${className}`.trim()}
      {...rest}
    />
  );
  if (!label && !helperText && !error) return field;
  return (
    <div className="ume-field">
      {label && <label className="ume-field__label" htmlFor={textareaId}>{label}</label>}
      {field}
      {(error || helperText) && (
        <span className={`ume-field__helper${error ? ' ume-field__helper--error' : ''}`}>{error || helperText}</span>
      )}
    </div>
  );
}
