import { UmeIconName } from '../icons/icons';
import './icon.css';
export type { UmeIconName };
export type UmeIconVariant = 'line';
export interface IconProps {
    name: UmeIconName;
    variant?: UmeIconVariant;
    /** Rendered glyph size in px. Wrapper auto-grows by 4px. Default 18. */
    size?: number;
    className?: string;
    /** Override the inherited text colour (any CSS color). */
    color?: string;
    'aria-label'?: string;
    'aria-hidden'?: boolean;
}
export declare function Icon({ name, variant: _variant, size, className, color, 'aria-label': ariaLabel, 'aria-hidden': ariaHidden, }: IconProps): any;
