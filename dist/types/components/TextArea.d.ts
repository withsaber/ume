import React from 'react';
import './textarea.css';
export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    helperText?: string;
    error?: string;
    rows?: number;
}
export declare function TextArea({ label, helperText, error, id, rows, className, ...rest }: TextAreaProps): any;
