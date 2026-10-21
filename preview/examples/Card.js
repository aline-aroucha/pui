var P = window.PUI, h = React.createElement;
  ReactDOM.createRoot(document.getElementById('preview')).render(h(P.Card, { style: { maxWidth: 380 } },
    h(P.CardHeader, null, h(P.CardTitle, null, 'Pro plan'), h(P.CardDescription, null, 'Billed monthly. Cancel anytime.')),
    h(P.CardContent, null, h('div', { style: { font: '800 30px/36px var(--font-sans)' } }, '$18', h('span', { className: 'pui-muted', style: { fontSize: 14, fontWeight: 400 } }, ' /month'))),
    h(P.CardFooter, null, h(P.Button, { variant: 'outline' }, 'Compare plans'), h(P.Button, null, 'Subscribe'))));
