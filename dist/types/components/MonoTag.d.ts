import './monotag.css';
export type MonoTagTone = 'neutral' | 'success' | 'warning' | 'danger' | 'info' | 'plum';
export interface MonoTagProps {
    label: string;
    tone?: MonoTagTone;
    className?: string;
}
export declare function MonoTag({ label, tone, className }: MonoTagProps): any;
