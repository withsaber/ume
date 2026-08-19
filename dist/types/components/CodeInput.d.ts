import './codeinput.css';
export interface CodeInputProps {
    length?: number;
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    onComplete?: (value: string) => void;
    disabled?: boolean;
    error?: boolean | string;
    masked?: boolean;
    autoFocus?: boolean;
    className?: string;
    'aria-label'?: string;
}
export declare function CodeInput({ length, value, onChange, onComplete, disabled, error, masked, autoFocus, className, 'aria-label': ariaLabel, }: CodeInputProps): any;
