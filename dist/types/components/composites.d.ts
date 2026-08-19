import React from 'react';
export interface DialogProps {
    open: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    actions?: React.ReactNode;
}
export declare function Dialog({ open, onClose, title, children, actions }: DialogProps): any;
export interface ToastItem {
    id: number;
    message: string;
    actionLabel?: string;
    onAction?: () => void;
}
export declare const useToast: () => any;
export declare function ToastProvider({ children }: {
    children: React.ReactNode;
}): any;
export type AvatarBadge = 'online' | 'away' | 'busy' | 'offline' | 'verified';
export interface AvatarProps {
    name?: string;
    src?: string;
    size?: 'sm' | 'md' | 'lg';
    /** Presence dot or verified badge, anchored bottom-right. */
    badge?: AvatarBadge;
    /** Notification count badge (shows "99+" above 99). Wins over `badge`. */
    count?: number;
}
export declare function Avatar({ name, src, size, badge, count }: AvatarProps): any;
export declare function Facepile({ children }: {
    children: React.ReactNode;
}): any;
export type ChipTone = 'neutral' | 'success' | 'warning' | 'danger' | 'info' | 'plum';
export interface ChipProps {
    label: string;
    tone?: ChipTone;
}
export declare function Chip({ label, tone }: ChipProps): any;
export declare function Card({ children, className, style }: {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}): any;
export interface TooltipProps {
    content: string;
    children: React.ReactNode;
}
export declare function Tooltip({ content, children }: TooltipProps): any;
export declare function H1({ children }: {
    children: React.ReactNode;
}): any;
export declare function H2({ children }: {
    children: React.ReactNode;
}): any;
export declare function H3({ children }: {
    children: React.ReactNode;
}): any;
export declare function Body({ children }: {
    children: React.ReactNode;
}): any;
export declare function Caption({ children }: {
    children: React.ReactNode;
}): any;
export declare function Mono({ children }: {
    children: React.ReactNode;
}): any;
export type BannerTone = 'neutral' | 'info' | 'success' | 'warning' | 'danger' | 'accent';
export interface BannerCTA {
    label: string;
    onClick?: () => void;
}
export interface BannerProps {
    label?: string;
    tone?: BannerTone;
    icon?: React.ReactNode;
    ctas?: BannerCTA[];
    children?: React.ReactNode;
}
export declare function Banner({ label, tone, icon, ctas }: BannerProps): any;
export interface ButtonGroupProps {
    children: React.ReactNode;
    fullWidth?: boolean;
    stacked?: boolean;
}
export declare function ButtonGroup({ children, fullWidth, stacked }: ButtonGroupProps): any;
export interface ButtonGroupItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    destructive?: boolean;
    icon?: React.ReactNode;
}
export declare function ButtonGroupItem({ label, destructive, icon, ...rest }: ButtonGroupItemProps): any;
export interface CircularProgressProps {
    progress?: number;
    spinner?: boolean;
    size?: number;
    strokeWidth?: number;
}
export declare function CircularProgress({ progress, spinner, size, strokeWidth }: CircularProgressProps): any;
export interface DropdownProps {
    open: boolean;
    children: React.ReactNode;
    className?: string;
}
export declare function Dropdown({ open, children, className }: DropdownProps): any;
export interface DropdownItemProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
    label?: string;
    icon?: React.ReactNode;
    destructive?: boolean;
    end?: React.ReactNode;
    children?: React.ReactNode;
}
export declare function DropdownItem({ label, icon, destructive, end, children, ...rest }: DropdownItemProps): any;
export interface IconTextProps {
    label: string;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    filled?: boolean;
    disabled?: boolean;
    onClick?: (e: React.MouseEvent) => void;
}
export declare function IconText({ label, startIcon, endIcon, filled, disabled, onClick }: IconTextProps): any;
export type UmeTheme = 'light' | 'dark';
export declare function UmeProvider({ theme, children }: {
    theme?: UmeTheme;
    children: React.ReactNode;
}): any;
