# PUI

Design system sobre [shadcn/ui](https://ui.shadcn.com), pronto para ser usado por pessoas e por IAs.

**Documentação:** https://claude.ai/artifact/MkHJF4pwEJxxjxRcEByNy4

## O que tem aqui

| Arquivo | Para quê |
| --- | --- |
| `tokens/tokens.json` | Fonte da verdade: cores (claro/escuro), tipografia, espaçamento, raio, sombra. |
| `src/styles/globals.css` | Os tokens como CSS variables do shadcn + `@theme` do Tailwind v4. |
| `components.json` | Configuração do shadcn CLI (estilo new-york, ícones lucide). |
| `registry.json` + `registry/` | Registry shadcn: instala o tema e o Badge PUI em qualquer projeto. |
| `AGENTS.md` / `CLAUDE.md` | Regras que Claude Code, Codex e outros agentes leem automaticamente. |
| `.cursor/rules/pui.mdc`, `.github/copilot-instructions.md` | As mesmas regras para Cursor e GitHub Copilot. |
| `llms.txt` | Índice curto para IAs encontrarem a documentação. |
| `docs/` | Guia e uma página por componente, em Markdown. |

## Usar num projeto novo

```bash
npx create-next-app@latest meu-app --tailwind --ts
cd meu-app
npx shadcn@latest init
# copie src/styles/globals.css do PUI (ou instale pelo registry, abaixo)
npx shadcn@latest add button badge input label card alert tabs table
cp ../pui/AGENTS.md ../pui/CLAUDE.md .
```

Fontes (Next.js): `import { Geist, Geist_Mono } from "next/font/google"` e aplique as variáveis `--font-sans` / `--font-mono` no `<html>`.

## Publicar o registry

```bash
npm install
npm run registry:build      # gera public/r/pui-theme.json e public/r/pui-badge.json
```

Hospede `public/` (Vercel, GitHub Pages, Netlify). Em qualquer projeto:

```bash
npx shadcn@latest add https://SEU-DOMINIO/r/pui-theme.json
npx shadcn@latest add https://SEU-DOMINIO/r/pui-badge.json
```

Com o registry publicado, o **shadcn MCP** (`npx shadcn@latest mcp init`) deixa o Claude, Cursor e VS Code
buscar e instalar componentes PUI direto do chat.

## Mudar um token

1. Edite `tokens/tokens.json`.
2. Atualize os mesmos valores em `src/styles/globals.css` e `registry.json`.
3. Atualize a documentação publicada (peça ao Claude: "atualize o PUI com estes tokens").
