# Button

Dispara uma ação. É o `Button` do shadcn/ui (`npx shadcn@latest add button`), com as cores PUI vindas dos tokens.

## O que você fornece
- `children`: um verbo no infinitivo ou imperativo que diz o que acontece ("Salvar alterações", "Excluir projeto"). Até 3 palavras.
- `variant`: `default` | `secondary` | `outline` | `ghost` | `destructive` | `link`.
- `size`: `default` (36px) | `sm` (32px) | `lg` (40px) | `icon` (36×36, exige `aria-label`).
- `asChild` (no shadcn) para renderizar um `<a>` / `<Link>` com o visual de botão.

## Quando usar cada variante
- `default` (primary): a ação principal. **Uma por área visível** (card, diálogo, toolbar).
- `secondary`: ações de apoio ao lado da principal.
- `outline`: ações neutras em toolbars, filtros, exportar.
- `ghost`: ações de baixa ênfase em listas e menus; "Cancelar" em diálogos.
- `destructive`: só para ações irreversíveis. Sempre confirme com `AlertDialog`.
- `link`: navegação dentro de texto.

## Faça / não faça
- Faça: ícone `lucide-react` de 16px à esquerda do texto, com `gap-2` automático.
- Faça: ordem nos rodapés = secundária à esquerda, primária à direita.
- Não faça: classes de cor soltas (`bg-teal-600`); mude a aparência só por `variant`.
- Não faça: dois botões `default` lado a lado.
