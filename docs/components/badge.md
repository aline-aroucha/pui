# Badge

Short status or category label.

```bash
npx @aline-aroucha/pui add badge
```

## What you provide
- `children`: one or two words. For status, start with an icon or symbol (✓, !, ×) so color is never the only signal.
- `variant`: `default` | `secondary` | `outline` | `ghost` | `link` | `destructive` | `success` | `warning`.

## Usage
- Record status in tables: `success` (paid, active), `warning` (pending), `destructive` (declined, error), `secondary` (draft, inactive).
- Versions, tags and counts: `outline`.
- Don't use a Badge as a button. If it is clickable, use `Button size="sm" variant="outline"`.

## Accessibility
- A badge is static text: it takes no focus and needs no interaction.
- Status never relies on color alone: start the label with a symbol or word ("✓ Paid", "! Pending").
- When a status changes while the person is on the page, announce it in a `role="status"` region, not by re-rendering the badge alone.

_Adapted from Magoo 1.6.0 by Marcelo Sales: [Alerts](https://magoo.cc/en/components/messages/alerts.html) (`alertas`). Magoo is educational guidance; test the behavior in your implementation._
