# Checkbox

Turns an option on or off; it takes effect when the form is saved.

```bash
npx github:aline-aroucha/pui add checkbox
```

## What you provide
- `id` + `Label htmlFor`; `checked` / `onCheckedChange` (controlled) or `defaultChecked`.
- For an immediate effect (no Save button), use `Switch`.
- Checkbox lists: `grid gap-3`; label to the right of the control with `gap-2`.

## Accessibility
- For independent choices; when only one option of a group can be chosen, use radio buttons.
- The label is associated and clickable, so it is part of the touch target. Hover, checked, unchecked, mixed and disabled states are distinct.
- `Tab` moves to each checkbox and `Space` toggles it. Disabled checkboxes do nothing.
- Screen readers hear the label, the role and the state (checked, unchecked or mixed). For a mixed parent, set `checked="indeterminate"` and document the toggle order.
- Group related checkboxes in a `<fieldset>` with a `<legend>` that names the group.

_Adapted from Magoo 1.6.0 by Marcelo Sales: [Checkbox](https://magoo.cc/en/components/forms/checkbox.html) (`checkbox`). Magoo is educational guidance; test the behavior in your implementation._
