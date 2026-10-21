var P = window.PUI, h = React.createElement;
  ReactDOM.createRoot(document.getElementById('preview')).render(h('div', { className: 'pui-row', style: { alignItems: 'flex-start' } },
    h('div', { className: 'pui-field', style: { flex: '1 1 220px' } },
      h(P.Label, { htmlFor: 'email' }, 'Email'),
      h(P.Input, { id: 'email', type: 'email', placeholder: 'you@company.com' }),
      h('span', { className: 'pui-muted' }, 'We send receipts here.')),
    h('div', { className: 'pui-field', style: { flex: '1 1 220px' } },
      h(P.Label, { htmlFor: 'username' }, 'Username'),
      h(P.Input, { id: 'username', defaultValue: 'maya', 'aria-invalid': 'true' }),
      h('span', { style: { color: 'var(--destructive)' } }, 'This username is taken. Try another one.'))));
