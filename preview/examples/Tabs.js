var P = window.PUI, h = React.createElement;
  ReactDOM.createRoot(document.getElementById('preview')).render(h(P.Tabs, { defaultValue: 'geral' },
    h(P.TabsList, null, h(P.TabsTrigger, { value: 'geral' }, 'Geral'), h(P.TabsTrigger, { value: 'equipe' }, 'Equipe'), h(P.TabsTrigger, { value: 'cobranca' }, 'Cobrança')),
    h(P.TabsContent, { value: 'geral' }, 'Nome, logo e fuso horário da empresa.'),
    h(P.TabsContent, { value: 'equipe' }, '8 membros, 2 convites pendentes.'),
    h(P.TabsContent, { value: 'cobranca' }, 'Próxima fatura em 01/11/2026.')));
