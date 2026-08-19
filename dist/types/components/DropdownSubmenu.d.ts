import React from 'react';
import './dropdownsubmenu.css';
export interface DropdownSubmenuProps {
    label: string;
    icon?: React.ReactNode;
    disabled?: boolean;
    children: React.ReactNode;
    className?: string;
}
/**
 * A nested submenu row for Dropdown. Used INSTEAD of a DropdownItem:
 *
 *   <Dropdown open>
 *     <DropdownItem label="Copy link" />
 *     <DropdownSubmenu label="Share">
 *       <DropdownItem label="Email" />
 *       <DropdownItem label="Slack" />
 *     </DropdownSubmenu>
 *   </Dropdown>
 */
export declare function DropdownSubmenu({ label, icon, disabled, children, className }: DropdownSubmenuProps): any;
