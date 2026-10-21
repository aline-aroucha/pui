var P = window.PUI, h = React.createElement;
  ReactDOM.createRoot(document.getElementById('preview')).render(h('div', { className: 'pui-stage', style: { padding: 0 } },
    h('div', { className: 'pui-inline' }, h(P.Checkbox, { id: 'a', defaultChecked: true }), h(P.Label, { htmlFor: 'a' }, 'Receber resumo semanal')),
    h('div', { className: 'pui-inline' }, h(P.Checkbox, { id: 'b' }), h(P.Label, { htmlFor: 'b' }, 'Receber ofertas de parceiros')),
    h('div', { className: 'pui-inline' }, h(P.Checkbox, { id: 'c', disabled: true }), h(P.Label, { htmlFor: 'c' }, 'Exportação automática (plano Pro)'))));
