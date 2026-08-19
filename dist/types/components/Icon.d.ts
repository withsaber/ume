import { UmeIconName, UmeIconVariant } from '../icons/icons';
import './icon.css';
export type { UmeIconName, UmeIconVariant };
export interface IconProps {
    name: UmeIconName;
    variant?: UmeIconVariant;
    size?: number;
    className?: string;
    'aria-label'?: string;
    'aria-hidden'?: boolean;
}
export declare function Icon({ name, variant, size, className, 'aria-label': ariaLabel, 'aria-hidden': ariaHidden, }: IconProps): any;
