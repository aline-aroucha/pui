# Textarea

Multi-line text field. The `Input` rules apply.

```bash
npx @aline-aroucha/pui add textarea
```

## What you provide
- A linked `Label`, a `placeholder` with a real example, optional `rows`.
- If there is a character limit, show the counter below in `text-muted-foreground`.

## Accessibility
- Same rules as `Input`: wrap it in `Field`, keep a visible label, tie instructions and errors to it, and keep the typed text after an invalid submit.
- `Enter` adds a new line here; the form is submitted with its button.
- Announce a character limit before typing; when showing a live counter, don't announce every keystroke.

_Adapted from Magoo 1.6.0 by Marcelo Sales: [Input "text"](https://magoo.cc/en/components/forms/input-text.html) (`input-text`), [Form validation](https://magoo.cc/en/components/messages/form-validation.html) (`validacao-formularios`). Magoo is educational guidance; test the behavior in your implementation._
