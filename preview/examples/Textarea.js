var P = window.PUI, h = React.createElement;
  ReactDOM.createRoot(document.getElementById('preview')).render(h('div', { className: 'pui-field', style: { maxWidth: 420 } },
    h(P.Label, { htmlFor: 'msg' }, 'Observações'),
    h(P.Textarea, { id: 'msg', placeholder: 'Ex.: entregar após as 14h' })));
