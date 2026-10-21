var P = window.PUI, h = React.createElement;
  ReactDOM.createRoot(document.getElementById('preview')).render(h(P.Card, { style: { maxWidth: 380 } },
    h(P.CardHeader, null, h(P.CardTitle, null, 'Plano Pro'), h(P.CardDescription, null, 'Cobrança mensal, cancele quando quiser.')),
    h(P.CardContent, null, h('div', { style: { font: '800 30px/36px var(--font-sans)' } }, 'R$ 89', h('span', { className: 'pui-muted', style: { fontSize: 14, fontWeight: 400 } }, ' /mês'))),
    h(P.CardFooter, null, h(P.Button, { variant: 'outline' }, 'Comparar planos'), h(P.Button, null, 'Assinar'))));
