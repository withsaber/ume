import React, { useState } from 'react';
import {
  Avatar,
  Banner,
  Button,
  ButtonGroup,
  ButtonGroupItem,
  Chip,
  CircularProgress,
  CodeInput,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownSubmenu,
  Facepile,
  Icon,
  IconButton,
  IconText,
  Input,
  KeyCodeSequence,
  MonoTag,
  Select,
  TextArea,
  Toggle,
} from '../../../src';
import { ComponentPageSpec } from './ComponentPage';

const PHOTO =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFB59D"/><stop offset="1" stop-color="#EF603F"/></linearGradient></defs><rect width="80" height="80" fill="url(#g)"/><circle cx="58" cy="18" r="26" fill="#FFFFFF" opacity="0.22"/><circle cx="24" cy="60" r="18" fill="#FFFFFF" opacity="0.16"/></svg>`
  );

function ToggleDemo() {
  const [on, setOn] = useState(true);
  return <Toggle checked={on} onChange={setOn} label="Notifications" />;
}

function CodeInputDemo() {
  const [code, setCode] = useState('');
  return <CodeInput value={code} onChange={setCode} />;
}

function SelectDemo() {
  const [range, setRange] = useState('week');
  return (
    <div style={{ width: 240 }}>
      <Select
        value={range}
        onChange={setRange}
        aria-label="Range"
        options={[
          { value: 'day', label: 'Day', icon: <Icon name="sun" size={16} /> },
          { value: 'week', label: 'Week', icon: <Icon name="calendar" size={16} /> },
          { value: 'month', label: 'Month', icon: <Icon name="calendar" size={16} /> },
          { value: 'year', label: 'Year (coming soon)', disabled: true },
        ]}
      />
    </div>
  );
}

