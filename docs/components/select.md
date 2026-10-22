# Select

Pick one option from a list. It opens a styled, keyboard-accessible list; the preview above shows its closed state.

```bash
npx github:aline-aroucha/pui add select
```

## What you provide
- `Select` > `SelectTrigger` (`SelectValue` inside) + `SelectContent` with one `SelectItem` per option. `size`: `sm` | `default`.
- A linked `Label`; options with short labels in a logical order (alphabetical, or by frequency).
- Up to ~15 options. Beyond that, use an Autocomplete (combobox) with search.
- Two to four options that should stay visible: prefer `RadioGroup` or `Tabs`.

## Accessibility
- The field has a persistent label (use `Field`); help and errors are tied to it. A placeholder never replaces the label.
- Hover and focus give visible feedback. Clicking the field opens the list; choosing an option updates the visible value; clicking outside closes it.
- Keyboard: `Tab` reaches the field; `Enter`, `Space` or arrows open it; arrows move between options; `Enter` confirms; `Esc` closes without changing the value; focus is never trapped.
- Screen readers hear the label, the current value and that options are available. The list follows the listbox pattern; never put buttons or links inside options.
- To search through options, use an Autocomplete (combobox) pattern instead; for a few options that should stay visible, use radio buttons or checkboxes.

_Adapted from Magoo 1.6.0 by Marcelo Sales: [Select](https://magoo.cc/en/components/forms/select.html) (`select`), [Autocomplete](https://magoo.cc/en/components/forms/autocomplete.html) (`autocomplete`). Magoo is educational guidance; test the behavior in your implementation._
