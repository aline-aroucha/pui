var P = window.PUI, h = React.createElement;
  ReactDOM.createRoot(document.getElementById('preview')).render(h(P.Field, { required: true, style: { maxWidth: 420 } },
    h(P.FieldLabel, null, 'Password'),
    h(P.FieldControl, null, h(P.PasswordInput, { defaultValue: 'correct-horse' }))));
