var P = window.PUI, h = React.createElement;
  ReactDOM.createRoot(document.getElementById('preview')).render(h(P.Tabs, { defaultValue: 'general' },
    h(P.TabsList, null, h(P.TabsTrigger, { value: 'general' }, 'General'), h(P.TabsTrigger, { value: 'team' }, 'Team'), h(P.TabsTrigger, { value: 'billing' }, 'Billing')),
    h(P.TabsContent, { value: 'general' }, 'Company name, logo and time zone.'),
    h(P.TabsContent, { value: 'team' }, '8 members, 2 pending invites.'),
    h(P.TabsContent, { value: 'billing' }, 'Next invoice on Nov 1, 2026.')));
