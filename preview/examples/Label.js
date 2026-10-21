var P = window.PUI, h = React.createElement;
  ReactDOM.createRoot(document.getElementById('preview')).render(h('div', { className: 'pui-inline' },
    h(P.Checkbox, { id: 'terms', defaultChecked: true }),
    h(P.Label, { htmlFor: 'terms' }, 'Aceito os termos de uso')));
