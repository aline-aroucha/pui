# Avatar

A person's photo or initials. Parts: `AvatarImage`, `AvatarFallback`.

```bash
npx @aline-aroucha/pui add avatar
```

## What you provide
- `AvatarImage` with `src` and `alt` = the person's name; `AvatarFallback` with two initials.
- `size`: `sm` | `default` (32px) | `lg`.
- Next to the avatar, the name in `font-medium` and a detail in `text-muted-foreground`.

## Accessibility
- The image `alt` is the person's name. When the name is already written next to the avatar, use `alt=""` so it isn't read twice.
- The fallback initials are not a substitute for the name in text.

_Adapted from Magoo 1.6.0 by Marcelo Sales: [Cards](https://magoo.cc/en/components/structure/cards.html) (`cards`). Magoo is educational guidance; test the behavior in your implementation._
