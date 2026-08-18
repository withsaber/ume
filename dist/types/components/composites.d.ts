import React from 'react';
export interface DialogProps {
    open: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    actions?: React.ReactNode;
}
export declare function Dialog({ open, onClose, title, children, actions }: DialogProps): React.ReactPortal;
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
export type BannerTone = 'neutral' | 'info' | 'success' | 'warning' | 'danger' | 'accent';
export interface BannerCTA {
    label: string;
    onClick?: () => void;
}
export interface BannerProps {
    label: string;
    tone?: BannerTone;
    icon?: React.ReactNode;
    ctas?: BannerCTA[];
}
export declare function Banner({ label, tone, icon, ctas }: BannerProps): React.JSX.Element;
export interface ButtonGroupProps {
    children: React.ReactNode;
    fullWidth?: boolean;
    stacked?: boolean;
}
export declare function ButtonGroup({ children, fullWidth, stacked }: ButtonGroupProps): React.JSX.Element;
export interface ButtonGroupItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    destructive?: boolean;
    icon?: React.ReactNode;
}
export declare function ButtonGroupItem({ label, destructive, icon, ...rest }: ButtonGroupItemProps): React.JSX.Element;
export interface CircularProgressProps {
    progress?: number;
    spinner?: boolean;
    size?: number;
    strokeWidth?: number;
}
export declare function CircularProgress({ progress, spinner, size, strokeWidth }: CircularProgressProps): React.JSX.Element;
export interface DropdownProps {
    open: boolean;
    children: React.ReactNode;
    className?: string;
}
export declare function Dropdown({ open, children, className }: DropdownProps): React.JSX.Element;
export interface DropdownItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string;
    icon?: React.ReactNode;
    destructive?: boolean;
    end?: React.ReactNode;
}
export declare function DropdownItem({ label, icon, destructive, end, children, ...rest }: DropdownItemProps): React.JSX.Element;
export interface IconTextProps {
    label: string;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    filled?: boolean;
    disabled?: boolean;
    onClick?: (e: React.MouseEvent) => void;
}
export declare function IconText({ label, startIcon, endIcon, filled, disabled, onClick }: IconTextProps): React.JSX.Element;
export type UmeTheme = 'light' | 'dark';
export declare function UmeProvider({ theme, children }: {
    theme?: UmeTheme;
    children: React.ReactNode;
}): React.JSX.Element;
export {};
