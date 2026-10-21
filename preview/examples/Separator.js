var P = window.PUI, h = React.createElement;
  ReactDOM.createRoot(document.getElementById('preview')).render(h('div', null,
    h('div', { style: { fontWeight: 600 } }, 'Configurações da conta'), h('div', { className: 'pui-muted' }, 'Perfil, segurança e notificações.'),
    h(P.Separator, { style: { margin: '12px 0' } }),
    h('div', { className: 'pui-row', style: { height: 20 } }, 'Perfil', h(P.Separator, { orientation: 'vertical' }), 'Segurança', h(P.Separator, { orientation: 'vertical' }), 'Notificações')));
