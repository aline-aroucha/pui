var P = window.PUI, h = React.createElement;
  ReactDOM.createRoot(document.getElementById('preview')).render(h('div', null,
    h('div', { style: { fontWeight: 600 } }, 'Account settings'), h('div', { className: 'pui-muted' }, 'Profile, security and notifications.'),
    h(P.Separator, { style: { margin: '12px 0' } }),
    h('div', { className: 'pui-row', style: { height: 20 } }, 'Profile', h(P.Separator, { orientation: 'vertical' }), 'Security', h(P.Separator, { orientation: 'vertical' }), 'Notifications')));
