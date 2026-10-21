# Select

Escolha de uma opção numa lista. No produto use o `Select` do shadcn/ui (Radix); a prévia usa um `<select>` nativo com o mesmo visual.

## O que você fornece
- `Label` associado; opções com rótulos curtos, em ordem lógica (alfabética, ou por frequência).
- Até ~15 opções. Acima disso, use `Combobox` (Popover + Command) com busca.
- 2–4 opções sempre visíveis: prefira `RadioGroup` ou `Tabs`.
