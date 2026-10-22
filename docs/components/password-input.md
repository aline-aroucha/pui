# PasswordInput

Password field with a button that shows or hides the characters.

```bash
npx github:aline-aroucha/pui add password-input
```

## What you provide
- The same props as `Input` (no `type`). Use it inside `Field` for the label, rules and errors.
- `autoComplete`: `"current-password"` (default) to sign in, `"new-password"` when creating one.
- `showLabel` / `hideLabel` to translate the button text ("Show password" / "Hide password").

## Usage
- Never block paste or password managers. State the password rules before typing.

## Accessibility
- The password starts hidden and the button says the next action: "Show password", then "Hide password". The icon follows the text and is hidden from screen readers.
- The button is `type="button"`: it never submits the form, keeps focus after activation and keeps the value. It has no `aria-pressed`, because its name already changes.
- Showing the password doesn't announce it in any extra message.

_Adapted from Magoo 1.6.0 by Marcelo Sales: [Input "password"](https://magoo.cc/en/components/forms/input-password.html) (`input-password`). Magoo is educational guidance; test the behavior in your implementation._
