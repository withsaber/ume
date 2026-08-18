// src/components/primitives.tsx
import React from "react";
function Button({ variant = "primary", size = "md", className = "", ...rest }) {
  return /* @__PURE__ */ React.createElement("button", { className: `ume-btn ume-btn--${variant} ume-btn--${size} ${className}`.trim(), ...rest });
}
function IconButton({ label, className = "", ...rest }) {
  return /* @__PURE__ */ React.createElement("button", { "aria-label": label, className: `ume-iconbtn ${className}`.trim(), ...rest });
}
function Input({ label, helperText, error, startAdornment, id, ...rest }) {
  const inputId = id || React.useId();
  const field = /* @__PURE__ */ React.createElement("div", { className: `ume-input${error ? " ume-input--error" : ""}` }, startAdornment, /* @__PURE__ */ React.createElement("input", { id: inputId, "aria-invalid": !!error, ...rest }));
  if (!label && !helperText && !error) return field;
  return /* @__PURE__ */ React.createElement("div", { className: "ume-field" }, label && /* @__PURE__ */ React.createElement("label", { className: "ume-field__label", htmlFor: inputId }, label), field, (error || helperText) && /* @__PURE__ */ React.createElement("span", { className: `ume-field__helper${error ? " ume-field__helper--error" : ""}` }, error || helperText));
}
function Select({ className = "", ...rest }) {
  return /* @__PURE__ */ React.createElement("select", { className: `ume-select ${className}`.trim(), ...rest });
}
function Toggle({ checked, onChange, disabled, label }) {
  return /* @__PURE__ */ React.createElement(
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
  return /* @__PURE__ */ React.createElement("div", { className: "ume-tabs", role: "tablist" }, tabs.map((t) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: t.id,
      role: "tab",
      "aria-selected": t.id === active,
      className: `ume-tab${t.id === active ? " ume-tab--active" : ""}`,
      onClick: () => onChange(t.id)
    },
    t.label
  )));
}
function Divider() {
  return /* @__PURE__ */ React.createElement("hr", { className: "ume-divider" });
}
function Skeleton({ width = "100%", height = 14 }) {
  return /* @__PURE__ */ React.createElement("div", { className: "ume-skeleton", style: { width, height }, "aria-hidden": "true" });
}
function Progress({ value }) {
  const clamped = Math.max(0, Math.min(100, value));
  return /* @__PURE__ */ React.createElement("div", { className: "ume-progress", role: "progressbar", "aria-valuenow": clamped, "aria-valuemin": 0, "aria-valuemax": 100 }, /* @__PURE__ */ React.createElement("div", { className: "ume-progress__bar", style: { width: `${clamped}%` } }));
}

// src/components/composites.tsx
import React2, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
function Dialog({ open, onClose, title, children, actions }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  if (!open) return null;
  return createPortal(
    /* @__PURE__ */ React2.createElement("div", { className: "ume-dialog-scrim", onMouseDown: (e) => e.target === e.currentTarget && onClose() }, /* @__PURE__ */ React2.createElement("div", { className: "ume-dialog", role: "dialog", "aria-modal": "true", "aria-label": title }, /* @__PURE__ */ React2.createElement("h2", { className: "ume-dialog__title" }, title), /* @__PURE__ */ React2.createElement("p", { className: "ume-dialog__body" }, children), actions && /* @__PURE__ */ React2.createElement("div", { className: "ume-dialog__actions" }, actions))),
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
  return /* @__PURE__ */ React2.createElement(ToastContext.Provider, { value: { push } }, children, createPortal(
    /* @__PURE__ */ React2.createElement("div", { className: "ume-toast-region" }, toasts.map((t) => /* @__PURE__ */ React2.createElement("div", { key: t.id, className: "ume-toast", role: "status" }, /* @__PURE__ */ React2.createElement("span", null, t.message), t.actionLabel && /* @__PURE__ */ React2.createElement("button", { className: "ume-toast__action", onClick: () => {
      var _a;
      (_a = t.onAction) == null ? void 0 : _a.call(t);
      setToasts((x) => x.filter((y) => y.id !== t.id));
    } }, t.actionLabel)))),
    document.body
  ));
}
function Avatar({ name = "", src, size = "md" }) {
  const initials = name.split(/\s+/).map((w) => w[0]).filter(Boolean).slice(0, 2).join("").toUpperCase();
  return /* @__PURE__ */ React2.createElement("span", { className: `ume-avatar ume-avatar--${size}`, "aria-label": name }, src ? /* @__PURE__ */ React2.createElement("img", { src, alt: name }) : initials);
}
function Facepile({ children }) {
  return /* @__PURE__ */ React2.createElement("span", { className: "ume-facepile" }, children);
}
function Chip({ label, tone = "neutral" }) {
  return /* @__PURE__ */ React2.createElement("span", { className: `ume-chip${tone !== "neutral" ? ` ume-chip--${tone}` : ""}` }, label);
}
function Card({ children, className = "" }) {
  return /* @__PURE__ */ React2.createElement("div", { className: `ume-card ${className}`.trim() }, children);
}
function Tooltip({ content, children }) {
  return /* @__PURE__ */ React2.createElement("span", { className: "ume-tooltip-wrap" }, children, /* @__PURE__ */ React2.createElement("span", { className: "ume-tooltip", role: "tooltip" }, content));
}
function H1({ children }) {
  return /* @__PURE__ */ React2.createElement("h1", { className: "ume-h1" }, children);
}
function H2({ children }) {
  return /* @__PURE__ */ React2.createElement("h2", { className: "ume-h2" }, children);
}
function H3({ children }) {
  return /* @__PURE__ */ React2.createElement("h3", { className: "ume-h3" }, children);
}
function Body({ children }) {
  return /* @__PURE__ */ React2.createElement("p", { className: "ume-body" }, children);
}
function Caption({ children }) {
  return /* @__PURE__ */ React2.createElement("p", { className: "ume-caption" }, children);
}
function Mono({ children }) {
  return /* @__PURE__ */ React2.createElement("span", { className: "ume-mono" }, children);
}
function UmeProvider({ theme = "light", children }) {
  return /* @__PURE__ */ React2.createElement("div", { className: "ume-root", "data-ume-theme": theme }, children);
}
export {
  Avatar,
  Body,
  Button,
  Caption,
  Card,
  Chip,
  Dialog,
  Divider,
  Facepile,
  H1,
  H2,
  H3,
  IconButton,
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
