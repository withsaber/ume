import React from 'react';
import { UmeIconName } from './Icon';
export type ButtonVariant = 'primary' | 'accent' | 'secondary' | 'ghost' | 'danger' | 'danger-solid';
export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
    variant?: ButtonVariant;
    size?: 'sm' | 'md';
    children?: React.ReactNode;
}
export declare function Button({ variant, size, className, ...rest }: ButtonProps): any;
export type IconButtonVariant = 'primary' | 'accent' | 'secondary' | 'ghost' | 'danger';
export interface IconButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
    label: string;
    variant?: IconButtonVariant;
    size?: 'sm' | 'md' | 'lg';
    children?: React.ReactNode;
}
export declare function IconButton({ label, variant, size, className, ...rest }: IconButtonProps): any;
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    label?: string;
    helperText?: string;
    error?: string;
    startAdornment?: React.ReactNode;
}
export declare function Input({ label, helperText, error, startAdornment, id, ...rest }: InputProps): any;
export interface ToggleProps {
    checked?: boolean;
    defaultChecked?: boolean;
    onChange?: (checked: boolean) => void;
    disabled?: boolean;
    label?: string;
}
export declare function Toggle({ checked, onChange, disabled, label }: ToggleProps): any;
export interface TabItem {
    id: string;
    label: string;
}
export interface TabsProps {
    tabs: TabItem[];
    active: string;
    onChange: (id: string) => void;
}
export declare function Tabs({ tabs, active, onChange }: TabsProps): any;
export declare function Divider(): any;
export interface SkeletonProps {
    width?: number | string;
    height?: number | string;
}
export declare function Skeleton({ width, height }: SkeletonProps): any;
export interface ProgressProps {
    value: number;
}
export declare function Progress({ value }: ProgressProps): any;
export type BadgeTone = 'neutral' | 'success' | 'warning' | 'danger' | 'info' | 'plum' | 'blue';
export type BadgeVariant = 'solid' | 'soft' | 'outline' | 'dot';
export interface BadgeProps {
    label: string;
    tone?: BadgeTone;
    variant?: BadgeVariant;
    size?: 'sm' | 'md';
    icon?: UmeIconName;
    anchor?: boolean;
}
export declare function Badge({ label, tone, variant, size, icon, anchor }: BadgeProps): any;
export interface Crumb {
    label: string;
    href?: string;
}
export declare function Breadcrumb({ items, separator }: {
    items: Crumb[];
    separator?: string;
}): any;
export interface FilterOption {
    value: string;
    label: string;
}
export interface FilterProps {
    label: string;
    options: FilterOption[];
    value?: string;
    onChange?: (value: string) => void;
}
export declare function Filter({ label, options, value, onChange }: FilterProps): any;
export interface ChecklistItem {
    id: string;
    label: string;
    checked?: boolean;
    helper?: string;
    disabled?: boolean;
}
export declare function Checklist({ items, onToggle }: {
    items: ChecklistItem[];
    onToggle?: (id: string) => void;
}): any;
