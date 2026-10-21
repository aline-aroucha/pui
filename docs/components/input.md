# Input

Single-line text field.

```bash
npx github:aline-aroucha/pui add input label
```

## What you provide
- A `Label` linked through `htmlFor` / `id`. Always. A placeholder never replaces a label.
- The right `type` (`email`, `tel`, `number`, `password`) for mobile keyboards and autofill.
- An optional `placeholder` with a real example ("you@company.com"), shown in `muted-foreground`.
- Errors: `aria-invalid="true"` plus a message below in `text-destructive` that says how to fix it.

## Layout
- Label and field in `grid gap-2`; fields stacked with `gap-4`.
- Helper text below in `text-sm text-muted-foreground`.
- For validation, pair the fields with `react-hook-form` + `zod`.
