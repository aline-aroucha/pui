# PUI — rules for AI agents

This project uses **PUI**, a design system on top of shadcn/ui + Tailwind v4.
Full documentation (tokens, components, live previews): https://aline-aroucha.github.io/pui
Local copy: `docs/guidelines.md`, `docs/components/*.md`, `tokens/tokens.json`.

## Always

- Use components from `@/components/ui/*`. If one is missing, run `npx github:aline-aroucha/pui add <component>`. Don't rebuild components PUI already has.
- Color **only** through semantic classes: `bg-background`, `text-foreground`, `bg-card`, `bg-primary text-primary-foreground`,
  `bg-secondary`, `bg-muted text-muted-foreground`, `bg-accent text-accent-foreground`, `bg-destructive text-destructive-foreground`,
  `bg-success text-success-foreground`, `bg-warning text-warning-foreground`, `border-border`, `border-input`, `ring-ring`,
  `fill-chart-1`…`fill-chart-5`.
- Every colored background uses its `*-foreground` pair for text.
- Spacing on the 4px scale: `gap-1 gap-2 gap-3 gap-4 gap-6 gap-8`, `p-4 p-6`, `py-12`.
- Radii: `rounded-md` (controls), `rounded-lg` (alert, popover, dialog), `rounded-xl` (card), `rounded-full` (avatar, switch).
- UI text: `text-sm`. Headings: `text-4xl/3xl/2xl/xl font-semibold tracking-tight` (h1 is `font-extrabold`).
- Numbers in tables: `text-right font-mono tabular-nums`. en-US format: `$1,280.00`, `Oct 21, 2026`.
- Icons: Heroicons (`@heroicons/react`). Micro `16/solid` with `size-4` in buttons and fields, Mini `20/solid` in menus and lists, Outline `24/outline` in navigation. Never `lucide-react`; swap the icons of any added shadcn component (see the table in `docs/guidelines.md`).
- UI copy in US English, sentence case, clear verbs on buttons ("Save changes").
- Accessibility: a `Label` on every field, `aria-label` on icon-only buttons, status shown with an icon or word besides color.

## Never

- Hex, `rgb()`, `hsl()` or Tailwind palette colors (`bg-teal-600`, `text-gray-500`, `bg-white`, `text-black`) in components.
- `dark:` to switch colors: the tokens already change with the `.dark` class.
- Arbitrary spacing or radius values (`p-[13px]`, `rounded-[10px]`).
- More than one `Button` with `variant="default"` in the same area.
- A Card inside a Card; a colored side border to highlight a card; emoji in the UI; gradients.

## Variants by intent

| Intent | Component |
| --- | --- |
| Main action | `<Button>` |
| Supporting action | `<Button variant="secondary">` or `"outline"` |
| Cancel / low emphasis | `<Button variant="ghost">` |
| Irreversible action | `<Button variant="destructive">` inside an `AlertDialog` |
| Status ok / pending / error | `<Badge variant="success" \| "warning" \| "destructive">` |
| Persistent message | `<Alert>` |
| Feedback after an action | `toast()` (Sonner) |
| Setting with immediate effect | `<Switch>` |
| Option saved with the form | `<Checkbox>` |
| Any form field (label, help, error) | `<Field>` + `FieldLabel`, `FieldControl`, `FieldDescription`, `FieldError` |
| Password | `<PasswordInput>` inside a `Field` |

## Behavior and accessibility (Magoo)

Behavior follows Magoo 1.6.0 (https://magoo.cc/en), by Marcelo Sales. Before building or changing any component, read its "Accessibility"
section in `docs/components/` and its Magoo page, or ask the Magoo MCP ("Use the Magoo MCP to check the Modal component's keyboard behavior").
For components PUI doesn't ship yet (modal, toasts, menu, tooltip, radio button, slider, pagination…), build them to their Magoo page.

- Visible hover, pressed and focus states; status never by color alone.
- `Enter` / `Space` act like native controls; arrows inside composite widgets (tabs, menus, listboxes); `Esc` closes overlays; predictable focus after closing.
- Name, role and state for every control. `role="alert"` only for critical messages, `role="status"` otherwise; never announce on every keystroke.
- Wrap every form control in `Field`: visible label, `aria-describedby` for help and errors, `aria-invalid` only after validation, values kept after an invalid submit, concrete error text.
- Don't disable a submit button as the only way to signal errors. Disabled buttons don't take focus.
- Respect `prefers-reduced-motion`; a loader always ends in content, an error with "Try again", or an empty state.

## When changing tokens

`tokens/tokens.json` is the source of truth. Update `src/styles/globals.css` and `registry.json` with the same values
and publish the documentation again. Keep contrast ≥ 4.5:1 for text and ≥ 3:1 for field borders and focus, in both themes.
