import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useOnClickOutside, useOnEscapePress } from '../hooks';
import './dropdownsubmenu.css';

/* ---------- DropdownSubmenu ---------- */
export interface DropdownSubmenuProps {
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

/**
 * A nested submenu row for Dropdown. Used INSTEAD of a DropdownItem:
 *
 *   <Dropdown open>
 *     <DropdownItem label="Copy link" />
 *     <DropdownSubmenu label="Share">
 *       <DropdownItem label="Email" />
 *       <DropdownItem label="Slack" />
 *     </DropdownSubmenu>
 *   </Dropdown>
 */
export function DropdownSubmenu({ label, icon, disabled, children, className = '' }: DropdownSubmenuProps) {
  const [open, setOpen] = useState(false);
  const [side, setSide] = useState<'right' | 'left'>('right');
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const hoverTimer = useRef<number | null>(null);
  /* Set when Escape refocuses the trigger so the resulting focus event does not reopen the panel. */
  const skipFocusOpen = useRef(false);

  const clearHoverTimer = useCallback(() => {
    if (hoverTimer.current !== null) {
      window.clearTimeout(hoverTimer.current);
      hoverTimer.current = null;
    }
  }, []);

  const openSubmenu = useCallback(() => {
    if (disabled) return;
    /* Flip to the left when there is not enough room on the right. */
    const rect = triggerRef.current?.getBoundingClientRect();
    setSide(rect && rect.right + 208 > window.innerWidth ? 'left' : 'right');
    setOpen(true);
  }, [disabled]);

  const closeSubmenu = useCallback(() => setOpen(false), []);

  useOnClickOutside(rootRef, closeSubmenu, open);
  useOnEscapePress(() => {
    skipFocusOpen.current = true;
    closeSubmenu();
    triggerRef.current?.focus();
  }, open);

  useEffect(() => clearHoverTimer, [clearHoverTimer]);

  const onPointerEnter = () => {
    clearHoverTimer();
    hoverTimer.current = window.setTimeout(openSubmenu, 120);
  };
  const onPointerLeave = () => {
    clearHoverTimer();
    closeSubmenu();
  };
  const onFocus = () => {
    if (skipFocusOpen.current) {
      skipFocusOpen.current = false;
      return;
    }
    openSubmenu();
  };
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === 'ArrowRight' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      e.stopPropagation();
      openSubmenu();
    }
  };

  return (
    <div
      ref={rootRef}
      className={`ume-dropdown-submenu ${className}`.trim()}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
    >
      <button
        ref={triggerRef}
        type="button"
        role="menuitem"
        aria-haspopup="menu"
        aria-expanded={open}
        disabled={disabled}
        className="ume-dropdown-submenu__trigger"
        onFocus={onFocus}
        onClick={openSubmenu}
        onKeyDown={onKeyDown}
      >
        {icon && <span className="ume-dropdown-submenu__icon">{icon}</span>}
        {label}
        <span className="ume-dropdown-submenu__chevron" aria-hidden="true">
          <svg viewBox="0 0 18 18" width="14" height="14" fill="none">
            <path d="M6.5 3.5 12 9l-5.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>
      {open && (
        <div
          className={`ume-dropdown-submenu__panel${side === 'left' ? ' ume-dropdown-submenu__panel--left' : ''}`}
          role="menu"
          aria-label={label}
        >
          {children}
        </div>
      )}
    </div>
  );
}
