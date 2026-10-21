var P = window.PUI, h = React.createElement;
  ReactDOM.createRoot(document.getElementById('preview')).render(h('div', { className: 'pui-field' },
    h(P.Label, { htmlFor: 'uf' }, 'Estado'),
    h(P.Select, { id: 'uf', defaultValue: 'SP', options: [
      { value: 'BA', label: 'Bahia' }, { value: 'MG', label: 'Minas Gerais' },
      { value: 'RJ', label: 'Rio de Janeiro' }, { value: 'SP', label: 'São Paulo' }] })));
