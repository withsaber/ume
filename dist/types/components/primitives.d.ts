import React from 'react';
export type ButtonVariant = 'primary' | 'accent' | 'secondary' | 'ghost' | 'danger' | 'danger-solid';
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: 'sm' | 'md';
}
export declare function Button({ variant, size, className, ...rest }: ButtonProps): React.JSX.Element;
export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    children: React.ReactNode;
}
export declare function IconButton({ label, className, ...rest }: IconButtonProps): React.JSX.Element;
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    label?: string;
    helperText?: string;
    error?: string;
    startAdornment?: React.ReactNode;
}
export declare function Input({ label, helperText, error, startAdornment, id, ...rest }: InputProps): React.JSX.Element;
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
}
export declare function Select({ className, ...rest }: SelectProps): React.JSX.Element;
export interface ToggleProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
    label?: string;
}
export declare function Toggle({ checked, onChange, disabled, label }: ToggleProps): React.JSX.Element;
export interface TabItem {
    id: string;
    label: string;
}
export interface TabsProps {
    tabs: TabItem[];
    active: string;
    onChange: (id: string) => void;
}
export declare function Tabs({ tabs, active, onChange }: TabsProps): React.JSX.Element;
export declare function Divider(): React.JSX.Element;
export interface SkeletonProps {
    width?: number | string;
    height?: number | string;
}
export declare function Skeleton({ width, height }: SkeletonProps): React.JSX.Element;
export interface ProgressProps {
    value: number;
}
export declare function Progress({ value }: ProgressProps): React.JSX.Element;
