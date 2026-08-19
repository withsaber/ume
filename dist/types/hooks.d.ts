import type React from 'react';
/** Calls handler when a pointer down happens outside ref.current. */
export declare function useOnClickOutside(ref: React.RefObject<HTMLElement>, handler: (e: MouseEvent | TouchEvent) => void, active?: boolean): void;
/** Calls handler when the Escape key is pressed. */
export declare function useOnEscapePress(handler: () => void, active?: boolean): void;
