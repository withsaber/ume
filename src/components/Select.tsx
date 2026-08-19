import React, { useEffect, useRef, useState } from 'react';
import { Icon } from './Icon';
import { useOnClickOutside, useOnEscapePress } from '../hooks';
import './select.css';

/* ---------- Select (designed dropdown, not native) ---------- */
export interface SelectOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  'aria-label'?: string;
}

export function Select({
  options,
  value,
  onChange,
  placeholder = 'Select...',
  disabled = false,
  className = '',
  'aria-label': ariaLabel,
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listId = React.useId();

  const selected = options.find((o) => o.value === value);
  const enabledIndexes = options.map((o, i) => (o.disabled ? -1 : i)).filter((i) => i >= 0);

  const close = (refocus = false) => {
    setOpen(false);
    setActiveIndex(-1);
    if (refocus) triggerRef.current?.focus();
  };

  useOnClickOutside(rootRef, () => close(), open);
  useOnEscapePress(() => close(true), open);

  // keep the active option visible while navigating
  useEffect(() => {
    if (!open || activeIndex < 0) return;
    rootRef.current
      ?.querySelector(`[data-select-index="${activeIndex}"]`)
      ?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex, open]);

  const openMenu = (startAt?: number) => {
    if (disabled) return;
    setOpen(true);
    setActiveIndex(
      startAt ??
        (selected ? options.indexOf(selected) : enabledIndexes[0] ?? -1)
    );
  };

  const move = (dir: 1 | -1) => {
    if (!enabledIndexes.length) return;
    setActiveIndex((i) => {
      const pos = enabledIndexes.indexOf(i);
      const next =
        pos === -1
          ? dir === 1
            ? enabledIndexes[0]
            : enabledIndexes[enabledIndexes.length - 1]
          : enabledIndexes[(pos + dir + enabledIndexes.length) % enabledIndexes.length];
      return next;
    });
  };

  const choose = (index: number) => {
    const opt = options[index];
    if (!opt || opt.disabled) return;
    onChange?.(opt.value);
    close(true);
  };

  const onTriggerKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (!open) openMenu();
      else move(e.key === 'ArrowDown' ? 1 : -1);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (!open) openMenu();
      else if (activeIndex >= 0) choose(activeIndex);
      else close(true);
    } else if (e.key === 'Tab' && open) {
      close();
    }
  };

  return (
    <div className={`ume-select${open ? ' ume-select--open' : ''}${disabled ? ' ume-select--disabled' : ''} ${className}`.trim()} ref={rootRef}>
      <button
        ref={triggerRef}
        type="button"
        className="ume-select__trigger"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={ariaLabel ? undefined : listId + '-label'}
        aria-label={ariaLabel}
        onClick={() => (open ? close(true) : openMenu())}
        onKeyDown={onTriggerKeyDown}
      >
        {selected?.icon && <span className="ume-select__icon">{selected.icon}</span>}
        <span id={listId + '-label'} className={`ume-select__value${selected ? '' : ' ume-select__value--placeholder'}`}>
          {selected ? selected.label : placeholder}
        </span>
        <Icon name="chevron-down" size={14} className="ume-select__chevron" />
      </button>
      {open && (
        <div className="ume-select__panel ume-scrollbar" role="listbox" id={listId} aria-activedescendant={activeIndex >= 0 ? `${listId}-${activeIndex}` : undefined}>
          {options.map((opt, i) => {
            const isSelected = opt.value === value;
            const isActive = i === activeIndex;
            return (
              <button
                key={opt.value}
                type="button"
                role="option"
                id={`${listId}-${i}`}
                data-select-index={i}
                aria-selected={isSelected}
                disabled={opt.disabled}
                className={`ume-select__option${isActive ? ' ume-select__option--active' : ''}${isSelected ? ' ume-select__option--selected' : ''}`}
                onMouseEnter={() => setActiveIndex(i)}
                onClick={() => choose(i)}
              >
                {opt.icon && <span className="ume-select__icon">{opt.icon}</span>}
                <span className="ume-select__optionlabel">{opt.label}</span>
                {isSelected && <Icon name="check" size={14} className="ume-select__check" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
