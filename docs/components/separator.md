# Separator

A 1px divider in `border`.

```bash
npx github:aline-aroucha/pui add separator
```

## What you provide
- `orientation`: `horizontal` (default) | `vertical`. Margins come from the parent layout (`my-4`, `gap-4`).
- Prefer space (`gap-6`) over lines. Use a Separator when space alone doesn't separate the groups.

## Accessibility
- A separator is decorative by default and hidden from screen readers. Structure comes from headings, lists and landmarks, not from lines.
- Use `decorative={false}` only when the line separates groups whose boundary isn't conveyed any other way.

_Adapted from Magoo 1.6.0 by Marcelo Sales: [Page regions](https://magoo.cc/en/components/structure/page-regions.html) (`regioes-pagina`). Magoo is educational guidance; test the behavior in your implementation._
