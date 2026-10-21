# Select

Pick one option from a list. It opens a styled, keyboard-accessible list; the preview above shows its closed state.

```bash
npx github:aline-aroucha/pui add select
```

## What you provide
- `Select` > `SelectTrigger` (`SelectValue` inside) + `SelectContent` with one `SelectItem` per option. `size`: `sm` | `default`.
- A linked `Label`; options with short labels in a logical order (alphabetical, or by frequency).
- Up to ~15 options. Beyond that, use a `Combobox` (Popover + Command) with search.
- Two to four options that should stay visible: prefer `RadioGroup` or `Tabs`.
