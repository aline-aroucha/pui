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
- Do: put a 16px Heroicons Micro icon (`@heroicons/react/16/solid`) before the label; `gap-2` is built in.
- Do: in footers, secondary on the left, primary on the right.
- Don't: add loose color classes (`bg-teal-600`); change the look only through `variant`.
- Don't: place two `default` buttons side by side.

## Accessibility
- Built as a `<button>`. If it runs an action on the same screen it is a button, even when it looks like a link; if it navigates, use a link (`asChild` with `<a>`).
- Hover, pressed and keyboard focus each give visible feedback; focus shows a solid 2px ring.
- `Enter` and `Space` activate it; the person can perceive that the action ran (a toast, a state change, a new screen).
- A disabled button does not take keyboard focus and does nothing. Say nearby what is needed to enable it; don't disable a submit button as the only way to signal errors.
- The accessible name states the goal without ambiguity, also when several buttons share a screen. Icon-only buttons need `aria-label`.
- A button that opens a menu or hidden content exposes its state with `aria-expanded` (and `aria-controls`).

_Adapted from Magoo 1.6.0 by Marcelo Sales: [Button](https://magoo.cc/en/components/forms/button.html) (`botao`). Magoo is educational guidance; test the behavior in your implementation._
