// Builds the PUI documentation site into _site/ from tokens/, docs/ and preview/.
// Usage: SITE_URL=https://user.github.io/pui node scripts/build-site.mjs
import { readFileSync, writeFileSync, mkdirSync, cpSync, readdirSync, existsSync } from "node:fs"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"
import { marked } from "marked"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const out = join(root, "_site")
const SITE_URL = (process.env.SITE_URL || "").replace(/\/$/, "")
const REPO_URL = process.env.REPO_URL || ""
const read = (p) => readFileSync(join(root, p), "utf8")
const write = (p, s) => {
  mkdirSync(dirname(join(out, p)), { recursive: true })
  writeFileSync(join(out, p), s)
}
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")

const tokens = JSON.parse(read("tokens/tokens.json"))
const colors = tokens.color.tokens
const components = readdirSync(join(root, "preview/examples")).map((f) => f.replace(/\.js$/, "")).sort()

// ------------------------------------------------------------ tokens.css
const cssValue = (v) => (v.startsWith("{") ? `var(--${v.slice(1, -1)})` : v)
const tokensCss = [
  "/* PUI — generated from tokens/tokens.json */",
  ":root, .light-scope {",
  ...colors.map((t) => `  --${t.name}: ${cssValue(t.value.light)};`),
  "}",
  ":root {",
  ...Object.entries(tokens.type.families).map(([k, v]) => `  --font-${k}: ${v};`),
  ...tokens.spacing.tokens.map((t) => `  --${t.name}: ${t.value};`),
  ...tokens.radius.tokens.map((t) => `  --${t.name}: ${t.value};`),
  ...tokens.shadow.tokens.map((t) => `  --${t.name}: ${t.value};`),
  "}",
  ".light-scope { color-scheme: light; }",
  ".dark {",
  ...colors.map((t) => `  --${t.name}: ${cssValue(t.value.dark)};`),
  "  color-scheme: dark;",
  "}",
  "",
].join("\n")

// ------------------------------------------------------------ layout
const NAV = [
  ["Get started", [["index.html", "Overview"], ["ai.html", "Use with AI"]]],
  ["Foundations", [["colors.html", "Colors"], ["typography.html", "Typography"], ["spacing.html", "Spacing, radius and shadow"]]],
  ["Components", components.map((c) => [`components/${c.toLowerCase()}.html`, c])],
]

