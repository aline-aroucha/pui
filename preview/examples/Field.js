var P = window.PUI, h = React.createElement;
  function Demo() {
    var s = React.useState('maya@'), v = s[0];
    var invalid = !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v);
    return h('div', { className: 'pui-stage', style: { padding: 0, maxWidth: 360 } },
      h(P.Field, { required: true, invalid: invalid },
        h(P.FieldLabel, null, 'Email'),
        h(P.FieldControl, null, h(P.Input, { type: 'email', value: v, onChange: function (e) { s[1](e.target.value); } })),
        h(P.FieldDescription, null, 'We send receipts here.'),
        h(P.FieldError, null, 'Enter an email like name@example.com.')),
      h(P.Field, null,
        h(P.FieldLabel, null, 'Company'),
        h(P.FieldControl, null, h(P.Input, { placeholder: 'E.g. Acme Inc.' }))));
  }
  ReactDOM.createRoot(document.getElementById('preview')).render(h(Demo));
