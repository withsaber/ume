import React from 'react';
import './select.css';
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
export declare function Select({ options, value, onChange, placeholder, disabled, className, 'aria-label': ariaLabel, }: SelectProps): any;
