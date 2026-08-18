// src/components/primitives.tsx
import React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
function Button({ variant = "primary", size = "md", className = "", ...rest }) {
  return /* @__PURE__ */ jsx("button", { className: `ume-btn ume-btn--${variant} ume-btn--${size} ${className}`.trim(), ...rest });
}
function IconButton({ label, className = "", ...rest }) {
  return /* @__PURE__ */ jsx("button", { "aria-label": label, className: `ume-iconbtn ${className}`.trim(), ...rest });
}
function Input({ label, helperText, error, startAdornment, id, ...rest }) {
  const inputId = id || React.useId();
  const field = /* @__PURE__ */ jsxs("div", { className: `ume-input${error ? " ume-input--error" : ""}`, children: [
    startAdornment,
    /* @__PURE__ */ jsx("input", { id: inputId, "aria-invalid": !!error, ...rest })
  ] });
  if (!label && !helperText && !error) return field;
  return /* @__PURE__ */ jsxs("div", { className: "ume-field", children: [
    label && /* @__PURE__ */ jsx("label", { className: "ume-field__label", htmlFor: inputId, children: label }),
    field,
    (error || helperText) && /* @__PURE__ */ jsx("span", { className: `ume-field__helper${error ? " ume-field__helper--error" : ""}`, children: error || helperText })
  ] });
}
function Select({ className = "", ...rest }) {
  return /* @__PURE__ */ jsx("select", { className: `ume-select ${className}`.trim(), ...rest });
}
function Toggle({ checked, onChange, disabled, label }) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      type: "button",
      role: "switch",
      "aria-checked": checked,
      "aria-label": label,
      disabled,
      className: "ume-toggle",
      onClick: () => onChange(!checked)
    }
  );
}
function Tabs({ tabs, active, onChange }) {
  return /* @__PURE__ */ jsx("div", { className: "ume-tabs", role: "tablist", children: tabs.map((t) => /* @__PURE__ */ jsx(
    "button",
    {
      role: "tab",
      "aria-selected": t.id === active,
      className: `ume-tab${t.id === active ? " ume-tab--active" : ""}`,
      onClick: () => onChange(t.id),
      children: t.label
    },
    t.id
  )) });
}
function Divider() {
  return /* @__PURE__ */ jsx("hr", { className: "ume-divider" });
}
function Skeleton({ width = "100%", height = 14 }) {
  return /* @__PURE__ */ jsx("div", { className: "ume-skeleton", style: { width, height }, "aria-hidden": "true" });
}
function Progress({ value }) {
  const clamped = Math.max(0, Math.min(100, value));
  return /* @__PURE__ */ jsx("div", { className: "ume-progress", role: "progressbar", "aria-valuenow": clamped, "aria-valuemin": 0, "aria-valuemax": 100, children: /* @__PURE__ */ jsx("div", { className: "ume-progress__bar", style: { width: `${clamped}%` } }) });
}

