var P = window.PUI, h = React.createElement;
  ReactDOM.createRoot(document.getElementById('preview')).render(h('div', { className: 'pui-field', style: { maxWidth: 420 } },
    h(P.Label, { htmlFor: 'notes' }, 'Notes'),
    h(P.Textarea, { id: 'notes', placeholder: 'E.g. deliver after 2 PM' })));
