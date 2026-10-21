/* @ds-bundle: {"format":4,"namespace":"PUI","components":[{"name":"Button"},{"name":"Badge"},{"name":"Input"},{"name":"Textarea"},{"name":"Label"},{"name":"Select"},{"name":"Checkbox"},{"name":"Switch"},{"name":"Card"},{"name":"Alert"},{"name":"Tabs"},{"name":"Table"},{"name":"Separator"},{"name":"Skeleton"},{"name":"Avatar"}]} */
/* PUI: implementação de referência dos componentes shadcn/ui, só para as prévias da documentação.
   Em produto, use os componentes do shadcn (components/ui) com os tokens de globals.css. */
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
    var c = useControlled(p.checked, !!p.defaultChecked, p.onCheckedChange);
    return h('button', Object.assign(omit(p, ['checked', 'defaultChecked', 'onCheckedChange', 'className']), {
      type: 'button', role: 'checkbox', 'aria-checked': c[0], 'data-state': c[0] ? 'checked' : 'unchecked',
      className: cx('pui-checkbox', p.className), onClick: function () { if (!p.disabled) c[1](!c[0]); } }),
      c[0] ? h('svg', { viewBox: '0 0 24 24', 'aria-hidden': true }, h('path', { d: 'M20 6 9 17l-5-5' })) : null);
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
    return h('div', Object.assign({ role: 'alert' }, omit(p, ['variant', 'className']), { className: cx('pui-alert', 'pui-alert--' + (p.variant || 'default'), p.className) }));
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
  var TableHeader = slot('thead', ''), TableBody = slot('tbody', ''), TableRow = slot('tr', ''), TableHead = slot('th', ''), TableCell = slot('td', ''),
      TableCaption = slot('caption', 'pui-table__caption');
  function Separator(p) {
    var o = p.orientation || 'horizontal';
    return h('div', { role: 'separator', 'aria-orientation': o, className: cx('pui-separator', 'pui-separator--' + o, p.className) });
  }
  var Skeleton = slot('div', 'pui-skeleton');
  function Avatar(p) {
    var st = React.useState(false);
    return h('span', { className: cx('pui-avatar', p.className) },
      p.src && !st[0] ? h('img', { src: p.src, alt: p.alt || '', onError: function () { st[1](true); } })
        : h('span', { className: 'pui-avatar__fallback', 'aria-label': p.alt }, p.fallback));
  }

  var api = { Button: Button, Badge: Badge, Input: Input, Textarea: Textarea, Label: Label, Select: Select, Checkbox: Checkbox,
    Switch: Switch, Card: Card, CardHeader: CardHeader, CardTitle: CardTitle, CardDescription: CardDescription, CardContent: CardContent,
    CardFooter: CardFooter, Alert: Alert, AlertTitle: AlertTitle, AlertDescription: AlertDescription, Tabs: Tabs, TabsList: TabsList,
    TabsTrigger: TabsTrigger, TabsContent: TabsContent, Table: Table, TableHeader: TableHeader, TableBody: TableBody, TableRow: TableRow,
    TableHead: TableHead, TableCell: TableCell, TableCaption: TableCaption, Separator: Separator, Skeleton: Skeleton, Avatar: Avatar };
  window.PUI = Object.assign(window.PUI || {}, api);
})();
