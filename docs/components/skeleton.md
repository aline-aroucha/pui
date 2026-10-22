# Skeleton

Loading placeholder shaped like the content that is on its way.

```bash
npx github:aline-aroucha/pui add skeleton
```

## What you provide
- Size through classes (`h-4 w-[220px]`, `size-10 rounded-full`) that mirror the final layout.
- Use it for loads longer than ~300ms. The animation stops under `prefers-reduced-motion`.

## Accessibility
- A skeleton is decorative: PUI hides it from screen readers (`aria-hidden`) and stops the pulse when the person prefers reduced motion.
- Always pair it with text in a `role="status"` region that names what is loading ("Loading orders…"), and set `aria-busy` on the region being updated, back to `false` when done.
- A skeleton never replaces the outcome: end every wait with the content, an error with "Try again", or an empty state.
- Don't draw fake buttons or links in a skeleton, and don't move focus while it updates.

_Adapted from Magoo 1.6.0 by Marcelo Sales: [Loading and progress](https://magoo.cc/en/components/messages/loading-progress.html) (`carregamento-progresso`). Magoo is educational guidance; test the behavior in your implementation._