function page(path, title, body, { scripts = "" } = {}) {
  const depth = path.split("/").length - 1
  const base = depth ? "../".repeat(depth) : "./"
  const nav = NAV.map(
    ([group, items]) =>
      `<div class="nav-group"><div class="nav-label">${group}</div>${items
        .map(([href, label]) => `<a href="${base}${href}"${href === path ? ' aria-current="page"' : ""}>${label}</a>`)
        .join("")}</div>`
  ).join("")
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title === "PUI" ? "PUI" : `${esc(title)} · PUI`}</title>
<meta name="description" content="PUI: a design system with tokens, components and rules for AI agents.">
<link rel="alternate" type="text/plain" title="llms.txt" href="${base}llms.txt">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=Geist:wght@400;500;600;800&family=Geist+Mono:wght@400;600&display=swap">
<script>try{var t=localStorage.getItem("pui-theme");if(t==="dark"||(!t&&matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark")}catch(e){}</script>
<link rel="stylesheet" href="${base}assets/tokens.css">
<link rel="stylesheet" href="${base}assets/pui.css">
<link rel="stylesheet" href="${base}assets/site.css">
</head>
<body>
<header class="topbar">
  <a class="brand" href="${base}index.html">PUI</a>
  <span class="brand-sub">design system</span>
  <div class="topbar-actions">
    ${REPO_URL ? `<a class="pui-btn pui-btn--ghost pui-btn--size-sm" href="${esc(REPO_URL)}">GitHub</a>` : ""}
    <button class="pui-btn pui-btn--outline pui-btn--size-sm" id="theme-toggle" type="button">Dark theme</button>
    <button class="pui-btn pui-btn--ghost pui-btn--size-sm menu-btn" id="menu-toggle" type="button" aria-expanded="false" aria-controls="sidebar">Menu</button>
  </div>
</header>
<div class="shell">
  <nav class="sidebar" id="sidebar" aria-label="Documentation">${nav}</nav>
  <main class="content">${body}</main>
</div>
<script src="${base}assets/site.js"></script>
${scripts}
</body>
</html>
`
}

// ------------------------------------------------------------ pages
const md = (s) => marked.parse(s)

// overview
const guide = read("docs/guidelines.md").replace(/^# .*\n/, "")
const cover = `<section class="hero">
  <div class="hero-text">
    <h1>PUI</h1>
    <p>A design system with tokens, components and rules ready for people and AI agents.</p>
    <div class="pui-row">
      <a class="pui-btn pui-btn--default" href="ai.html">Use with AI</a>
      <a class="pui-btn pui-btn--outline" href="components/button.html">Browse components</a>
    </div>
  </div>
  <svg class="hero-art" viewBox="480 0 480 288" aria-hidden="true">
    <rect class="a-primary r-xl" x="504" y="24" width="216" height="240"/>
    <rect class="a-ink r-xl" x="736" y="24" width="200" height="112"/>
    <rect class="a-deep r-xl" x="736" y="152" width="96" height="112"/>
    <rect class="a-primary r-xl" x="840" y="152" width="96" height="112"/>
    <g class="a-tile">
      <rect class="r-md" x="528" y="48" width="104" height="24"/><rect class="r-md" x="640" y="48" width="56" height="24"/>
      <rect class="r-md" x="528" y="80" width="48" height="24"/><rect class="r-md" x="584" y="80" width="48" height="24"/><rect class="r-md" x="640" y="80" width="56" height="24"/>
      <rect class="r-md" x="528" y="112" width="168" height="24"/>
      <rect class="r-md" x="528" y="144" width="48" height="24"/><rect class="r-md" x="584" y="144" width="112" height="24"/>
      <rect class="r-md" x="528" y="176" width="104" height="24"/><rect class="r-md" x="640" y="176" width="56" height="24"/>
      <rect class="r-pill" x="528" y="216" width="48" height="24"/><rect class="r-pill" x="584" y="216" width="48" height="24"/>
    </g>
    <g class="a-bg">
      <rect class="r-pill" x="760" y="48" width="152" height="24"/>
      <rect class="r-pill" x="760" y="88" width="64" height="24"/><rect class="r-pill" x="832" y="88" width="80" height="24"/>
    </g>
  </svg>
</section>`
write("index.html", page("index.html", "PUI", cover + `<article class="prose">${md(guide)}</article>`))

// use with AI
const u = (p) => (SITE_URL ? `${SITE_URL}/${p}` : p)
const copyRow = (label, value) =>
  `<div class="copy-row"><div><div class="copy-label">${label}</div><code>${esc(value)}</code></div><button class="pui-btn pui-btn--outline pui-btn--size-sm" type="button" data-copy="${esc(value)}">Copy</button></div>`
const aiBody = `<article class="prose">
<h1>Use with AI</h1>
<p class="lead">Alongside this site, PUI publishes plain-text files made for AI agents to read. Point your agent at them.</p>
<h2>Install in a project</h2>
<p>The <code>pui</code> command sets up a React + Tailwind v4 project and adds components from the PUI registry.</p>
${copyRow("Set up the project (theme, cn(), AGENTS.md, CLAUDE.md)", "npx github:aline-aroucha/pui init")}
${copyRow("Add components", "npx github:aline-aroucha/pui add button card input")}
${copyRow("Add every component", "npx github:aline-aroucha/pui add --all")}
<h2>Files for agents</h2>
${copyRow("Index for LLMs", u("llms.txt"))}
${copyRow("All documentation in one file", u("llms-full.txt"))}
${copyRow("Project rules (AGENTS.md)", u("AGENTS.md"))}
${copyRow("Tokens as JSON", u("tokens.json"))}
${copyRow("CSS with the tokens (globals.css)", u("globals.css"))}
<h2>Make the agent follow the rules</h2>
<ol>
<li><code>pui init</code> writes <code>AGENTS.md</code> and a <code>CLAUDE.md</code> that imports it, so Claude Code and Codex pick up the rules automatically.</li>
<li>For Cursor, save the same text as <code>.cursor/rules/pui.mdc</code>. For GitHub Copilot, as <code>.github/copilot-instructions.md</code>.</li>
<li>To let the agent find and install components on its own, <code>pui init</code> registers PUI in <code>components.json</code>; turn on the shadcn MCP with <code>npx shadcn@latest mcp init</code>.</li>
</ol>
<pre><code>${esc(JSON.stringify({ registries: { "@pui": u("r/{name}.json") } }, null, 2))}</code></pre>
<p>Requests like “add the @pui badge” or “build an orders page with PUI components” then use the tokens and rules of this design system.</p>
<h2>Suggested first prompt</h2>
<pre><code>${esc(`Use the PUI design system. Read ${u("llms-full.txt")} before you start.
Use only components from @/components/ui, color only through tokens (bg-primary, text-muted-foreground…),
US English UI copy and one primary action per area.`)}</code></pre>
</article>`
write("ai.html", page("ai.html", "Use with AI", aiBody))

// colors
const swatch = (t, theme) => {
  const v = t.value[theme]
  const label = v.startsWith("{") ? `→ ${v.slice(1, -1)}` : v
  return `<div class="swatch ${theme === "dark" ? "dark" : "light-scope"}"><span class="chip" style="background:var(--${t.name})"></span><code>${esc(label)}</code></div>`
}
const colorRows = colors
  .map(
    (t) => `<tr><td><code class="tok">${t.name}</code><div class="usage">${esc(t.usage)}</div></td><td>${swatch(t, "light")}</td><td>${swatch(t, "dark")}</td></tr>`
  )
  .join("")
write(
  "colors.html",
  page(
    "colors.html",
    "Colors",
    `<article class="prose"><h1>Colors</h1><p class="lead">Neutrals with a slight lean toward the brand green, and one brand color, <code>primary</code>. In Tailwind each token becomes <code>bg-*</code>, <code>text-*</code> and <code>border-*</code>.</p></article>
<div class="table-wrap"><table class="pui-table tokens-table"><thead><tr><th>Token</th><th>Light</th><th>Dark</th></tr></thead><tbody>${colorRows}</tbody></table></div>`
  )
)

// typography
const typeRows = tokens.type.groups
  .map(
    (g) =>
      `<h2>${esc(g.name)}</h2>` +
      g.styles
        .map(
          (s) => `<div class="type-row"><div class="type-meta"><code class="tok">${s.name}</code><span>${s.fontSize} / ${s.lineHeight} · ${s.fontWeight}</span></div>
<div class="type-sample" style="font-family:var(--font-${g.family});font-size:${s.fontSize};line-height:${s.lineHeight};font-weight:${s.fontWeight};letter-spacing:${s.letterSpacing || "normal"}">${esc(s.sample)}</div>
<div class="usage">${esc(s.usage)}</div></div>`
        )
        .join("")
  )
  .join("")
write(
  "typography.html",
  page(
    "typography.html",
    "Typography",
    `<article class="prose"><h1>Typography</h1><p class="lead">Geist for the UI and headings, Geist Mono for code and aligned numbers. The UI base is 14px (<code>text-sm</code>).</p></article><div class="type-list">${typeRows}</div>`
  )
)

// spacing
const bars = tokens.spacing.tokens
  .map((t) => `<div class="space-row"><code class="tok">${t.name}</code><span class="bar" style="width:${t.value}"></span><span class="val">${t.value}</span><span class="usage">${esc(t.usage)}</span></div>`)
  .join("")
const radii = tokens.radius.tokens
  .map((t) => `<div class="demo-tile"><span class="radius-box" style="border-radius:${t.value}"></span><code class="tok">${t.name}</code><span class="val">${t.value}</span><span class="usage">${esc(t.usage)}</span></div>`)
  .join("")
const shadows = tokens.shadow.tokens
  .map((t) => `<div class="demo-tile"><span class="shadow-box" style="box-shadow:var(--${t.name})"></span><code class="tok">${t.name}</code><span class="usage">${esc(t.usage)}</span></div>`)
  .join("")
write(
  "spacing.html",
  page(
    "spacing.html",
    "Spacing, radius and shadow",
    `<article class="prose"><h1>Spacing, radius and shadow</h1><p class="lead">A 4px scale, radii derived from <code>--radius</code> and subtle shadows.</p><h2>Spacing</h2></article>
<div class="space-list">${bars}</div><article class="prose"><h2>Radius</h2></article><div class="demo-grid">${radii}</div>
<article class="prose"><h2>Shadow</h2></article><div class="demo-grid">${shadows}</div>`
  )
)

// components
for (const c of components) {
  const p = `components/${c.toLowerCase()}.html`
  const doc = md(read(`docs/components/${c.toLowerCase()}.md`))
  const code = read(`preview/examples/${c}.js`)
  const body = `<article class="prose">${doc.replace(/(<\/h1>)/, '$1<div class="preview-frame"><div id="preview" class="pui-stage"></div></div>')}
<details class="code"><summary>Preview source</summary><pre><code>${esc(code)}</code></pre></details></article>`
  write(
    p,
    page(p, c, body, {
      scripts: `<script src="../assets/vendor/react.production.min.js"></script>
<script src="../assets/vendor/react-dom.production.min.js"></script>
<script src="../assets/pui.js"></script>
<script src="../assets/examples/${c}.js"></script>`,
    })
  )
}

// ------------------------------------------------------------ assets and files for AI agents
write("assets/tokens.css", tokensCss)
cpSync(join(root, "preview/pui.css"), join(out, "assets/pui.css"))
cpSync(join(root, "preview/pui.js"), join(out, "assets/pui.js"))
cpSync(join(root, "preview/examples"), join(out, "assets/examples"), { recursive: true })
cpSync(join(root, "site/site.css"), join(out, "assets/site.css"))
cpSync(join(root, "site/site.js"), join(out, "assets/site.js"))
mkdirSync(join(out, "assets/vendor"), { recursive: true })
cpSync(join(root, "node_modules/react/umd/react.production.min.js"), join(out, "assets/vendor/react.production.min.js"))
cpSync(join(root, "node_modules/react-dom/umd/react-dom.production.min.js"), join(out, "assets/vendor/react-dom.production.min.js"))

cpSync(join(root, "tokens/tokens.json"), join(out, "tokens.json"))
cpSync(join(root, "src/styles/globals.css"), join(out, "globals.css"))
cpSync(join(root, "AGENTS.md"), join(out, "AGENTS.md"))
const abs = (p) => (SITE_URL ? `${SITE_URL}/${p}` : p)
write(
  "llms.txt",
  `# PUI

> A design system for React + Tailwind v4: tokens, 15 components and rules for AI agents. Slightly green-tinted neutrals and one brand color (deep teal \`primary\`). UI copy in US English.

## Docs
- [All documentation](${abs("llms-full.txt")}): guidelines, rules and components in one file
- [Agent rules](${abs("AGENTS.md")}): what to always and never do
- [Tokens](${abs("tokens.json")}): light/dark colors, typography, spacing, radius, shadow
- [CSS](${abs("globals.css")}): tokens as CSS variables

## Install
- \`npx github:aline-aroucha/pui init\`: theme, cn() helper, AGENTS.md + CLAUDE.md
- \`npx github:aline-aroucha/pui add <component>\`: components from ${abs("r/")}

## Components
${components.map((c) => `- [${c}](${abs(`components/${c.toLowerCase()}.html`)}): source ${abs(`r/${c.toLowerCase()}.json`)}`).join("\n")}
`
)
write(
  "llms-full.txt",
  [read("AGENTS.md"), read("docs/guidelines.md"), ...components.map((c) => read(`docs/components/${c.toLowerCase()}.md`))].join("\n\n---\n\n")
)
write(".nojekyll", "")
if (existsSync(join(root, "public/r"))) cpSync(join(root, "public/r"), join(out, "r"), { recursive: true })
// `shadcn build` skips items without `files` (like the theme); write them here
for (const item of JSON.parse(read("registry.json")).items.filter((i) => !i.files)) {
  write(`r/${item.name}.json`, JSON.stringify({ $schema: "https://ui.shadcn.com/schema/registry-item.json", ...item }, null, 2) + "\n")
}
console.log(`_site/ built: ${components.length} components${SITE_URL ? ` for ${SITE_URL}` : ""}`)
