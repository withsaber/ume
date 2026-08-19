import React from 'react';
import './chatbubble.css';
export interface ChatBubbleProps {
    role: 'user' | 'assistant';
    children: React.ReactNode;
    avatar?: React.ReactNode;
    timestamp?: string;
    className?: string;
}
export declare function ChatBubble({ role, children, avatar, timestamp, className }: ChatBubbleProps): any;
