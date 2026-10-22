/* @ds-bundle: {"format":4,"namespace":"PUI","components":[{"name":"Button"},{"name":"Badge"},{"name":"Field"},{"name":"Input"},{"name":"PasswordInput"},{"name":"Textarea"},{"name":"Label"},{"name":"Select"},{"name":"Checkbox"},{"name":"Switch"},{"name":"Card"},{"name":"Alert"},{"name":"Tabs"},{"name":"Table"},{"name":"Separator"},{"name":"Skeleton"},{"name":"Avatar"}]} */
/* PUI: lightweight reference implementation used only by the documentation previews.
   In products, install the real components with `npx github:aline-aroucha/pui add <name>`. */
(function () {
  var React = window.React, h = React.createElement;
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
      h('svg', { viewBox: '0 0 24 24', 'aria-hidden': true }, h('path', { d: 'm6 9 6 6 6-6' })));
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
      c[0] ? h('svg', { viewBox: '0 0 24 24', 'aria-hidden': true }, h('path', { d: c[0] === 'indeterminate' ? 'M5 12h14' : 'M20 6 9 17l-5-5' })) : null);
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
      h('svg', { viewBox: '0 0 24 24', 'aria-hidden': true }, h('circle', { cx: 12, cy: 12, r: 10 }), h('path', { d: 'M12 8v4M12 16h.01' })), h('span', null, p.children));
  }
  function PasswordInput(p) {
    var st = React.useState(false), visible = st[0];
    var rest = omit(p, ['showLabel', 'hideLabel']);
    return h('div', { className: 'pui-password' },
      h(Input, Object.assign({ autoComplete: 'current-password' }, rest, { type: visible ? 'text' : 'password' })),
      h(Button, { variant: 'outline', 'aria-controls': p.id, onClick: function () { st[1](!visible); } },
        h('svg', { viewBox: '0 0 24 24', 'aria-hidden': true }, visible
          ? [h('path', { key: 1, d: 'M3 3l18 18' }), h('path', { key: 2, d: 'M10.6 5.1A10 10 0 0 1 22 12a13 13 0 0 1-2.2 3.2M6.6 6.6A13 13 0 0 0 2 12s3.5 7 10 7a10 10 0 0 0 5.4-1.6' })]
          : [h('path', { key: 1, d: 'M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z' }), h('circle', { key: 2, cx: 12, cy: 12, r: 3 })]),
        visible ? (p.hideLabel || 'Hide password') : (p.showLabel || 'Show password')));
  }

  var api = { Field: Field, FieldLabel: FieldLabel, FieldControl: FieldControl, FieldDescription: FieldDescription, FieldError: FieldError, PasswordInput: PasswordInput, Button: Button, Badge: Badge, Input: Input, Textarea: Textarea, Label: Label, Select: Select, Checkbox: Checkbox,
    Switch: Switch, Card: Card, CardHeader: CardHeader, CardTitle: CardTitle, CardDescription: CardDescription, CardContent: CardContent,
    CardFooter: CardFooter, Alert: Alert, AlertTitle: AlertTitle, AlertDescription: AlertDescription, Tabs: Tabs, TabsList: TabsList,
    TabsTrigger: TabsTrigger, TabsContent: TabsContent, Table: Table, TableHeader: TableHeader, TableBody: TableBody, TableRow: TableRow,
    TableHead: TableHead, TableCell: TableCell, TableCaption: TableCaption, Separator: Separator, Skeleton: Skeleton, Avatar: Avatar };
  window.PUI = Object.assign(window.PUI || {}, api);
})();
