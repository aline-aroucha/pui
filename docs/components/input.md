# Input

Single-line text field.

```bash
npx @aline-aroucha/pui add input label
```

## What you provide
- A label, always: put the input inside `Field` (or link a `Label` through `htmlFor` / `id`). A placeholder never replaces a label.
- The right `type` (`email`, `tel`, `number`, `password`) for mobile keyboards and autofill.
- An optional `placeholder` with a real example ("you@company.com"), shown in `muted-foreground`.
- Errors: `aria-invalid="true"` plus a message below in `text-destructive` that says how to fix it.

## Layout
- Label and field in `grid gap-2`; fields stacked with `gap-4`.
- Helper text below in `text-sm text-muted-foreground`.
- For validation, pair the fields with `react-hook-form` + `zod`.

## Accessibility
- Wrap the field in `Field` so the label, instructions and error are tied to the input (`aria-describedby`, `aria-invalid`, `required`). The label stays visible after the field is filled; a placeholder is only an extra hint.
- State instructions, required status and limits before the person types. Clicking the label focuses the field.
- `Tab` / `Shift+Tab` follow the page order; native editing, selection, copy and paste always work. `Enter` runs the form's submit action.
- On an invalid value, keep what was typed and explain how to fix it ("Enter an email like name@example.com"), not "Invalid value". Don't show errors before the person had a chance to fill the field.
- `type="email"`: a valid format doesn't prove the address exists; accept one address unless the context needs `multiple`.
- `type="search"`: say whether search runs on submit or while typing; announce the number of results without moving focus; a "Clear search" control empties the field without submitting.
- For passwords, use `PasswordInput`.

_Adapted from Magoo 1.6.0 by Marcelo Sales: [Input "text"](https://magoo.cc/en/components/forms/input-text.html) (`input-text`), [Input "email"](https://magoo.cc/en/components/forms/input-email.html) (`input-email`), [Input "search"](https://magoo.cc/en/components/forms/input-search.html) (`input-search`), [Form validation](https://magoo.cc/en/components/messages/form-validation.html) (`validacao-formularios`). Magoo is educational guidance; test the behavior in your implementation._
