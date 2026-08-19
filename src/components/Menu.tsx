import React from 'react';
import './menu.css';

/* ---------- Menu ----------
   A standalone vertical menu panel, styled like the dropdown panel but
   position: static — it is embedded in layouts (sidebars, settings panes),
   not floating. */
export interface MenuProps {
  children: React.ReactNode;
  className?: string;
}
export function Menu({ children, className = '' }: MenuProps) {
  return (
    <div className={`ume-menu ${className}`.trim()} role="menu">
      {children}
    </div>
  );
}

export interface MenuItemProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  label?: string;
  icon?: React.ReactNode;
  destructive?: boolean;
  end?: React.ReactNode;
  children?: React.ReactNode;
}
export function MenuItem({ label, icon, destructive, end, children, ...rest }: MenuItemProps) {
  return (
    <button
      className={`ume-menu__item${destructive ? ' ume-menu__item--danger' : ''}`}
      role="menuitem"
      {...rest}
    >
      {icon && <span className="ume-menu__item-icon">{icon}</span>}
      {children || label}
      {end && <span className="ume-menu__item-end">{end}</span>}
    </button>
  );
}
