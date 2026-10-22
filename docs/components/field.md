# Field

Ties a label, instructions and an error message to one form control, so they are announced together.

```bash
npx @aline-aroucha/pui add field
```

## What you provide
- `Field` with `required` and `invalid` (set `invalid` after validation finds a problem, not before the person had a chance to type). `controlId` is optional; one is generated.
- `FieldLabel`: the visible label. Optional fields get "(optional)" automatically.
- `FieldControl`: wraps exactly one control (`Input`, `Textarea`, `PasswordInput`, `SelectTrigger`) and gives it `id`, `required`, `aria-invalid` and `aria-describedby`.
- `FieldDescription`: instructions, formats and limits, shown before the person types.
- `FieldError`: what is wrong and how to fix it. Rendered only while `invalid` is true.

## Usage
- Error messages are concrete: "Enter an email like name@example.com", not "Invalid value". Tell empty, wrong format and business rules apart; a server failure is not a field error.
- Keep the values after an invalid submit. Move focus to an error summary or to the first invalid field, and never put passwords in messages.
- Don't announce the same error through focus and a live region at once.

## Accessibility
- The label stays visible and is associated with the control; instructions and the error are linked through `aria-describedby`, and `aria-invalid` is set only while an error is detected.
- Required fields get `required`; errors are written in text, never only as a red border or an icon.
- After a rejected submit, focus goes to an error summary (with links to each field) or to the first invalid field. When fixed, the message and `aria-invalid` are removed without clearing other errors.
- Validating while typing keeps focus and input intact and doesn't announce on every key.

_Adapted from Magoo 1.6.0 by Marcelo Sales: [Form validation](https://magoo.cc/en/components/messages/form-validation.html) (`validacao-formularios`), [Input "text"](https://magoo.cc/en/components/forms/input-text.html) (`input-text`). Magoo is educational guidance; test the behavior in your implementation._
