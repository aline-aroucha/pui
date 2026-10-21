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
