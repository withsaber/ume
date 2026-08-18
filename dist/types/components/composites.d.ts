import React from 'react';
export interface DialogProps {
    open: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    actions?: React.ReactNode;
}
export declare function Dialog({ open, onClose, title, children, actions }: DialogProps): React.ReactPortal | null;
export interface ToastItem {
    id: number;
    message: string;
    actionLabel?: string;
    onAction?: () => void;
}
interface ToastContextValue {
    push: (message: string, opts?: {
        actionLabel?: string;
        onAction?: () => void;
    }) => void;
}
export declare const useToast: () => ToastContextValue;
export declare function ToastProvider({ children }: {
    children: React.ReactNode;
}): React.JSX.Element;
export interface AvatarProps {
    name?: string;
    src?: string;
    size?: 'sm' | 'md' | 'lg';
}
export declare function Avatar({ name, src, size }: AvatarProps): React.JSX.Element;
export declare function Facepile({ children }: {
    children: React.ReactNode;
}): React.JSX.Element;
export type ChipTone = 'neutral' | 'success' | 'warning' | 'danger' | 'info' | 'plum';
export interface ChipProps {
    label: string;
    tone?: ChipTone;
}
export declare function Chip({ label, tone }: ChipProps): React.JSX.Element;
export declare function Card({ children, className }: {
    children: React.ReactNode;
    className?: string;
}): React.JSX.Element;
export interface TooltipProps {
    content: string;
    children: React.ReactNode;
}
export declare function Tooltip({ content, children }: TooltipProps): React.JSX.Element;
export declare function H1({ children }: {
    children: React.ReactNode;
}): React.JSX.Element;
export declare function H2({ children }: {
    children: React.ReactNode;
}): React.JSX.Element;
export declare function H3({ children }: {
    children: React.ReactNode;
}): React.JSX.Element;
export declare function Body({ children }: {
    children: React.ReactNode;
}): React.JSX.Element;
export declare function Caption({ children }: {
    children: React.ReactNode;
}): React.JSX.Element;
export declare function Mono({ children }: {
    children: React.ReactNode;
}): React.JSX.Element;
export type UmeTheme = 'light' | 'dark';
export declare function UmeProvider({ theme, children }: {
    theme?: UmeTheme;
    children: React.ReactNode;
}): React.JSX.Element;
export {};
