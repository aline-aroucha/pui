var P = window.PUI, h = React.createElement;
  ReactDOM.createRoot(document.getElementById('preview')).render(h('div', { className: 'pui-stage', style: { padding: 0 } },
    h(P.Alert, null, h(P.AlertTitle, null, 'Sync complete'), h(P.AlertDescription, null, '1,240 orders imported from the ERP at 9:42 AM.')),
    h(P.Alert, { variant: 'destructive' }, h(P.AlertTitle, null, 'Payment declined'), h(P.AlertDescription, null, 'The card ending in 4821 has expired. Update your payment method.'))));