export const COMPONENT_SPECS: Record<string, ComponentPageSpec> = {
  banner: {
    title: 'Banner',
    lede: 'A full-width message strip used to announce status, updates, or required actions. Banners remain visible until dismissed.',
    sections: [
      {
        id: 'tones',
        title: 'Tones',
        description: 'Six solid tones that communicate intent, with matching icons.',
        preview: (
          <div className="docs-stack">
            <Banner tone="info" icon={<Icon name="info-circle" size={16} />} label="A new version of ume is available." />
            <Banner tone="success" icon={<Icon name="check-circle" size={16} />} label="Your changes have been saved." />
            <Banner tone="warning" icon={<Icon name="warning-triangle" size={16} />} label="Your trial ends in 3 days." />
            <Banner tone="danger" icon={<Icon name="warning-circle" size={16} />} label="Payment failed. Update your card." />
            <Banner tone="accent" icon={<Icon name="sparkle" size={16} />} label="Try the new calendar beta." />
            <Banner icon={<Icon name="bell" size={16} />} label="We recommend desktop notifications." />
          </div>
        ),
        code: `import { Banner, Icon } from 'ume';

<Banner tone="info" icon={<Icon name="info-circle" size={16} />} label="A new version of ume is available." />
<Banner tone="success" icon={<Icon name="check-circle" size={16} />} label="Your changes have been saved." />
<Banner tone="warning" icon={<Icon name="warning-triangle" size={16} />} label="Your trial ends in 3 days." />
<Banner tone="danger" icon={<Icon name="warning-circle" size={16} />} label="Payment failed. Update your card." />
<Banner tone="accent" icon={<Icon name="sparkle" size={16} />} label="Try the new calendar beta." />
<Banner icon={<Icon name="bell" size={16} />} label="We recommend desktop notifications." />`,
      },
      {
        id: 'actions',
        title: 'With actions',
        description: 'Add one or more calls to action with the ctas prop.',
        preview: (
          <div className="docs-stack">
            <Banner
              tone="accent"
              icon={<Icon name="sparkle" size={16} />}
              label="Update available"
              ctas={[{ label: 'Update now' }, { label: 'Later' }]}
            />
          </div>
        ),
        code: `<Banner
  tone="accent"
  icon={<Icon name="sparkle" size={16} />}
  label="Update available"
  ctas={[{ label: 'Update now' }, { label: 'Later' }]}
/>`,
      },
    ],
    props: [
      { name: 'label', type: 'string', description: 'The message text of the banner.', required: true },
      { name: 'tone', type: `'neutral' | 'info' | 'success' | 'warning' | 'danger' | 'accent'`, description: 'The tone that communicates intent. Defaults to "neutral".' },
      { name: 'icon', type: 'ReactNode', description: 'Icon shown before the label.' },
      { name: 'ctas', type: 'BannerCTA[]', description: 'Call-to-action buttons rendered after the label.' },
    ],
  },

  button: {
    title: 'Button',
    lede: 'Buttons trigger actions. Variants communicate hierarchy and intent.',
    sections: [
      {
        id: 'variants',
        title: 'Variants',
        description: 'Six variants, from primary to destructive.',
        preview: (
          <>
            <Button variant="primary">Save</Button>
            <Button variant="accent">Upgrade</Button>
            <Button variant="secondary">Cancel</Button>
            <Button variant="ghost">Skip</Button>
            <Button variant="danger">Delete</Button>
          </>
        ),
        code: `import { Button } from 'ume';

<Button variant="primary">Save</Button>
<Button variant="accent">Upgrade</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="ghost">Skip</Button>
<Button variant="danger">Delete</Button>`,
      },
      {
        id: 'sizes',
        title: 'Sizes',
        description: 'Buttons come in two sizes.',
        preview: (
          <>
            <Button size="md">Medium</Button>
            <Button size="sm">Small</Button>
          </>
        ),
        code: `<Button size="md">Medium</Button>
<Button size="sm">Small</Button>`,
      },
    ],
    props: [
      { name: 'variant', type: `'primary' | 'accent' | 'secondary' | 'ghost' | 'danger' | 'danger-solid'`, description: 'Visual variant. Defaults to "primary".' },
      { name: 'size', type: `'sm' | 'md'`, description: 'The size of the button. Defaults to "md".' },
      { name: 'disabled', type: 'boolean', description: 'Disables the button (native button attribute).' },
      { name: 'onClick', type: '(e: React.MouseEvent) => void', description: 'Trigger an action when clicking the button.' },
    ],
  },

  buttongroup: {
    title: 'ButtonGroup',
    lede: 'A set of related actions presented as one segmented control.',
    sections: [
      {
        id: 'basic',
        title: 'Basic',
        description: 'Group items with ButtonGroupItem inside a ButtonGroup.',
        preview: (
          <ButtonGroup>
            <ButtonGroupItem label="Day" />
            <ButtonGroupItem label="Week" />
            <ButtonGroupItem label="Month" />
          </ButtonGroup>
        ),
        code: `import { ButtonGroup, ButtonGroupItem } from 'ume';

<ButtonGroup>
  <ButtonGroupItem label="Day" />
  <ButtonGroupItem label="Week" />
  <ButtonGroupItem label="Month" />
</ButtonGroup>`,
      },
      {
        id: 'stacked',
        title: 'Stacked',
        description: 'Stack items vertically with the stacked prop.',
        preview: (
          <ButtonGroup stacked>
            <ButtonGroupItem label="Profile" />
            <ButtonGroupItem label="Notifications" />
            <ButtonGroupItem label="Delete account" destructive />
          </ButtonGroup>
        ),
        code: `<ButtonGroup stacked>
  <ButtonGroupItem label="Profile" />
  <ButtonGroupItem label="Notifications" />
  <ButtonGroupItem label="Delete account" destructive />
</ButtonGroup>`,
      },
    ],
    props: [
      { name: 'fullWidth', type: 'boolean', description: 'Stretch the group to fill its container.' },
      { name: 'stacked', type: 'boolean', description: 'Stack items vertically instead of horizontally.' },
      { name: 'destructive', type: 'boolean', description: 'On ButtonGroupItem: mark the action as destructive.' },
    ],
  },

  circularprogress: {
    title: 'CircularProgress',
    lede: 'A circular indicator for determinate progress or an indeterminate spinner.',
    sections: [
      {
        id: 'progress',
        title: 'Progress',
        description: 'Pass a value between 0 and 100 for determinate progress.',
        preview: (
          <>
            <CircularProgress progress={25} />
            <CircularProgress progress={60} />
            <CircularProgress progress={90} />
          </>
        ),
        code: `import { CircularProgress } from 'ume';

<CircularProgress progress={25} />
<CircularProgress progress={60} />
<CircularProgress progress={90} />`,
      },
      {
        id: 'spinner',
        title: 'Spinner',
        description: 'Use the spinner prop for indeterminate loading.',
        preview: <CircularProgress spinner />,
        code: `<CircularProgress spinner />`,
      },
    ],
    props: [
      { name: 'progress', type: 'number', description: 'Progress value between 0 and 100.' },
      { name: 'spinner', type: 'boolean', description: 'Render an indeterminate spinner.' },
      { name: 'size', type: 'number', description: 'Diameter in pixels. Defaults to 32.' },
      { name: 'strokeWidth', type: 'number', description: 'Ring thickness in pixels. Defaults to 3.' },
    ],
  },

  chip: {
    title: 'Chip',
    lede: 'A compact label for status, categories, or metadata.',
    sections: [
      {
        id: 'tones',
        title: 'Tones',
        description: 'Chips come in six tones.',
        preview: (
          <>
            <Chip label="Neutral" />
            <Chip label="Success" tone="success" />
            <Chip label="Warning" tone="warning" />
            <Chip label="Danger" tone="danger" />
            <Chip label="Info" tone="info" />
            <Chip label="Plum" tone="plum" />
          </>
        ),
        code: `import { Chip } from 'ume';

<Chip label="Neutral" />
<Chip label="Success" tone="success" />
<Chip label="Warning" tone="warning" />
<Chip label="Danger" tone="danger" />
<Chip label="Info" tone="info" />
<Chip label="Plum" tone="plum" />`,
      },
    ],
    props: [
      { name: 'label', type: 'string', description: 'The text inside the chip.', required: true },
      { name: 'tone', type: `'neutral' | 'success' | 'warning' | 'danger' | 'info' | 'plum'`, description: 'The tone of the chip. Defaults to "neutral".' },
    ],
  },

  codeinput: {
    title: 'CodeInput',
    lede: 'A boxed one-time-code input with per-character cells, for verification flows.',
    sections: [
      {
        id: 'basic',
        title: 'Basic',
        description: 'Typing advances between cells; paste fills forward.',
        preview: <CodeInputDemo />,
        code: `import { CodeInput } from 'ume';

const [code, setCode] = useState('');

<CodeInput value={code} onChange={setCode} />`,
      },
      {
        id: 'masked-error',
        title: 'Masked and error',
        description: 'Mask entered digits, and mark the whole group invalid.',
        preview: <CodeInput value="123" onChange={() => {}} masked error />,
        code: `<CodeInput value={code} onChange={setCode} masked error />`,
      },
    ],
    props: [
      { name: 'value', type: 'string', description: 'The current code (controlled).', required: true },
      { name: 'onChange', type: '(value: string) => void', description: 'Called with the new code on every edit.', required: true },
      { name: 'length', type: 'number', description: 'Number of cells. Defaults to 6.' },
      { name: 'onComplete', type: '(value: string) => void', description: 'Called once when every cell is filled.' },
      { name: 'masked', type: 'boolean', description: 'Render entered characters as dots.' },
      { name: 'error', type: 'boolean | string', description: 'Mark the group invalid; a string renders as an error message.' },
      { name: 'disabled', type: 'boolean', description: 'Disables all cells.' },
    ],
  },

  divider: {
    title: 'Divider',
    lede: 'A thin horizontal rule that separates content sections.',
    sections: [
      {
        id: 'basic',
        title: 'Basic',
        description: 'Dividers have no props.',
        preview: (
          <div className="docs-stack">
            <span>Section one</span>
            <Divider />
            <span>Section two</span>
          </div>
        ),
        code: `import { Divider } from 'ume';

<Divider />`,
      },
    ],
  },

  dropdown: {
    title: 'Dropdown',
    lede: 'A floating menu of actions, rendered below a trigger.',
    sections: [
      {
        id: 'basic',
        title: 'Basic',
        description: 'Compose items with DropdownItem inside a Dropdown.',
        preview: (
          <div className="docs-dropdown-demo">
            <Button variant="secondary">Actions</Button>
            <Dropdown open>
              <DropdownItem label="Rename" icon={<Icon name="pencil" size={16} />} />
              <DropdownItem label="Share" icon={<Icon name="share" size={16} />} />
              <DropdownItem label="Delete" destructive />
            </Dropdown>
          </div>
        ),
        code: `import { Dropdown, DropdownItem, Icon } from 'ume';

<Dropdown open={open}>
  <DropdownItem label="Rename" icon={<Icon name="pencil" size={16} />} />
  <DropdownItem label="Share" icon={<Icon name="share" size={16} />} />
  <DropdownItem label="Delete" destructive />
</Dropdown>`,
      },
      {
        id: 'submenu',
        title: 'Submenu',
        description: 'Nest actions one level deep with DropdownSubmenu. Hover or use arrow keys.',
        preview: (
          <div className="docs-dropdown-demo">
            <Button variant="secondary">Actions</Button>
            <Dropdown open>
              <DropdownItem label="Rename" icon={<Icon name="pencil" size={16} />} />
              <DropdownSubmenu label="Share" icon={<Icon name="share" size={16} />}>
                <DropdownItem label="Copy link" icon={<Icon name="link" size={16} />} />
                <DropdownItem label="Email" icon={<Icon name="mail" size={16} />} />
              </DropdownSubmenu>
              <DropdownItem label="Delete" destructive />
            </Dropdown>
          </div>
        ),
        code: `import { Dropdown, DropdownItem, DropdownSubmenu, Icon } from 'ume';

<Dropdown open={open}>
  <DropdownItem label="Rename" />
  <DropdownSubmenu label="Share">
    <DropdownItem label="Copy link" />
    <DropdownItem label="Email" />
  </DropdownSubmenu>
  <DropdownItem label="Delete" destructive />
</Dropdown>`,
      },
    ],
    props: [
      { name: 'open', type: 'boolean', description: 'Controls whether the dropdown is rendered.', required: true },
      { name: 'label', type: 'string', description: 'On DropdownItem and DropdownSubmenu: the item text.' },
      { name: 'icon', type: 'ReactNode', description: 'On DropdownItem and DropdownSubmenu: icon shown before the label.' },
      { name: 'destructive', type: 'boolean', description: 'On DropdownItem: mark the action as destructive.' },
      { name: 'end', type: 'ReactNode', description: 'On DropdownItem: content rendered at the end (e.g. a shortcut).' },
      { name: 'children', type: 'DropdownItem[]', description: 'On DropdownSubmenu: the nested menu items.' },
    ],
  },

  facepile: {
    title: 'Facepile',
    lede: 'An overlapping stack of avatars, for showing who is involved.',
    sections: [
      {
        id: 'basic',
        title: 'Basic',
        description: 'Wrap Avatar components in a Facepile.',
        preview: (
          <Facepile>
            <Avatar name="Alice Ng" src={PHOTO} />
            <Avatar name="Bobby Tables" />
            <Avatar name="Carol Danvers" />
            <Avatar name="David Kim" />
          </Facepile>
        ),
        code: `import { Avatar, Facepile } from 'ume';

<Facepile>
  <Avatar name="Alice Ng" src={ProfilePic} />
  <Avatar name="Bobby Tables" />
  <Avatar name="Carol Danvers" />
</Facepile>`,
      },
    ],
    props: [
      { name: 'children', type: 'Avatar[]', description: 'The avatars to stack.', required: true },
    ],
  },

  iconbutton: {
    title: 'IconButton',
    lede: 'A clickable element that triggers actions. Similar to Button, except it renders only an icon inside a square component.',
    sections: [
      {
        id: 'variants',
        title: 'Variants',
        description: 'The same variants as Button: primary, accent, secondary, ghost, and danger.',
        preview: (
          <>
            <IconButton label="Add file" variant="primary">
              <Icon name="plus" />
            </IconButton>
            <IconButton label="Upgrade" variant="accent">
              <Icon name="sparkle" />
            </IconButton>
            <IconButton label="Search" variant="secondary">
              <Icon name="search" />
            </IconButton>
            <IconButton label="More" variant="ghost">
              <Icon name="dots-vertical" />
            </IconButton>
            <IconButton label="Delete" variant="danger">
              <Icon name="trash" />
            </IconButton>
          </>
        ),
        code: `import { Icon, IconButton } from 'ume';

<IconButton label="Add file" variant="primary">
  <Icon name="plus" />
</IconButton>
<IconButton label="Upgrade" variant="accent">
  <Icon name="sparkle" />
</IconButton>
<IconButton label="Search" variant="secondary">
  <Icon name="search" />
</IconButton>
<IconButton label="More" variant="ghost">
  <Icon name="dots-vertical" />
</IconButton>
<IconButton label="Delete" variant="danger">
  <Icon name="trash" />
</IconButton>`,
      },
      {
        id: 'sizes',
        title: 'Sizes',
        description: 'Three sizes, with radii matched to Button.',
        preview: (
          <>
            <IconButton label="Add file" variant="primary" size="lg">
              <Icon name="plus" size={20} />
            </IconButton>
            <IconButton label="Add file" variant="primary" size="md">
              <Icon name="plus" size={18} />
            </IconButton>
            <IconButton label="Add file" variant="primary" size="sm">
              <Icon name="plus" size={14} />
            </IconButton>
          </>
        ),
        code: `<IconButton label="Add file" variant="primary" size="lg">
  <Icon name="plus" size={20} />
</IconButton>
<IconButton label="Add file" variant="primary" size="md">
  <Icon name="plus" size={18} />
</IconButton>
<IconButton label="Add file" variant="primary" size="sm">
  <Icon name="plus" size={14} />
</IconButton>`,
      },
    ],
    props: [
      { name: 'label', type: 'string', description: 'Accessible label for the button.', required: true },
      { name: 'children', type: 'ReactNode', description: 'The icon to render.', required: true },
      { name: 'variant', type: `'primary' | 'accent' | 'secondary' | 'ghost' | 'danger'`, description: 'Visual variant, mirroring Button. Defaults to "secondary".' },
      { name: 'size', type: `'sm' | 'md' | 'lg'`, description: 'The size of the button. Defaults to "md".' },
      { name: 'onClick', type: '(e: React.MouseEvent) => void', description: 'Trigger an action when clicking the button.' },
    ],
  },

  icontext: {
    title: 'IconText',
    lede: 'A label paired with a leading or trailing icon, optionally interactive.',
    sections: [
      {
        id: 'basic',
        title: 'Basic',
        description: 'Pass icons with startIcon and endIcon.',
        preview: (
          <>
            <IconText label="Inbox" startIcon={<Icon name="inbox" size={16} />} />
            <IconText label="Settings" startIcon={<Icon name="gear" size={16} />} filled />
          </>
        ),
        code: `import { Icon, IconText } from 'ume';

<IconText label="Inbox" startIcon={<Icon name="inbox" size={16} />} />
<IconText label="Settings" startIcon={<Icon name="gear" size={16} />} filled />`,
      },
    ],
    props: [
      { name: 'label', type: 'string', description: 'The text label.', required: true },
      { name: 'startIcon', type: 'ReactNode', description: 'Icon before the label.' },
      { name: 'endIcon', type: 'ReactNode', description: 'Icon after the label.' },
      { name: 'filled', type: 'boolean', description: 'Render with a filled background.' },
      { name: 'onClick', type: '(e: React.MouseEvent) => void', description: 'Makes the element an interactive button.' },
    ],
  },

  input: {
    title: 'Input',
    lede: 'A text field with an optional label, helper text, and error state.',
    sections: [
      {
        id: 'basic',
        title: 'Basic',
        description: 'Labels and helper text are wired up for accessibility automatically.',
        preview: (
          <div className="docs-stack docs-stack--field">
            <Input label="Email" placeholder="you@example.com" helperText="We never share your email." />
          </div>
        ),
        code: `import { Input } from 'ume';

<Input
  label="Email"
  placeholder="you@example.com"
  helperText="We never share your email."
/>`,
      },
      {
        id: 'error',
        title: 'Error',
        description: 'Pass an error string to mark the field invalid.',
        preview: (
          <div className="docs-stack docs-stack--field">
            <Input label="Email" defaultValue="not-an-email" error="Enter a valid email address." />
          </div>
        ),
        code: `<Input
  label="Email"
  defaultValue="not-an-email"
  error="Enter a valid email address."
/>`,
      },
    ],
    props: [
      { name: 'label', type: 'string', description: 'Label rendered above the field.' },
      { name: 'helperText', type: 'string', description: 'Helper text rendered below the field.' },
      { name: 'error', type: 'string', description: 'Error message; marks the field invalid.' },
      { name: 'startAdornment', type: 'ReactNode', description: 'Content rendered inside the field, before the input.' },
    ],
  },

  select: {
    title: 'Select',
    lede: 'A designed dropdown: a trigger showing the selected value that opens an ume menu when clicked.',
    sections: [
      {
        id: 'basic',
        title: 'Basic',
        description: 'Fully keyboard navigable: arrows, Enter, Escape. Options can carry icons and be disabled.',
        preview: <SelectDemo />,
        code: `import { Select } from 'ume';

const [range, setRange] = useState('week');

<Select
  value={range}
  onChange={setRange}
  options={[
    { value: 'day', label: 'Day', icon: <Icon name="sun" size={16} /> },
    { value: 'week', label: 'Week', icon: <Icon name="calendar" size={16} /> },
    { value: 'month', label: 'Month', icon: <Icon name="calendar" size={16} /> },
    { value: 'year', label: 'Year (coming soon)', disabled: true },
  ]}
/>`,
      },
    ],
    props: [
      { name: 'options', type: 'SelectOption[]', description: 'The options to show: value, label, optional icon, optional disabled.', required: true },
      { name: 'value', type: 'string', description: 'The selected value (controlled).' },
      { name: 'onChange', type: '(value: string) => void', description: 'Called with the newly selected value.' },
      { name: 'placeholder', type: 'string', description: 'Shown when nothing is selected. Defaults to "Select...".' },
      { name: 'disabled', type: 'boolean', description: 'Disables the trigger.' },
    ],
  },

  toggle: {
    title: 'Toggle',
    lede: 'A switch for binary settings, with switch role semantics.',
    sections: [
      {
        id: 'basic',
        title: 'Basic',
        description: 'Controlled with checked and onChange.',
        preview: <ToggleDemo />,
        code: `import { Toggle } from 'ume';

const [on, setOn] = useState(true);

<Toggle checked={on} onChange={setOn} label="Notifications" />`,
      },
    ],
    props: [
      { name: 'checked', type: 'boolean', description: 'Whether the toggle is on.', required: true },
      { name: 'onChange', type: '(checked: boolean) => void', description: 'Called with the new value on toggle.', required: true },
      { name: 'disabled', type: 'boolean', description: 'Disables the toggle.' },
      { name: 'label', type: 'string', description: 'Accessible label for the switch.' },
    ],
  },

  keycodesequence: {
    title: 'KeyCodeSequence',
    lede: 'Keyboard shortcuts rendered as key-cap chips.',
    sections: [
      {
        id: 'basic',
        title: 'Basic',
        description: 'Aliases like cmd, shift, and enter are normalized to symbols.',
        preview: (
          <>
            <KeyCodeSequence keys={['cmd', 'K']} />
            <KeyCodeSequence keys={['cmd', 'shift', 'P']} />
            <KeyCodeSequence keys={['esc']} size="sm" />
          </>
        ),
        code: `import { KeyCodeSequence } from 'ume';

<KeyCodeSequence keys={['cmd', 'K']} />
<KeyCodeSequence keys={['cmd', 'shift', 'P']} />
<KeyCodeSequence keys={['esc']} size="sm" />`,
      },
    ],
    props: [
      { name: 'keys', type: 'string[]', description: 'The keys to render, in order.', required: true },
      { name: 'separator', type: 'ReactNode', description: 'Rendered between key chips. Defaults to nothing.' },
      { name: 'size', type: `'sm' | 'md'`, description: 'Chip size. Defaults to "md".' },
    ],
  },

  monotag: {
    title: 'MonoTag',
    lede: 'A monospace inline tag for tokens, versions, and code-like labels.',
    sections: [
      {
        id: 'tones',
        title: 'Tones',
        description: 'Same tones as Chip.',
        preview: (
          <>
            <MonoTag label="v1.0.0" />
            <MonoTag label="--ume-text-primary" tone="plum" />
            <MonoTag label="deprecated" tone="danger" />
            <MonoTag label="stable" tone="success" />
          </>
        ),
        code: `import { MonoTag } from 'ume';

<MonoTag label="v1.0.0" />
<MonoTag label="--ume-text-primary" tone="plum" />
<MonoTag label="deprecated" tone="danger" />`,
      },
    ],
    props: [
      { name: 'label', type: 'string', description: 'The text inside the tag.', required: true },
      { name: 'tone', type: `'neutral' | 'success' | 'warning' | 'danger' | 'info' | 'plum'`, description: 'The tone of the tag. Defaults to "neutral".' },
    ],
  },

  textarea: {
    title: 'TextArea',
    lede: 'A multi-line text field with the same label, helper, and error API as Input.',
    sections: [
      {
        id: 'basic',
        title: 'Basic',
        description: 'Mirrors the Input component, for longer text.',
        preview: (
          <div className="docs-stack docs-stack--field">
            <TextArea label="Bio" placeholder="Tell us about yourself" helperText="Max 280 characters." />
          </div>
        ),
        code: `import { TextArea } from 'ume';

<TextArea
  label="Bio"
  placeholder="Tell us about yourself"
  helperText="Max 280 characters."
/>`,
      },
      {
        id: 'error',
        title: 'Error',
        description: 'Pass an error string to mark the field invalid.',
        preview: (
          <div className="docs-stack docs-stack--field">
            <TextArea label="Bio" defaultValue="x" error="Bio is too short." />
          </div>
        ),
        code: `<TextArea label="Bio" error="Bio is too short." />`,
      },
    ],
    props: [
      { name: 'label', type: 'string', description: 'Label rendered above the field.' },
      { name: 'helperText', type: 'string', description: 'Helper text rendered below the field.' },
      { name: 'error', type: 'string', description: 'Error message; marks the field invalid.' },
      { name: 'rows', type: 'number', description: 'Visible row count. Defaults to 3.' },
    ],
  },
};
