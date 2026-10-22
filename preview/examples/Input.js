var P = window.PUI, h = React.createElement;
  ReactDOM.createRoot(document.getElementById('preview')).render(h('div', { className: 'pui-row', style: { alignItems: 'flex-start' } },
    h('div', { className: 'pui-field', style: { flex: '1 1 220px' } },
      h(P.Label, { htmlFor: 'email' }, 'Email'),
      h(P.Input, { id: 'email', type: 'email', placeholder: 'you@company.com' }),
      h('span', { className: 'pui-muted' }, 'We send receipts here.')),
    h(P.Field, { required: true, invalid: true, style: { flex: '1 1 220px' } },
      h(P.FieldLabel, null, 'Username'),
      h(P.FieldControl, null, h(P.Input, { defaultValue: 'maya' })),
      h(P.FieldError, null, 'This username is taken. Try another one.'))));
