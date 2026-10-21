var P = window.PUI, h = React.createElement;
  ReactDOM.createRoot(document.getElementById('preview')).render(h('div', { className: 'pui-stage', style: { padding: 0 } },
    h(P.Alert, null, h(P.AlertTitle, null, 'Sincronização concluída'), h(P.AlertDescription, null, '1.240 pedidos importados do ERP às 09:42.')),
    h(P.Alert, { variant: 'destructive' }, h(P.AlertTitle, null, 'Pagamento recusado'), h(P.AlertDescription, null, 'O cartão final 4821 expirou. Atualize a forma de pagamento.'))));
