import React from 'react';
import './menu.css';
export interface MenuProps {
    children: React.ReactNode;
    className?: string;
}
export declare function Menu({ children, className }: MenuProps): any;
export interface MenuItemProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
    label?: string;
    icon?: React.ReactNode;
    destructive?: boolean;
    end?: React.ReactNode;
    children?: React.ReactNode;
}
export declare function MenuItem({ label, icon, destructive, end, children, ...rest }: MenuItemProps): any;
