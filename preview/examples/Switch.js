var P = window.PUI, h = React.createElement;
  ReactDOM.createRoot(document.getElementById('preview')).render(h('div', { className: 'pui-row' },
    h('div', { className: 'pui-inline' }, h(P.Switch, { id: 's1', defaultChecked: true }), h(P.Label, { htmlFor: 's1' }, 'Notificações por e-mail')),
    h('div', { className: 'pui-inline' }, h(P.Switch, { id: 's2' }), h(P.Label, { htmlFor: 's2' }, 'Modo escuro'))));
