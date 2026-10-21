# Table

Tabular data. Parts: `TableHeader`, `TableBody`, `TableFooter`, `TableRow`, `TableHead`, `TableCell`, `TableCaption`. For sorting, filters and pagination, drive it with TanStack Table.

```bash
npx github:aline-aroucha/pui add table badge
```

## What you provide
- `TableHeader` with short `TableHead` labels; `TableBody` with rows; optional `TableCaption`.
- Numbers and amounts: right-aligned, `font-mono tabular-nums`, en-US format (`$1,280.00`, `Oct 21, 2026`).
- Status as a `Badge`.
- Empty state: one row with `colSpan` and a sentence saying what will appear and how to add the first item.
