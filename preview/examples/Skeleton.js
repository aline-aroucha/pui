var P = window.PUI, h = React.createElement;
  ReactDOM.createRoot(document.getElementById('preview')).render(h('div', { className: 'pui-inline', style: { gap: 16 } },
    h(P.Skeleton, { style: { width: 40, height: 40, borderRadius: 9999 } }),
    h('div', { style: { display: 'grid', gap: 8 } }, h(P.Skeleton, { style: { width: 220, height: 16 } }), h(P.Skeleton, { style: { width: 160, height: 16 } }))));
