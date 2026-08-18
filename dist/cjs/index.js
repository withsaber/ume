var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  Avatar: () => Avatar,
  Body: () => Body,
  Button: () => Button,
  Caption: () => Caption,
  Card: () => Card,
  Chip: () => Chip,
  Dialog: () => Dialog,
  Divider: () => Divider,
  Facepile: () => Facepile,
  H1: () => H1,
  H2: () => H2,
  H3: () => H3,
  IconButton: () => IconButton,
  Input: () => Input,
  Mono: () => Mono,
  Progress: () => Progress,
  Select: () => Select,
  Skeleton: () => Skeleton,
  Tabs: () => Tabs,
  ToastProvider: () => ToastProvider,
  Toggle: () => Toggle,
  Tooltip: () => Tooltip,
  UmeProvider: () => UmeProvider,
  useToast: () => useToast
});
module.exports = __toCommonJS(index_exports);

// src/components/primitives.tsx
var import_react = __toESM(require("react"));
function Button({ variant = "primary", size = "md", className = "", ...rest }) {
  return /* @__PURE__ */ import_react.default.createElement("button", { className: `ume-btn ume-btn--${variant} ume-btn--${size} ${className}`.trim(), ...rest });
}
function IconButton({ label, className = "", ...rest }) {
  return /* @__PURE__ */ import_react.default.createElement("button", { "aria-label": label, className: `ume-iconbtn ${className}`.trim(), ...rest });
}
function Input({ label, helperText, error, startAdornment, id, ...rest }) {
  const inputId = id || import_react.default.useId();
  const field = /* @__PURE__ */ import_react.default.createElement("div", { className: `ume-input${error ? " ume-input--error" : ""}` }, startAdornment, /* @__PURE__ */ import_react.default.createElement("input", { id: inputId, "aria-invalid": !!error, ...rest }));
  if (!label && !helperText && !error) return field;
  return /* @__PURE__ */ import_react.default.createElement("div", { className: "ume-field" }, label && /* @__PURE__ */ import_react.default.createElement("label", { className: "ume-field__label", htmlFor: inputId }, label), field, (error || helperText) && /* @__PURE__ */ import_react.default.createElement("span", { className: `ume-field__helper${error ? " ume-field__helper--error" : ""}` }, error || helperText));
}
function Select({ className = "", ...rest }) {
  return /* @__PURE__ */ import_react.default.createElement("select", { className: `ume-select ${className}`.trim(), ...rest });
}
function Toggle({ checked, onChange, disabled, label }) {
  return /* @__PURE__ */ import_react.default.createElement(
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
  return /* @__PURE__ */ import_react.default.createElement("div", { className: "ume-tabs", role: "tablist" }, tabs.map((t) => /* @__PURE__ */ import_react.default.createElement(
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
  return /* @__PURE__ */ import_react.default.createElement("hr", { className: "ume-divider" });
}
function Skeleton({ width = "100%", height = 14 }) {
  return /* @__PURE__ */ import_react.default.createElement("div", { className: "ume-skeleton", style: { width, height }, "aria-hidden": "true" });
}
function Progress({ value }) {
  const clamped = Math.max(0, Math.min(100, value));
  return /* @__PURE__ */ import_react.default.createElement("div", { className: "ume-progress", role: "progressbar", "aria-valuenow": clamped, "aria-valuemin": 0, "aria-valuemax": 100 }, /* @__PURE__ */ import_react.default.createElement("div", { className: "ume-progress__bar", style: { width: `${clamped}%` } }));
}

// src/components/composites.tsx
var import_react2 = __toESM(require("react"));
var import_react_dom = require("react-dom");
function Dialog({ open, onClose, title, children, actions }) {
  (0, import_react2.useEffect)(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  if (!open) return null;
  return (0, import_react_dom.createPortal)(
    /* @__PURE__ */ import_react2.default.createElement("div", { className: "ume-dialog-scrim", onMouseDown: (e) => e.target === e.currentTarget && onClose() }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "ume-dialog", role: "dialog", "aria-modal": "true", "aria-label": title }, /* @__PURE__ */ import_react2.default.createElement("h2", { className: "ume-dialog__title" }, title), /* @__PURE__ */ import_react2.default.createElement("p", { className: "ume-dialog__body" }, children), actions && /* @__PURE__ */ import_react2.default.createElement("div", { className: "ume-dialog__actions" }, actions))),
    document.body
  );
}
var ToastContext = import_react2.default.createContext({ push: () => {
} });
var useToast = () => import_react2.default.useContext(ToastContext);
function ToastProvider({ children }) {
  const [toasts, setToasts] = (0, import_react2.useState)([]);
  const nextId = (0, import_react2.useRef)(1);
  const push = (0, import_react2.useCallback)((message, opts) => {
    const id = nextId.current++;
    setToasts((t) => [...t, { id, message, actionLabel: opts == null ? void 0 : opts.actionLabel, onAction: opts == null ? void 0 : opts.onAction }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4e3);
  }, []);
  return /* @__PURE__ */ import_react2.default.createElement(ToastContext.Provider, { value: { push } }, children, (0, import_react_dom.createPortal)(
    /* @__PURE__ */ import_react2.default.createElement("div", { className: "ume-toast-region" }, toasts.map((t) => /* @__PURE__ */ import_react2.default.createElement("div", { key: t.id, className: "ume-toast", role: "status" }, /* @__PURE__ */ import_react2.default.createElement("span", null, t.message), t.actionLabel && /* @__PURE__ */ import_react2.default.createElement("button", { className: "ume-toast__action", onClick: () => {
      var _a;
      (_a = t.onAction) == null ? void 0 : _a.call(t);
      setToasts((x) => x.filter((y) => y.id !== t.id));
    } }, t.actionLabel)))),
    document.body
  ));
}
function Avatar({ name = "", src, size = "md" }) {
  const initials = name.split(/\s+/).map((w) => w[0]).filter(Boolean).slice(0, 2).join("").toUpperCase();
  return /* @__PURE__ */ import_react2.default.createElement("span", { className: `ume-avatar ume-avatar--${size}`, "aria-label": name }, src ? /* @__PURE__ */ import_react2.default.createElement("img", { src, alt: name }) : initials);
}
function Facepile({ children }) {
  return /* @__PURE__ */ import_react2.default.createElement("span", { className: "ume-facepile" }, children);
}
function Chip({ label, tone = "neutral" }) {
  return /* @__PURE__ */ import_react2.default.createElement("span", { className: `ume-chip${tone !== "neutral" ? ` ume-chip--${tone}` : ""}` }, label);
}
function Card({ children, className = "" }) {
  return /* @__PURE__ */ import_react2.default.createElement("div", { className: `ume-card ${className}`.trim() }, children);
}
function Tooltip({ content, children }) {
  return /* @__PURE__ */ import_react2.default.createElement("span", { className: "ume-tooltip-wrap" }, children, /* @__PURE__ */ import_react2.default.createElement("span", { className: "ume-tooltip", role: "tooltip" }, content));
}
function H1({ children }) {
  return /* @__PURE__ */ import_react2.default.createElement("h1", { className: "ume-h1" }, children);
}
function H2({ children }) {
  return /* @__PURE__ */ import_react2.default.createElement("h2", { className: "ume-h2" }, children);
}
function H3({ children }) {
  return /* @__PURE__ */ import_react2.default.createElement("h3", { className: "ume-h3" }, children);
}
function Body({ children }) {
  return /* @__PURE__ */ import_react2.default.createElement("p", { className: "ume-body" }, children);
}
function Caption({ children }) {
  return /* @__PURE__ */ import_react2.default.createElement("p", { className: "ume-caption" }, children);
}
function Mono({ children }) {
  return /* @__PURE__ */ import_react2.default.createElement("span", { className: "ume-mono" }, children);
}
function UmeProvider({ theme = "light", children }) {
  return /* @__PURE__ */ import_react2.default.createElement("div", { className: "ume-root", "data-ume-theme": theme }, children);
}
//# sourceMappingURL=index.js.map
