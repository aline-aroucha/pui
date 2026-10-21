# Badge

Rótulo curto de status ou categoria. É o `Badge` do shadcn/ui com duas variantes extras do PUI: `success` e `warning`.

## O que você fornece
- `children`: 1–2 palavras. Para status, comece com um ícone ou símbolo (✓, !, ×) para que a cor não seja o único sinal.
- `variant`: `default` | `secondary` | `outline` | `destructive` | `success` | `warning`.

## Uso
- Status de registros em tabelas: `success` (pago, ativo), `warning` (pendente), `destructive` (recusado, erro), `secondary` (rascunho, inativo).
- Versões, tags e contagens: `outline`.
- Não use Badge como botão. Se for clicável, use `Button size="sm" variant="outline"`.

## Instalação das variantes PUI
Em `components/ui/badge.tsx`, adicione ao `cva`:
`success: "bg-success text-success-foreground"` e `warning: "bg-warning text-warning-foreground"`.
