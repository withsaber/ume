import React from 'react';
import './popover.css';
export interface PopoverProps {
    open: boolean;
    onClose: () => void;
    anchorRef: React.RefObject<HTMLElement>;
    children: React.ReactNode;
    align?: 'start' | 'center' | 'end';
    className?: string;
}
export declare function Popover({ open, onClose, anchorRef, children, align, className }: PopoverProps): any;
