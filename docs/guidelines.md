# PUI — guia de uso

PUI é um design system construído sobre o [shadcn/ui](https://ui.shadcn.com): mesmos componentes, mesmos nomes de CSS variables, com a identidade PUI. Base neutra em cinza levemente esverdeado e **uma** cor de marca, o verde-petróleo `primary`. Tudo aqui foi escrito para ser seguido tanto por pessoas quanto por agentes de IA.

## Regras para agentes de IA

Leia esta seção antes de gerar qualquer interface PUI.

1. **Use os componentes do shadcn/ui** de `@/components/ui/*`. Instale o que faltar com `npx shadcn@latest add <nome>`. Não recrie Button, Input, Dialog etc. à mão.
2. **Cores só por token.** Use as classes semânticas do Tailwind geradas pelos tokens: `bg-background`, `text-foreground`, `bg-primary text-primary-foreground`, `text-muted-foreground`, `border-border`, `bg-success text-success-foreground`. **Nunca** use hex, `rgb()`, nem a paleta do Tailwind (`bg-teal-600`, `text-gray-500`, `bg-white`, `text-black`).
3. **Todo fundo tem seu par de texto.** `bg-primary` → `text-primary-foreground`; `bg-accent` → `text-accent-foreground`. Não coloque `text-white` sobre cor: no tema escuro o par é texto escuro.
4. **Dark mode é automático** pela classe `.dark` no `<html>`. Não escreva `dark:` com cores; os tokens já trocam.
5. **Espaçamento na escala de 4px:** `gap-2` (8), `gap-4` (16), `gap-6` (24), `gap-8` (32), `py-12` (48). Nada de valores arbitrários (`p-[13px]`).
6. **Raios:** `rounded-md` em controles, `rounded-lg` em alerts/popovers, `rounded-xl` em cards, `rounded-full` em avatares e switches.
7. **Uma ação primária por área.** As outras são `secondary`, `outline` ou `ghost`.
8. **Texto em português do Brasil**, sentence case, formatos locais (`R$ 1.280,00`, `21/10/2026`, `09:42`).
9. **Acessibilidade:** todo controle tem `Label`; botão só com ícone tem `aria-label`; status nunca só por cor (ícone ou palavra junto).
10. **Ícones:** `lucide-react`, 16px (`size-4`) em controles e 20px em títulos, `stroke-width` padrão.

## Cor

Neutros com um leve viés para o verde da marca, para não parecerem cinza de fábrica. A marca aparece pouco e com intenção: ação principal, item ativo, foco, links, série 1 dos gráficos.

| Token | Claro | Escuro | Uso |
| --- | --- | --- | --- |
| `background` | `#ffffff` | `#0a1110` | Fundo da página. Classe Tailwind: bg-background. |
| `foreground` | `#0d1615` | `#e6eeec` | Texto principal sobre background, card e popover (18:1 claro, 16:1 escuro). |
| `card` | `#ffffff` | `#101918` | Fundo de Card e painéis elevados. Classe: bg-card. |
| `card-foreground` | `{foreground}` | `{foreground}` | Texto dentro de card. |
| `popover` | `#ffffff` | `#101918` | Fundo de Popover, DropdownMenu, Select aberto, Tooltip claro. |
| `popover-foreground` | `{foreground}` | `{foreground}` | Texto dentro de popover. |
| `primary` | `#0b6b60` | `#45c4b0` | A cor da marca PUI (verde-petróleo). Ação principal, item ativo, links. Como texto, lê sobre background e card (6,4:1 / 8,9:1). Uma ação primária por área. |
| `primary-foreground` | `#f3fbf9` | `#032019` | Texto e ícones sobre primary (6,1:1 / 8:1). No escuro é texto escuro: nunca use branco fixo sobre primary. |
| `secondary` | `#f0f4f3` | `#1a2624` | Botões e superfícies secundárias. Classe: bg-secondary. |
| `secondary-foreground` | `#14211f` | `#e6eeec` | Texto sobre secondary. |
| `muted` | `#f0f4f3` | `#1a2624` | Fundos discretos: linhas de tabela em hover, Skeleton, áreas vazias. |
| `muted-foreground` | `#576865` | `#93a5a1` | Texto secundário, descrições, placeholders, metadados. Lê sobre background, card e muted (≥5,3:1). |
| `accent` | `#e3f1ee` | `#16302c` | Hover/realce de itens de menu, ghost buttons e linhas selecionadas. |
| `accent-foreground` | `#0e3c36` | `#c3ebe3` | Texto sobre accent (10:1). |
| `destructive` | `#c8321f` | `#f0715f` | Ações destrutivas e erros. Como texto, lê sobre background (5,3:1 / 6,6:1). |
| `destructive-foreground` | `#ffffff` | `#2a0804` | Texto sobre destructive. Adição PUI: o shadcn v4 não define esse par; aqui ele garante 4,5:1 no escuro. |
| `success` | `#13734a` | `#4cc38a` | Adição PUI. Estados de sucesso, confirmação. Sempre acompanhe com ícone ou palavra. |
| `success-foreground` | `#ffffff` | `#03200f` | Adição PUI. Texto sobre success. |
| `warning` | `#a35a00` | `#f0a54a` | Adição PUI. Avisos e estados pendentes. Sempre com ícone ou palavra. |
| `warning-foreground` | `#ffffff` | `#2a1600` | Adição PUI. Texto sobre warning. |
| `border` | `#dce4e2` | `#24332f` | Divisores e bordas de card. Decorativo: não carrega significado sozinho. |
| `input` | `#82928e` | `#56706b` | Borda de campos (Input, Select, Checkbox, Switch desligado). Mais forte que o shadcn padrão para chegar a 3:1. |
| `ring` | `{primary}` | `{primary}` | Anel de foco: 2px sólido + 2px de offset em background. ≥6:1 nos dois temas. |
| `chart-1` | `#0b6b60` | `#45c4b0` | Série 1 de gráficos (a marca). |
| `chart-2` | `#2f74b5` | `#6aa9e6` | Série 2 de gráficos. |
| `chart-3` | `#c9821f` | `#f0b257` | Série 3 de gráficos. |
| `chart-4` | `#7a52b3` | `#b08ae0` | Série 4 de gráficos. |
| `chart-5` | `#5b6b68` | `#a3b3af` | Série 5 de gráficos ("outros"). |

- Pares de texto checados: todo texto ≥ 4,5:1 sobre os fundos citados no uso, nos dois temas; bordas de campo (`input`) e anel de foco (`ring`) ≥ 3:1.
- `success`, `warning`, `destructive-foreground` e as variantes de Badge correspondentes são **adições PUI** ao shadcn, para status de registros.
- `border` é decorativo (≈1,3:1). Quando a borda delimita um controle, use `input`.
- Gráficos: `chart-1` … `chart-5` em ordem; diferem também em claridade, não só em matiz.

## Tipografia

**Geist** para interface e títulos, **Geist Mono** para código e números alinhados (as duas do Google Fonts, as mesmas do shadcn v4). Escala de interface base 14px (`text-sm`); páginas de conteúdo usam 16px com `leading-7`.

- Títulos `h1`–`h4` em `tracking-tight`, com `text-wrap: balance`. Um `h1` por tela.
- Interface: `body` (14/20). Labels: `label` (14/14, 500). Legendas e badges: `caption` (12/16).
- Números em colunas: `font-mono tabular-nums`, alinhados à direita.

## Espaçamento, raio e sombra

- Escala de 4px (`space-1` a `space-12`). Layout por `flex`/`grid` com `gap`, não por margens em cada filho.
- `--radius` = 0.5rem; `radius-sm` 4px, `radius-md` 6px, `radius-lg` 8px, `radius-xl` 12px, como o shadcn deriva.
- Sombras discretas: `shadow-xs` em controles, `shadow-sm` em cards, `shadow-md` em popovers, `shadow-lg` em diálogos. Separação de superfícies vem primeiro de `border`, depois de sombra.

## Estados

- **Foco:** anel sólido de 2px em `ring` com 2px de offset (`focus-visible:ring-2 ring-ring ring-offset-2`), visível só via teclado.
- **Hover:** primária escurece 10%; ghost/outline ganham `bg-accent text-accent-foreground`.
- **Desabilitado:** `opacity-50` e `pointer-events-none`. Explique por perto por que está desabilitado.
- **Erro:** `aria-invalid` + borda `destructive` + mensagem em `text-destructive` abaixo do campo.
- **Carregando:** `Skeleton` no formato do conteúdo; em botões, ícone `Loader2` girando + texto ("Salvando…").

## Voz e conteúdo

- Direto e calmo, como uma colega experiente. Você trata a pessoa por "você".
- Botões com verbos que dizem o resultado: "Salvar alterações", "Excluir projeto", "Exportar CSV". Evite "OK", "Enviar", "Clique aqui".
- Erros dizem o que aconteceu e como resolver, sem desculpas: "O cartão final 4821 expirou. Atualize a forma de pagamento."
- Sentence case em títulos e botões ("Detalhes da conta", não "Detalhes Da Conta"). Sem emoji na interface.
- Estados vazios dizem o que vai aparecer e como começar: "Nenhum pedido ainda. Os pedidos do ERP aparecem aqui após a primeira sincronização."

## Iconografia

Ícones da biblioteca [Lucide](https://lucide.dev) (`lucide-react`), a mesma do shadcn. Traço 2px, cantos arredondados, herdam `currentColor`. Não há logo PUI: o nome aparece em texto, Geist 800. Quando houver uma marca gráfica, ela entra no grupo de assets "Logos".

## Componentes

Os 15 componentes documentados aqui são os do shadcn/ui com as regras PUI: Button, Badge, Input, Textarea, Label, Select, Checkbox, Switch, Card, Alert, Tabs, Table, Separator, Skeleton, Avatar. Qualquer outro componente do shadcn (Dialog, DropdownMenu, Sheet, Sonner, Form, Command…) pode ser usado: ele herda os tokens PUI automaticamente.

## Como usar no código

1. Projeto com Next.js/Vite + Tailwind v4 + `npx shadcn@latest init`.
2. Substitua o `globals.css` pelo do repositório PUI (ou `npx shadcn@latest add <url-do-registry>/r/pui-theme.json`).
3. Copie `AGENTS.md` (e `CLAUDE.md`) para a raiz do projeto: é o que faz o Claude, Cursor e Copilot seguirem estas regras.
