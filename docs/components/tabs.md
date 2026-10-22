# Tabs

Switches between views of the same context without leaving the page. Parts: `TabsList`, `TabsTrigger`, `TabsContent`.

```bash
npx @aline-aroucha/pui add tabs
```

## What you provide
- `defaultValue` (or `value` + `onValueChange`), one `TabsTrigger` and one `TabsContent` per `value`.
- Two to six tabs with one- or two-word labels.
- To move between pages (URLs), use navigation links, not Tabs.

## Accessibility
- Use tabs only to switch groups of content on the same page, when a simpler layout won't do; on small screens consider stacking the content.
- `Tab` lands on the active tab; `←` / `→` move between tabs and wrap from last to first; the next `Tab` goes into the open panel.
- Panels open automatically as the arrows move (the recommended mode). Manual activation (`activationMode="manual"`, then `Enter` / `Space`) is possible but not recommended.
- Screen readers hear the tab name, the tab role, its position (1 of 3) and whether it is selected.

_Adapted from Magoo 1.6.0 by Marcelo Sales: [Tabs](https://magoo.cc/en/components/hidden-elements/tabs.html) (`abas`). Magoo is educational guidance; test the behavior in your implementation._
