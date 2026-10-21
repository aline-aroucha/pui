# Card

Agrupa conteúdo relacionado numa superfície elevada. É o `Card` do shadcn/ui com as partes `CardHeader`, `CardTitle`, `CardDescription`, `CardAction`, `CardContent` e `CardFooter`.

## O que você fornece
- `CardTitle` curto (estilo `card-title`), `CardDescription` opcional em uma frase.
- Conteúdo em `CardContent`; ações em `CardFooter`, primária à direita.

## Regras
- Padding vem do componente (24px = `space-6`). Não adicione `p-*` no Card.
- Não aninhe Card dentro de Card. Dentro de um card, separe blocos com `Separator` ou `gap-6`.
- Grades de cards: `grid gap-4 md:grid-cols-2 lg:grid-cols-3`.
- Não use borda colorida lateral para destacar um card; use `Badge` no header.
