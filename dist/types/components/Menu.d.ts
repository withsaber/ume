import React from 'react';
import './menu.css';
export interface MenuProps {
    children: React.ReactNode;
    className?: string;
}
export declare function Menu({ children, className }: MenuProps): any;
export interface MenuItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string;
    icon?: React.ReactNode;
    destructive?: boolean;
    end?: React.ReactNode;
}
export declare function MenuItem({ label, icon, destructive, end, children, ...rest }: MenuItemProps): any;
