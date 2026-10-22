/* @ds-bundle: {"format":4,"namespace":"PUI","components":[{"name":"Button"},{"name":"Badge"},{"name":"Field"},{"name":"Input"},{"name":"PasswordInput"},{"name":"Textarea"},{"name":"Label"},{"name":"Select"},{"name":"Checkbox"},{"name":"Switch"},{"name":"Card"},{"name":"Alert"},{"name":"Tabs"},{"name":"Table"},{"name":"Separator"},{"name":"Skeleton"},{"name":"Avatar"}]} */
/* PUI: lightweight reference implementation used only by the documentation previews.
   In products, install the real components with `npx github:aline-aroucha/pui add <name>`. */
(function () {
  var React = window.React, h = React.createElement;
  var ICONS = {"check": [{"d": "M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z", "fillRule": "evenodd", "clipRule": "evenodd"}], "minus": [{"d": "M3.75 7.25a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Z", "fillRule": null, "clipRule": null}], "chevron-down": [{"d": "M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z", "fillRule": "evenodd", "clipRule": "evenodd"}], "exclamation-circle": [{"d": "M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14ZM8 4a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-1.5 0v-3A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z", "fillRule": "evenodd", "clipRule": "evenodd"}], "eye": [{"d": "M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z", "fillRule": null, "clipRule": null}, {"d": "M1.38 8.28a.87.87 0 0 1 0-.566 7.003 7.003 0 0 1 13.238.006.87.87 0 0 1 0 .566A7.003 7.003 0 0 1 1.379 8.28ZM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z", "fillRule": "evenodd", "clipRule": "evenodd"}], "eye-slash": [{"d": "M3.28 2.22a.75.75 0 0 0-1.06 1.06l10.5 10.5a.75.75 0 1 0 1.06-1.06l-1.322-1.323a7.012 7.012 0 0 0 2.16-3.11.87.87 0 0 0 0-.567A7.003 7.003 0 0 0 4.82 3.76l-1.54-1.54Zm3.196 3.195 1.135 1.136A1.502 1.502 0 0 1 9.45 8.389l1.136 1.135a3 3 0 0 0-4.109-4.109Z", "fillRule": "evenodd", "clipRule": "evenodd"}, {"d": "m7.812 10.994 1.816 1.816A7.003 7.003 0 0 1 1.38 8.28a.87.87 0 0 1 0-.566 6.985 6.985 0 0 1 1.113-2.039l2.513 2.513a3 3 0 0 0 2.806 2.806Z", "fillRule": null, "clipRule": null}], "plus": [{"d": "M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z", "fillRule": null, "clipRule": null}]};
  function Icon(p) {
    return h('svg', { viewBox: '0 0 16 16', fill: 'currentColor', 'aria-hidden': true, 'data-slot': 'icon', className: p.className },
      ICONS[p.name].map(function (d, i) { return h('path', { key: i, d: d.d, fillRule: d.fillRule || undefined, clipRule: d.clipRule || undefined }); }));
  }
  function cx() { return Array.prototype.filter.call(arguments, Boolean).join(' '); }
  function omit(p, keys) { var o = {}; for (var k in p) if (keys.indexOf(k) < 0) o[k] = p[k]; return o; }
  function slot(tag, base) {
    return function (p) { return h(tag, Object.assign(omit(p, ['className']), { className: cx(base, p.className) })); };
  }

  function Button(p) {
    var v = p.variant || 'default', s = p.size || 'default';
    return h('button', Object.assign({ type: 'button' }, omit(p, ['variant', 'size', 'className']), {
      className: cx('pui-btn', 'pui-btn--' + v, 'pui-btn--size-' + s, p.className) }));
  }
  function Badge(p) {
    return h('span', Object.assign(omit(p, ['variant', 'className']), { className: cx('pui-badge', 'pui-badge--' + (p.variant || 'default'), p.className) }));
  }
  var Input = function (p) { return h('input', Object.assign({ type: 'text' }, omit(p, ['className']), { className: cx('pui-input', p.className) })); };
  var Textarea = slot('textarea', 'pui-input pui-textarea');
  var Label = slot('label', 'pui-label');
  function Select(p) {
    var opts = (p.options || []).map(function (o) { return h('option', { key: o.value, value: o.value }, o.label); });
    return h('div', { className: cx('pui-select', p.className) },
      h('select', omit(p, ['options', 'className']), opts),
      h(Icon, { name: 'chevron-down' }));
  }
  function useControlled(value, def, onChange) {
    var st = React.useState(def), cur = value !== undefined ? value : st[0];
    return [cur, function (n) { if (value === undefined) st[1](n); if (onChange) onChange(n); }];
  }
  function Checkbox(p) {
    var c = useControlled(p.checked, p.defaultChecked || false, p.onCheckedChange);
    return h('button', Object.assign(omit(p, ['checked', 'defaultChecked', 'onCheckedChange', 'className']), {
      type: 'button', role: 'checkbox', 'aria-checked': c[0] === 'indeterminate' ? 'mixed' : c[0],
      'data-state': c[0] === 'indeterminate' ? 'indeterminate' : c[0] ? 'checked' : 'unchecked',
      className: cx('pui-checkbox', p.className), onClick: function () { if (!p.disabled) c[1](c[0] === 'indeterminate' ? true : !c[0]); } }),
      c[0] ? h(Icon, { name: c[0] === 'indeterminate' ? 'minus' : 'check' }) : null);
  }
  function Switch(p) {
    var c = useControlled(p.checked, !!p.defaultChecked, p.onCheckedChange);
    return h('button', Object.assign(omit(p, ['checked', 'defaultChecked', 'onCheckedChange', 'className']), {
      type: 'button', role: 'switch', 'aria-checked': c[0], 'data-state': c[0] ? 'checked' : 'unchecked',
      className: cx('pui-switch', p.className), onClick: function () { if (!p.disabled) c[1](!c[0]); } }),
      h('span', { className: 'pui-switch__thumb' }));
  }
  var Card = slot('div', 'pui-card'), CardHeader = slot('div', 'pui-card__header'), CardTitle = slot('div', 'pui-card__title'),
      CardDescription = slot('div', 'pui-card__description'), CardContent = slot('div', 'pui-card__content'), CardFooter = slot('div', 'pui-card__footer');
  function Alert(p) {
    return h('div', Object.assign({ role: p.variant === 'destructive' ? 'alert' : 'status' }, omit(p, ['variant', 'className']), { className: cx('pui-alert', 'pui-alert--' + (p.variant || 'default'), p.className) }));
  }
  var AlertTitle = slot('div', 'pui-alert__title'), AlertDescription = slot('div', 'pui-alert__description');
  var TabsCtx = React.createContext(null);
  function Tabs(p) {
    var c = useControlled(p.value, p.defaultValue, p.onValueChange);
    return h(TabsCtx.Provider, { value: c }, h('div', { className: cx('pui-tabs', p.className) }, p.children));
  }
  function TabsList(p) { return h('div', { role: 'tablist', className: cx('pui-tabs__list', p.className) }, p.children); }
  function TabsTrigger(p) {
    var c = React.useContext(TabsCtx), on = c[0] === p.value;
    return h('button', { type: 'button', role: 'tab', 'aria-selected': on, 'data-state': on ? 'active' : 'inactive', disabled: p.disabled,
      className: cx('pui-tabs__trigger', p.className), onClick: function () { c[1](p.value); } }, p.children);
  }
  function TabsContent(p) {
    var c = React.useContext(TabsCtx);
    return c[0] === p.value ? h('div', { role: 'tabpanel', className: cx('pui-tabs__content', p.className) }, p.children) : null;
  }
  function Table(p) { return h('div', { className: 'pui-table-wrap' }, h('table', Object.assign(omit(p, ['className']), { className: cx('pui-table', p.className) }))); }
  var TableHeader = slot('thead', ''), TableBody = slot('tbody', ''), TableRow = slot('tr', ''), TableHead = function (p) { return h('th', Object.assign({ scope: 'col' }, p)); }, TableCell = slot('td', ''),
      TableCaption = slot('caption', 'pui-table__caption');
  function Separator(p) {
    var o = p.orientation || 'horizontal';
    return h('div', { role: 'separator', 'aria-orientation': o, className: cx('pui-separator', 'pui-separator--' + o, p.className) });
  }
  var Skeleton = function (p) { return h('div', Object.assign({ 'aria-hidden': true }, omit(p, ['className']), { className: cx('pui-skeleton', p.className) })); };
  function Avatar(p) {
    var st = React.useState(false);
    return h('span', { className: cx('pui-avatar', p.className) },
      p.src && !st[0] ? h('img', { src: p.src, alt: p.alt || '', onError: function () { st[1](true); } })
        : h('span', { className: 'pui-avatar__fallback', 'aria-label': p.alt }, p.fallback));
  }

  var FieldCtx = React.createContext(null);
  function Field(p) {
    var gen = 'field-' + React.useId().replace(/:/g, '');
    var id = p.controlId || gen, parts = React.useState({ description: false, error: false });
    var register = React.useCallback(function (part, on) { parts[1](function (cur) { if (cur[part] === on) return cur; var n = Object.assign({}, cur); n[part] = on; return n; }); }, []);
    var ctx = { id: id, invalid: !!p.invalid, required: !!p.required, parts: parts[0], register: register };
    return h(FieldCtx.Provider, { value: ctx }, h('div', Object.assign(omit(p, ['controlId', 'invalid', 'required', 'className']), { className: cx('pui-field', p.className), 'data-invalid': p.invalid || undefined })));
  }
  function FieldLabel(p) {
    var f = React.useContext(FieldCtx);
    return h('label', { htmlFor: f.id, className: 'pui-label' }, p.children, f.required ? null : h('span', { className: 'pui-optional' }, ' (optional)'));
  }
  function FieldControl(p) {
    var f = React.useContext(FieldCtx), child = React.Children.only(p.children);
    var by = [f.parts.description && f.id + '-description', f.invalid && f.parts.error && f.id + '-error'].filter(Boolean).join(' ');
    return React.cloneElement(child, { id: child.props.id || f.id, required: f.required || undefined, 'aria-invalid': f.invalid || undefined, 'aria-describedby': by || undefined });
  }
  function FieldDescription(p) {
    var f = React.useContext(FieldCtx);
    React.useEffect(function () { f.register('description', true); return function () { f.register('description', false); }; }, []);
    return h('p', { id: f.id + '-description', className: 'pui-field__description' }, p.children);
  }
  function FieldError(p) {
    var f = React.useContext(FieldCtx), visible = f.invalid && !!p.children;
    React.useEffect(function () { f.register('error', visible); return function () { f.register('error', false); }; }, [visible]);
    if (!visible) return null;
    return h('p', { id: f.id + '-error', className: 'pui-field__error' },
      h(Icon, { name: 'exclamation-circle' }), h('span', null, p.children));
  }
  function PasswordInput(p) {
    var st = React.useState(false), visible = st[0];
    var rest = omit(p, ['showLabel', 'hideLabel']);
    return h('div', { className: 'pui-password' },
      h(Input, Object.assign({ autoComplete: 'current-password' }, rest, { type: visible ? 'text' : 'password' })),
      h(Button, { variant: 'outline', 'aria-controls': p.id, onClick: function () { st[1](!visible); } },
        h(Icon, { name: visible ? 'eye-slash' : 'eye' }),
        visible ? (p.hideLabel || 'Hide password') : (p.showLabel || 'Show password')));
  }

  var api = { Icon: Icon, Field: Field, FieldLabel: FieldLabel, FieldControl: FieldControl, FieldDescription: FieldDescription, FieldError: FieldError, PasswordInput: PasswordInput, Button: Button, Badge: Badge, Input: Input, Textarea: Textarea, Label: Label, Select: Select, Checkbox: Checkbox,
    Switch: Switch, Card: Card, CardHeader: CardHeader, CardTitle: CardTitle, CardDescription: CardDescription, CardContent: CardContent,
    CardFooter: CardFooter, Alert: Alert, AlertTitle: AlertTitle, AlertDescription: AlertDescription, Tabs: Tabs, TabsList: TabsList,
    TabsTrigger: TabsTrigger, TabsContent: TabsContent, Table: Table, TableHeader: TableHeader, TableBody: TableBody, TableRow: TableRow,
    TableHead: TableHead, TableCell: TableCell, TableCaption: TableCaption, Separator: Separator, Skeleton: Skeleton, Avatar: Avatar };
  window.PUI = Object.assign(window.PUI || {}, api);
})();
