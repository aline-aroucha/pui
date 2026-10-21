var P = window.PUI, h = React.createElement;
  ReactDOM.createRoot(document.getElementById('preview')).render(h('div', { className: 'pui-row', style: { alignItems: 'flex-start' } },
    h('div', { className: 'pui-field', style: { flex: '1 1 220px' } },
      h(P.Label, { htmlFor: 'email' }, 'E-mail'),
      h(P.Input, { id: 'email', type: 'email', placeholder: 'voce@empresa.com.br' }),
      h('span', { className: 'pui-muted' }, 'Usamos para enviar recibos.')),
    h('div', { className: 'pui-field', style: { flex: '1 1 220px' } },
      h(P.Label, { htmlFor: 'cpf' }, 'CPF'),
      h(P.Input, { id: 'cpf', defaultValue: '123.456.789-00', 'aria-invalid': 'true' }),
      h('span', { style: { color: 'var(--destructive)' } }, 'CPF inválido. Confira os dígitos.'))));
