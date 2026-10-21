var P = window.PUI, h = React.createElement;
  ReactDOM.createRoot(document.getElementById('preview')).render(h('div', { className: 'pui-row' },
    h(P.Avatar, { fallback: 'AS', alt: 'Ana Souza' }),
    h(P.Avatar, { fallback: 'BL', alt: 'Bruno Lima' }),
    h('div', { className: 'pui-inline' }, h(P.Avatar, { fallback: 'CD', alt: 'Carla Dias' }),
      h('div', null, h('div', { style: { fontWeight: 500 } }, 'Carla Dias'), h('div', { className: 'pui-muted' }, 'carla@empresa.com.br')))));
