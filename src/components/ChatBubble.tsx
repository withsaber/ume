import React from 'react';
import './chatbubble.css';

/* ---------- ChatBubble ----------
   A message bubble for conversational interfaces. User messages sit right on
   the accent color; assistant messages sit left on a raised surface with an
   optional avatar bottom-aligned beside the bubble. */
export interface ChatBubbleProps {
  role: 'user' | 'assistant';
  children: React.ReactNode;
  avatar?: React.ReactNode;
  timestamp?: string;
  className?: string;
}

export function ChatBubble({ role, children, avatar, timestamp, className = '' }: ChatBubbleProps) {
  return (
    <div className={`ume-chatbubble ume-chatbubble--${role} ${className}`.trim()}>
      {role === 'assistant' && avatar && <span className="ume-chatbubble__avatar">{avatar}</span>}
      <div className="ume-chatbubble__body">
        <div className="ume-chatbubble__bubble">{children}</div>
        {timestamp && <span className="ume-chatbubble__time">{timestamp}</span>}
      </div>
    </div>
  );
}
