# PUI

A design system on top of [shadcn/ui](https://ui.shadcn.com), ready to be used by people and AI agents.

**Documentation:** https://aline-aroucha.github.io/pui

## What's inside

| File | Purpose |
| --- | --- |
| `tokens/tokens.json` | Source of truth: colors (light/dark), typography, spacing, radius, shadow. |
| `src/styles/globals.css` | The tokens as shadcn CSS variables + the Tailwind v4 `@theme`. |
| `components.json` | shadcn CLI config (new-york style, lucide icons). |
| `registry.json` + `registry/` | The PUI registry: theme, `cn()` and the source of the 15 components. |
| `cli/pui.mjs` | The `pui` command: `init`, `add`, `list`. |
| `AGENTS.md` / `CLAUDE.md` | Rules that Claude Code, Codex and other agents read automatically. |
| `.cursor/rules/pui.mdc`, `.github/copilot-instructions.md` | The same rules for Cursor and GitHub Copilot. |
| `llms.txt` | Short index that helps AI tools find the docs. |
| `docs/` | Guidelines and one page per component, in Markdown. |
| `preview/`, `site/`, `scripts/build-site.mjs` | The documentation site and its live component previews. |

## Use it in a project

In a React project with Tailwind v4 (Next.js or Vite):

```bash
npx github:aline-aroucha/pui init                 # theme, cn(), AGENTS.md + CLAUDE.md
npx github:aline-aroucha/pui add button card input # any of the 15 components
npx github:aline-aroucha/pui list
```

The `pui` CLI (`cli/pui.mjs`, no dependencies) installs from the PUI registry at https://aline-aroucha.github.io/pui/r/ using the shadcn CLI under the hood.
Fonts (Next.js): `import { Geist, Geist_Mono } from "next/font/google"` and apply the `--font-sans` / `--font-mono` variables on `<html>`.

To shorten the command to `npx @aline-aroucha/pui`, publish the package once: `npm login && npm publish --access public`.

## Documentation site (GitHub Pages)

`npm run build` generates the site in `_site/` from `tokens/`, `docs/` and `preview/`: overview, colors, typography, spacing,
one page per component with a live preview, and a "Use with AI" page. The same build publishes `llms.txt`, `llms-full.txt`,
`AGENTS.md`, `tokens.json`, `globals.css` and the registry under `/r/`.

1. In the repository: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. Every push to `main` runs `.github/workflows/pages.yml` and publishes to https://aline-aroucha.github.io/pui/.

Run it locally: `npm install && npm run dev`.

## Registry

`registry.json` lists the theme, `utils` and the 15 components; their source lives in `registry/pui/`. `npm run build` turns it into
`/r/<name>.json` on the site, which is what the `pui` CLI installs from. Any shadcn-compatible tool can use it too: add
`"registries": { "@pui": "https://aline-aroucha.github.io/pui/r/{name}.json" }` to `components.json`, and the shadcn MCP lets AI agents browse and install PUI components from chat.

## Changing a token

1. Edit `tokens/tokens.json`.
2. Update the same values in `src/styles/globals.css` and `registry.json`.
3. Push to `main`; the site redeploys.
