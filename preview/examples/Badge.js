var P = window.PUI, h = React.createElement;
  ReactDOM.createRoot(document.getElementById('preview')).render(h('div', { className: 'pui-row' },
    h(P.Badge, null, 'Novo'),
    h(P.Badge, { variant: 'secondary' }, 'Rascunho'),
    h(P.Badge, { variant: 'outline' }, 'v2.4.0'),
    h(P.Badge, { variant: 'success' }, '✓ Pago'),
    h(P.Badge, { variant: 'warning' }, '! Pendente'),
    h(P.Badge, { variant: 'destructive' }, '× Recusado')));
