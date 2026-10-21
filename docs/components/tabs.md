# Tabs

Switches between views of the same context without leaving the page. Parts: `TabsList`, `TabsTrigger`, `TabsContent`.

```bash
npx github:aline-aroucha/pui add tabs
```

## What you provide
- `defaultValue` (or `value` + `onValueChange`), one `TabsTrigger` and one `TabsContent` per `value`.
- Two to six tabs with one- or two-word labels.
- To move between pages (URLs), use navigation links, not Tabs.
