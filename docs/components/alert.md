# Alert

Persistent message inside the page. Parts: `AlertTitle`, `AlertDescription`.

```bash
npx github:aline-aroucha/pui add alert
```

## What you provide
- `variant`: `default` | `destructive`.
- A 16px `lucide-react` icon as the first child (the Alert positions it).
- `AlertTitle`: what happened. `AlertDescription`: what to do now.

## Usage
- For short-lived feedback after an action, use a toast, not an Alert.
- Errors state the problem and the fix, without apologizing ("The card has expired. Update your payment method.").

## Accessibility
- PUI announces by urgency: the `destructive` variant uses `role="alert"`; the default variant uses `role="status"`, so it doesn't interrupt reading. Pass `role` to override when needed.
- Reading an alert needs no interaction and the alert never takes focus just to be read. `Tab` reaches only the links and buttons inside it.
- The type is clear without color or icon alone: the title says what happened and the description says what to do.
- Dismissible alerts have a visible close button; after closing, focus moves to a predictable place.
- Errors about a field belong next to that field (`FieldError`), not only in an alert.

_Adapted from Magoo 1.6.0 by Marcelo Sales: [Alerts](https://magoo.cc/en/components/messages/alerts.html) (`alertas`). Magoo is educational guidance; test the behavior in your implementation._
