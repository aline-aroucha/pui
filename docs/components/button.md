# Button

Triggers an action.

```bash
npx github:aline-aroucha/pui add button
```

## What you provide
- `children`: a verb that says what happens ("Save changes", "Delete project"). Three words at most.
- `variant`: `default` | `secondary` | `outline` | `ghost` | `destructive` | `link`.
- `size`: `xs` (24px) | `sm` (32px) | `default` (36px) | `lg` (40px); icon-only: `icon-xs` | `icon-sm` | `icon` | `icon-lg` (requires `aria-label`).
- `asChild` to render an `<a>` / `<Link>` that looks like a button.

## When to use each variant
- `default` (primary): the main action. **One per visible area** (card, dialog, toolbar).
- `secondary`: supporting actions next to the main one.
- `outline`: neutral actions in toolbars, filters, export.
- `ghost`: low-emphasis actions in lists and menus; "Cancel" in dialogs.
- `destructive`: irreversible actions only. Always confirm with `AlertDialog`.
- `link`: navigation inside text.

## Do / don't
- Do: put a 16px `lucide-react` icon before the label; `gap-2` is built in.
- Do: in footers, secondary on the left, primary on the right.
- Don't: add loose color classes (`bg-teal-600`); change the look only through `variant`.
- Don't: place two `default` buttons side by side.
