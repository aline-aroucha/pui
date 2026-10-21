# Badge

Short status or category label.

```bash
npx github:aline-aroucha/pui add badge
```

## What you provide
- `children`: one or two words. For status, start with an icon or symbol (✓, !, ×) so color is never the only signal.
- `variant`: `default` | `secondary` | `outline` | `ghost` | `link` | `destructive` | `success` | `warning`.

## Usage
- Record status in tables: `success` (paid, active), `warning` (pending), `destructive` (declined, error), `secondary` (draft, inactive).
- Versions, tags and counts: `outline`.
- Don't use a Badge as a button. If it is clickable, use `Button size="sm" variant="outline"`.
