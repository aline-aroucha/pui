// Gera o site de documentação do PUI em _site/ a partir de tokens/, docs/ e preview/.
// Uso: SITE_URL=https://usuario.github.io/pui node scripts/build-site.mjs
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
  "/* PUI — gerado de tokens/tokens.json */",
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
  ["Começar", [["index.html", "Visão geral"], ["ia.html", "Usar com IA"]]],
  ["Fundamentos", [["cores.html", "Cores"], ["tipografia.html", "Tipografia"], ["espacamento.html", "Espaçamento, raio e sombra"]]],
  ["Componentes", components.map((c) => [`componentes/${c.toLowerCase()}.html`, c])],
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
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title === "PUI" ? "PUI" : `${esc(title)} · PUI`}</title>
<meta name="description" content="PUI: design system sobre shadcn/ui, com tokens, componentes e regras para agentes de IA.">
<link rel="alternate" type="text/plain" title="llms.txt" href="${base}llms.txt">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;800&family=Geist+Mono:wght@400;600&display=swap">
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
    <button class="pui-btn pui-btn--outline pui-btn--size-sm" id="theme-toggle" type="button">Tema escuro</button>
    <button class="pui-btn pui-btn--ghost pui-btn--size-sm menu-btn" id="menu-toggle" type="button" aria-expanded="false" aria-controls="sidebar">Menu</button>
  </div>
</header>
<div class="shell">
  <nav class="sidebar" id="sidebar" aria-label="Documentação">${nav}</nav>
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

