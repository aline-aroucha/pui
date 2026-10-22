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

## Accessibility
- A card is a visual grouping, not an ARIA role. A static card takes no focus just because it has a border.
- Use headings that fit the page outline for card titles, and a list when cards form a collection.
- Links navigate and buttons run actions. Don't nest a button or link inside another link; a secondary action (Favorite) never also opens the card's main destination.
- Name links so they identify the card ("View Pro plan", not a row of "Learn more"). If the whole card area extends a link, the focus ring must show that area.
- Informative images need useful alt text; decorative ones don't repeat the title.

_Adapted from Magoo 1.6.0 by Marcelo Sales: [Cards](https://magoo.cc/en/components/structure/cards.html) (`cards`). Magoo is educational guidance; test the behavior in your implementation._