// src/components/composites.tsx
import React2, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Fragment, jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function Dialog({ open, onClose, title, children, actions }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  if (!open) return null;
  return createPortal(
    /* @__PURE__ */ jsx2("div", { className: "ume-dialog-scrim", onMouseDown: (e) => e.target === e.currentTarget && onClose(), children: /* @__PURE__ */ jsxs2("div", { className: "ume-dialog", role: "dialog", "aria-modal": "true", "aria-label": title, children: [
      /* @__PURE__ */ jsx2("h2", { className: "ume-dialog__title", children: title }),
      /* @__PURE__ */ jsx2("p", { className: "ume-dialog__body", children }),
      actions && /* @__PURE__ */ jsx2("div", { className: "ume-dialog__actions", children: actions })
    ] }) }),
    document.body
  );
}
var ToastContext = React2.createContext({ push: () => {
} });
var useToast = () => React2.useContext(ToastContext);
function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const nextId = useRef(1);
  const push = useCallback((message, opts) => {
    const id = nextId.current++;
    setToasts((t) => [...t, { id, message, actionLabel: opts == null ? void 0 : opts.actionLabel, onAction: opts == null ? void 0 : opts.onAction }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4e3);
  }, []);
  return /* @__PURE__ */ jsxs2(ToastContext.Provider, { value: { push }, children: [
    children,
    createPortal(
      /* @__PURE__ */ jsx2("div", { className: "ume-toast-region", children: toasts.map((t) => /* @__PURE__ */ jsxs2("div", { className: "ume-toast", role: "status", children: [
        /* @__PURE__ */ jsx2("span", { children: t.message }),
        t.actionLabel && /* @__PURE__ */ jsx2("button", { className: "ume-toast__action", onClick: () => {
          var _a;
          (_a = t.onAction) == null ? void 0 : _a.call(t);
          setToasts((x) => x.filter((y) => y.id !== t.id));
        }, children: t.actionLabel })
      ] }, t.id)) }),
      document.body
    )
  ] });
}
function Avatar({ name = "", src, size = "md" }) {
  const initials = name.split(/\s+/).map((w) => w[0]).filter(Boolean).slice(0, 2).join("").toUpperCase();
  return /* @__PURE__ */ jsx2("span", { className: `ume-avatar ume-avatar--${size}`, "aria-label": name, children: src ? /* @__PURE__ */ jsx2("img", { src, alt: name }) : initials });
}
function Facepile({ children }) {
  return /* @__PURE__ */ jsx2("span", { className: "ume-facepile", children });
}
function Chip({ label, tone = "neutral" }) {
  return /* @__PURE__ */ jsx2("span", { className: `ume-chip${tone !== "neutral" ? ` ume-chip--${tone}` : ""}`, children: label });
}
function Card({ children, className = "" }) {
  return /* @__PURE__ */ jsx2("div", { className: `ume-card ${className}`.trim(), children });
}
function Tooltip({ content, children }) {
  return /* @__PURE__ */ jsxs2("span", { className: "ume-tooltip-wrap", children: [
    children,
    /* @__PURE__ */ jsx2("span", { className: "ume-tooltip", role: "tooltip", children: content })
  ] });
}
function H1({ children }) {
  return /* @__PURE__ */ jsx2("h1", { className: "ume-h1", children });
}
function H2({ children }) {
  return /* @__PURE__ */ jsx2("h2", { className: "ume-h2", children });
}
function H3({ children }) {
  return /* @__PURE__ */ jsx2("h3", { className: "ume-h3", children });
}
function Body({ children }) {
  return /* @__PURE__ */ jsx2("p", { className: "ume-body", children });
}
function Caption({ children }) {
  return /* @__PURE__ */ jsx2("p", { className: "ume-caption", children });
}
function Mono({ children }) {
  return /* @__PURE__ */ jsx2("span", { className: "ume-mono", children });
}
function Banner({ label, tone = "neutral", icon, ctas = [] }) {
  return /* @__PURE__ */ jsxs2("div", { className: `ume-banner${tone !== "neutral" ? ` ume-banner--${tone}` : ""}`, role: "status", children: [
    icon && /* @__PURE__ */ jsx2("span", { className: "ume-banner__icon", children: icon }),
    /* @__PURE__ */ jsx2("span", { className: "ume-banner__label", children: label }),
    ctas.length > 0 && /* @__PURE__ */ jsx2("span", { className: "ume-banner__ctas", children: ctas.map((c, i) => /* @__PURE__ */ jsx2("button", { className: "ume-banner__cta", onClick: c.onClick, children: c.label }, i)) })
  ] });
}
function ButtonGroup({ children, fullWidth, stacked }) {
  return /* @__PURE__ */ jsx2(
    "div",
    {
      className: `ume-buttongroup${fullWidth ? " ume-buttongroup--full" : ""}${stacked ? " ume-buttongroup--stacked" : ""}`,
      role: "group",
      children
    }
  );
}
function ButtonGroupItem({ label, destructive, icon, ...rest }) {
  return /* @__PURE__ */ jsxs2("button", { className: `ume-buttongroup__item${destructive ? " ume-buttongroup__item--destructive" : ""}`, ...rest, children: [
    icon,
    label
  ] });
}
function CircularProgress({ progress, spinner, size = 32, strokeWidth = 3 }) {
  const r = (size - strokeWidth) / 2;
  const c = 2 * Math.PI * r;
  const clamped = Math.max(0, Math.min(100, progress != null ? progress : 0));
  const offset = spinner ? c * 0.72 : c * (1 - clamped / 100);
  return /* @__PURE__ */ jsx2(
    "span",
    {
      className: `ume-cprogress${spinner ? " ume-cprogress--spinner" : ""}`,
      role: "progressbar",
      "aria-valuenow": spinner ? void 0 : clamped,
      "aria-valuemin": 0,
      "aria-valuemax": 100,
      style: { width: size, height: size },
      children: /* @__PURE__ */ jsxs2("svg", { width: size, height: size, children: [
        /* @__PURE__ */ jsx2("circle", { className: "ume-cprogress__track", cx: size / 2, cy: size / 2, r, fill: "none", strokeWidth }),
        /* @__PURE__ */ jsx2(
          "circle",
          {
            className: "ume-cprogress__bar",
            cx: size / 2,
            cy: size / 2,
            r,
            fill: "none",
            strokeWidth,
            strokeDasharray: c,
            strokeDashoffset: offset,
            transform: `rotate(-90 ${size / 2} ${size / 2})`
          }
        )
      ] })
    }
  );
}
function Dropdown({ open, children, className = "" }) {
  if (!open) return null;
  return /* @__PURE__ */ jsx2("div", { className: `ume-dropdown ${className}`.trim(), role: "menu", children });
}
function DropdownItem({ label, icon, destructive, end, children, ...rest }) {
  return /* @__PURE__ */ jsxs2(
    "button",
    {
      className: `ume-dropdown-item${destructive ? " ume-dropdown-item--danger" : ""}`,
      role: "menuitem",
      ...rest,
      children: [
        icon && /* @__PURE__ */ jsx2("span", { className: "ume-dropdown-item__icon", children: icon }),
        children || label,
        end && /* @__PURE__ */ jsx2("span", { className: "ume-dropdown-item__end", children: end })
      ]
    }
  );
}
function IconText({ label, startIcon, endIcon, filled, disabled, onClick }) {
  const cls = `ume-icontext${filled ? " ume-icontext--filled" : ""}`;
  const inner = /* @__PURE__ */ jsxs2(Fragment, { children: [
    startIcon && /* @__PURE__ */ jsx2("span", { className: "ume-icontext__icon", children: startIcon }),
    label,
    endIcon && /* @__PURE__ */ jsx2("span", { className: "ume-icontext__icon", children: endIcon })
  ] });
  if (onClick) {
    return /* @__PURE__ */ jsx2("button", { className: cls, onClick, disabled, children: inner });
  }
  return /* @__PURE__ */ jsx2("span", { className: cls, children: inner });
}
function UmeProvider({ theme = "light", children }) {
  return /* @__PURE__ */ jsx2("div", { className: "ume-root", "data-ume-theme": theme, children });
}
export {
  Avatar,
  Banner,
  Body,
  Button,
  ButtonGroup,
  ButtonGroupItem,
  Caption,
  Card,
  Chip,
  CircularProgress,
  Dialog,
  Divider,
  Dropdown,
  DropdownItem,
  Facepile,
  H1,
  H2,
  H3,
  IconButton,
  IconText,
  Input,
  Mono,
  Progress,
  Select,
  Skeleton,
  Tabs,
  ToastProvider,
  Toggle,
  Tooltip,
  UmeProvider,
  useToast
};
//# sourceMappingURL=index.js.map
