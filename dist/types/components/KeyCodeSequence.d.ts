import React from 'react';
import './keycodesequence.css';
export interface KeyCodeSequenceProps {
    keys: Array<string>;
    separator?: React.ReactNode;
    size?: 'sm' | 'md';
    className?: string;
}
export declare function KeyCodeSequence({ keys, separator, size, className }: KeyCodeSequenceProps): any;
