# Switch

Turns a setting on or off with immediate effect.

```bash
npx @aline-aroucha/pui add switch
```

## What you provide
- `id` + `Label`; `checked` / `onCheckedChange`. `size`: `sm` | `default`.
- The label names the setting, not the action: "Email notifications", not "Turn on notifications".
- If the change only applies after "Save", use `Checkbox`.

## Accessibility
- For binary settings that take effect immediately; if the change needs confirmation, use a checkbox in a form.
- The label names the setting and never changes with the state, so the announced name stays stable.
- Clicking the switch or its label toggles it; hover gives feedback. `Tab` reaches it and `Space` toggles it.
- Screen readers hear the label, the switch role and the on/off state; there is no mixed state.

_Adapted from Magoo 1.6.0 by Marcelo Sales: [Switch](https://magoo.cc/en/components/forms/switch.html) (`switch`). Magoo is educational guidance; test the behavior in your implementation._
