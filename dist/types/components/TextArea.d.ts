import React from 'react';
import './textarea.css';
export interface TextAreaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'id' | 'className'> {
    label?: string;
    helperText?: string;
    error?: string;
    rows?: number;
    id?: string;
    className?: string;
}
export declare function TextArea({ label, helperText, error, id, rows, className, ...rest }: TextAreaProps): any;
