import React from 'react';
import './ext-inputs.css';
export interface PasswordProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
    label?: string;
    helper?: string;
    error?: string;
    showStrength?: boolean;
}
export declare const Password: any;
export interface PhoneInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
    label?: string;
    helper?: string;
    error?: string;
    prefix?: string;
}
export declare const PhoneInput: any;
export type CardBrand = 'visa' | 'mastercard' | 'amex' | 'discover' | 'generic';
export interface CardNumberProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
    label?: string;
    helper?: string;
    error?: string;
}
export declare const CardNumber: any;
export interface ExpiryCVCProps {
    label?: string;
    helper?: string;
    error?: string;
    expiry?: string;
    cvc?: string;
    onExpiryChange?: (v: string) => void;
    onCvcChange?: (v: string) => void;
}
export declare function ExpiryCVC({ label, helper, error, expiry, cvc, onExpiryChange, onCvcChange }: ExpiryCVCProps): any;
