# Card

Groups related content on a raised surface. Parts: `CardHeader`, `CardTitle`, `CardDescription`, `CardAction`, `CardContent` and `CardFooter`.

```bash
npx github:aline-aroucha/pui add card
```

## What you provide
- A short `CardTitle` (`card-title` style) and an optional one-sentence `CardDescription`.
- Content in `CardContent`; actions in `CardFooter`, primary on the right.

## Rules
- Padding comes from the component (24px = `space-6`). Don't add `p-*` to the Card.
- Don't nest a Card inside a Card. Inside a card, split blocks with `Separator` or `gap-6`.
- Card grids: `grid gap-4 md:grid-cols-2 lg:grid-cols-3`.
- Don't highlight a card with a colored side border; use a `Badge` in the header.
