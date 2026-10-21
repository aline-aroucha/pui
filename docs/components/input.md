# Input

Campo de texto de uma linha. É o `Input` do shadcn/ui.

## O que você fornece
- Um `Label` associado via `htmlFor` / `id`. Sempre. Placeholder não substitui label.
- `type` correto (`email`, `tel`, `number`, `password`) para teclado móvel e autofill.
- `placeholder` opcional com um exemplo real ("voce@empresa.com.br"), em `muted-foreground`.
- Erro: `aria-invalid="true"` + mensagem abaixo em `text-destructive` dizendo como corrigir.

## Layout
- Campo + label em `grid gap-2`; campos entre si `gap-4`.
- Texto de ajuda abaixo em `text-sm text-muted-foreground`.
- Em formulários do shadcn, prefira os componentes `Form` / `Field` com `react-hook-form` + `zod`.