// visão geral
const guide = read("docs/guidelines.md").replace(/^# .*\n/, "")
const cover = `<section class="hero">
  <div class="hero-text">
    <h1>PUI</h1>
    <p>Design system sobre shadcn/ui: tokens, componentes e regras prontos para pessoas e IAs.</p>
    <div class="pui-row">
      <a class="pui-btn pui-btn--default" href="ia.html">Usar com IA</a>
      <a class="pui-btn pui-btn--outline" href="componentes/button.html">Ver componentes</a>
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

// usar com IA
const u = (p) => (SITE_URL ? `${SITE_URL}/${p}` : p)
const copyRow = (label, value) =>
  `<div class="copy-row"><div><div class="copy-label">${label}</div><code>${esc(value)}</code></div><button class="pui-btn pui-btn--outline pui-btn--size-sm" type="button" data-copy="${esc(value)}">Copiar</button></div>`
const iaBody = `<article class="prose">
<h1>Usar com IA</h1>
<p class="lead">O PUI publica, junto com este site, arquivos em texto puro feitos para agentes de IA lerem. Aponte o seu agente para eles.</p>
<h2>Arquivos para agentes</h2>
${copyRow("Índice para LLMs", u("llms.txt"))}
${copyRow("Toda a documentação em um arquivo", u("llms-full.txt"))}
${copyRow("Regras do projeto (AGENTS.md)", u("AGENTS.md"))}
${copyRow("Tokens em JSON", u("tokens.json"))}
${copyRow("CSS com os tokens (globals.css)", u("globals.css"))}
<h2>Instalar no projeto com o shadcn</h2>
<p>O tema e o Badge com as variantes PUI estão no registry do shadcn publicado neste site.</p>
${copyRow("Tema PUI", `npx shadcn@latest add ${u("r/pui-theme.json")}`)}
${copyRow("Badge PUI", `npx shadcn@latest add ${u("r/pui-badge.json")}`)}
<h2>Deixar o agente seguir as regras</h2>
<ol>
<li>Copie <code>AGENTS.md</code> para a raiz do projeto. O Claude Code lê <code>CLAUDE.md</code>; crie um com a linha <code>@AGENTS.md</code>.</li>
<li>No Cursor, salve o mesmo texto em <code>.cursor/rules/pui.mdc</code>. No GitHub Copilot, em <code>.github/copilot-instructions.md</code>.</li>
<li>Para o agente buscar componentes sozinho, registre o PUI no <code>components.json</code> e ative o MCP do shadcn (<code>npx shadcn@latest mcp init</code>).</li>
</ol>
<pre><code>${esc(JSON.stringify({ registries: { "@pui": u("r/{name}.json") } }, null, 2))}</code></pre>
<p>Com isso, pedidos como “adicione o badge do @pui” ou “monte uma tela de pedidos com os componentes PUI” já usam os tokens e as regras deste design system.</p>
<h2>Prompt inicial sugerido</h2>
<pre><code>${esc(`Use o design system PUI. Leia ${u("llms-full.txt")} antes de começar.
Use só componentes de @/components/ui (shadcn), cores só por token (bg-primary, text-muted-foreground…),
interface em pt-BR e uma ação primária por área.`)}</code></pre>
</article>`
write("ia.html", page("ia.html", "Usar com IA", iaBody))

// cores
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
  "cores.html",
  page(
    "cores.html",
    "Cores",
    `<article class="prose"><h1>Cores</h1><p class="lead">Neutros com leve viés para o verde da marca e uma cor de marca, <code>primary</code>. Os nomes são os mesmos das CSS variables do shadcn/ui; no Tailwind viram <code>bg-*</code>, <code>text-*</code> e <code>border-*</code>.</p></article>
<div class="table-wrap"><table class="pui-table tokens-table"><thead><tr><th>Token</th><th>Claro</th><th>Escuro</th></tr></thead><tbody>${colorRows}</tbody></table></div>`
  )
)

// tipografia
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
  "tipografia.html",
  page(
    "tipografia.html",
    "Tipografia",
    `<article class="prose"><h1>Tipografia</h1><p class="lead">Geist na interface e nos títulos, Geist Mono em código e números alinhados. Base de interface 14px (<code>text-sm</code>).</p></article><div class="type-list">${typeRows}</div>`
  )
)

// espaçamento
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
  "espacamento.html",
  page(
    "espacamento.html",
    "Espaçamento, raio e sombra",
    `<article class="prose"><h1>Espaçamento, raio e sombra</h1><p class="lead">Escala de 4px, raios derivados de <code>--radius</code> como no shadcn e sombras discretas.</p><h2>Espaçamento</h2></article>
<div class="space-list">${bars}</div><article class="prose"><h2>Raio</h2></article><div class="demo-grid">${radii}</div>
<article class="prose"><h2>Sombra</h2></article><div class="demo-grid">${shadows}</div>`
  )
)

// componentes
for (const c of components) {
  const p = `componentes/${c.toLowerCase()}.html`
  const doc = md(read(`docs/components/${c.toLowerCase()}.md`))
  const code = read(`preview/examples/${c}.js`)
  const body = `<article class="prose">${doc.replace(/(<\/h1>)/, '$1<div class="preview-frame"><div id="preview" class="pui-stage"></div></div>')}
<details class="code"><summary>Código da prévia</summary><pre><code>${esc(code)}</code></pre></details></article>`
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

// ------------------------------------------------------------ assets e arquivos para IA
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

> Design system sobre shadcn/ui + Tailwind v4. Neutros levemente esverdeados e uma cor de marca (verde-petróleo \`primary\`). Interface em pt-BR.

## Docs
- [Toda a documentação]( ${abs("llms-full.txt")} ): guia, regras e componentes em um arquivo
- [Regras para agentes](${abs("AGENTS.md")}): o que sempre e nunca fazer
- [Tokens](${abs("tokens.json")}): cores claro/escuro, tipografia, espaçamento, raio, sombra
- [CSS](${abs("globals.css")}): tokens como CSS variables do shadcn

## Registry shadcn
- [Tema](${abs("r/pui-theme.json")}): \`npx shadcn@latest add ${abs("r/pui-theme.json")}\`
- [Badge](${abs("r/pui-badge.json")})

## Componentes
${components.map((c) => `- [${c}](${abs(`componentes/${c.toLowerCase()}.html`)})`).join("\n")}
`.replace("]( ", "](").replace(" ):", "):")
)
write(
  "llms-full.txt",
  [read("AGENTS.md"), read("docs/guidelines.md"), ...components.map((c) => read(`docs/components/${c.toLowerCase()}.md`))].join("\n\n---\n\n")
)
write(".nojekyll", "")
if (existsSync(join(root, "public/r"))) cpSync(join(root, "public/r"), join(out, "r"), { recursive: true })
// o `shadcn build` pula itens sem `files` (como o tema); eles são gravados aqui
for (const item of JSON.parse(read("registry.json")).items.filter((i) => !i.files)) {
  write(`r/${item.name}.json`, JSON.stringify({ $schema: "https://ui.shadcn.com/schema/registry-item.json", ...item }, null, 2) + "\n")
}
console.log(`_site/ gerado: ${components.length} componentes${SITE_URL ? ` para ${SITE_URL}` : ""}`)
