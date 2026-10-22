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

## Accessibility
- Use tables for data compared by rows and columns, never for layout.
- Always give it a `TableCaption` (or a heading) that explains what the data is. Column headers are `<th scope="col">`; for row headers use `<th scope="row">`.
- Static cells take no focus. When the table scrolls sideways, PUI makes the container focusable so arrows can scroll it; pass `label` to name that region.
- Sortable columns use a button in the header with the current direction exposed (`aria-sort` on the `th`); focus stays on the control after sorting.
- Row selection shows single, partial and all states; say how many records a bulk action affects before running it.
- Design loading, empty, no-match and failed states as different messages.

_Adapted from Magoo 1.6.0 by Marcelo Sales: [Tables](https://magoo.cc/en/components/structure/tables.html) (`tabelas`). Magoo is educational guidance; test the behavior in your implementation._
