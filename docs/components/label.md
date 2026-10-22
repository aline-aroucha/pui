# Label

Label for a form control.

```bash
npx github:aline-aroucha/pui add label
```

## What you provide
- `htmlFor` pointing to the control's `id`. Clicking the label focuses or toggles the control.
- Sentence case, no colon: "Full name", not "Full Name:".
- Optional fields: add "(optional)" in `text-muted-foreground`. Don't mark required fields with an asterisk.

## Accessibility
- Every control has a label that is programmatically associated with it (`htmlFor` / `id`, or `FieldLabel` inside `Field`).
- Clicking or tapping the label focuses or toggles its control, so the label is part of the touch target.
- Inside `Field`, optional fields show "(optional)" automatically; required fields also get `required` on the control.

_Adapted from Magoo 1.6.0 by Marcelo Sales: [Input "text"](https://magoo.cc/en/components/forms/input-text.html) (`input-text`), [Checkbox](https://magoo.cc/en/components/forms/checkbox.html) (`checkbox`). Magoo is educational guidance; test the behavior in your implementation._
