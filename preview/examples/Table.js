var P = window.PUI, h = React.createElement;
  var rows = [['#4821', 'Maya Chen', 'success', '✓ Paid', '$1,280.00'], ['#4822', 'Leo Park', 'warning', '! Pending', '$349.90'], ['#4823', 'Sara Diaz', 'destructive', '× Declined', '$2,015.50']];
  ReactDOM.createRoot(document.getElementById('preview')).render(h(P.Table, null,
    h(P.TableCaption, null, 'Orders, October 2026'),
    h(P.TableHeader, null, h(P.TableRow, null, h(P.TableHead, null, 'Order'), h(P.TableHead, null, 'Customer'), h(P.TableHead, null, 'Status'), h(P.TableHead, { className: 'num' }, 'Amount'))),
    h(P.TableBody, null, rows.map(function (r) { return h(P.TableRow, { key: r[0] },
      h(P.TableCell, { style: { fontWeight: 500 } }, r[0]), h(P.TableCell, null, r[1]), h(P.TableCell, null, h(P.Badge, { variant: r[2] }, r[3])), h(P.TableCell, { className: 'num' }, r[4])); }))));
