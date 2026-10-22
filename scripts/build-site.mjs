// Builds the PUI documentation site into _site/ from tokens/, docs/ and preview/.
// Every page is a list of sections; each section renders to HTML, to the "On this page" list and to the page's Markdown twin.
// Usage: SITE_URL=https://user.github.io/pui node scripts/build-site.mjs
import { readFileSync, writeFileSync, mkdirSync, cpSync, readdirSync, existsSync } from "node:fs"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"
import vm from "node:vm"
import { marked } from "marked"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const out = join(root, "_site")
const SITE_URL = (process.env.SITE_URL || "").replace(/\/$/, "")
const REPO_URL = process.env.REPO_URL || "https://github.com/aline-aroucha/pui"
const MAGOO_VERSION = "1.6.0"
const read = (p) => readFileSync(join(root, p), "utf8")
const write = (p, s) => {
  mkdirSync(dirname(join(out, p)), { recursive: true })
  writeFileSync(join(out, p), s)
}
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
const md = (s) => marked.parse(s)
const mdInline = (s) => marked.parseInline(s)
const slug = (name) => name.replace(/(?<!^)(?=[A-Z])/g, "-").toLowerCase()
const anchor = (title) => title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
const abs = (p) => (SITE_URL ? `${SITE_URL}/${p}` : p)

const tokens = JSON.parse(read("tokens/tokens.json"))
const colors = tokens.color.tokens
const api = JSON.parse(read("docs/api.json"))
const components = readdirSync(join(root, "preview/examples")).map((f) => f.replace(/\.js$/, "")).sort()

// Playground configs run in Node too, so each page's Markdown twin can carry the default example code
const playground = (() => {
  const sandbox = { window: { React: { createElement() {}, useState() {}, useEffect() {}, Fragment: "f" }, ReactDOM: {}, PUI: {} }, document: { querySelectorAll: () => [] } }
  vm.runInNewContext(read("preview/playground.js").replace("var configs = {", "var configs = window.PUI_PLAYGROUND_CONFIGS = {"), sandbox)
  return sandbox.window.PUI_PLAYGROUND_CONFIGS
})()
const defaultCode = (name) => {
  const cfg = playground[name]
  const values = Object.fromEntries(cfg.controls.map((c) => [c.name, c.value]))
  return cfg.code(values)
}

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

// ------------------------------------------------------------ site map
const NAV = [
  ["Getting started", [["index.html", "Overview"], ["ai.html", "Use with AI"]]],
  ["Foundations", [["colors.html", "Colors"], ["typography.html", "Typography"], ["spacing.html", "Spacing, radius and shadow"]]],
  ["Components", components.map((c) => [`components/${slug(c)}.html`, c])],
]
const searchIndex = NAV.flatMap(([group, items]) =>
  items.map(([href, title]) => ({ title, href, group, description: api[title]?.description || "" }))
)

// ------------------------------------------------------------ page shell
// Site icons are Heroicons Micro (16px solid), read from the heroicons package
const heroicon = (name) =>
  readFileSync(join(root, "node_modules/heroicons/16/solid", name + ".svg"), "utf8")
    .replace(/\s*xmlns="[^"]*"/, "")
    .replace(/\n\s*/g, "")
const icon = {
  search: heroicon("magnifying-glass"),
  copy: heroicon("clipboard-document"),
  more: heroicon("chevron-down"),
  theme: heroicon("moon"),
  menu: heroicon("bars-3"),
  external: heroicon("arrow-top-right-on-square"),
}

function shell({ path, title, description, intro = "", sections, related = [], scripts = "" }) {
  const depth = path.split("/").length - 1
  const base = depth ? "../".repeat(depth) : "./"
  const mdPath = path.replace(/\.html$/, ".md")
  const pageUrl = abs(path)
  const mdUrl = abs(mdPath)
  const aiPrompt = `Answer questions about the following PUI documentation page: ${pageUrl}\nMarkdown source: ${mdUrl}`
  const current = NAV.find(([, items]) => items.some(([href]) => href === path))?.[0]

  const nav = NAV.map(
    ([group, items]) => `<details class="nav-section"${group === current || group !== "Components" ? " open" : ""}>
      <summary>${group}</summary>
      <ul>${items.map(([href, label]) => `<li><a href="${base}${href}"${href === path ? ' aria-current="page"' : ""}>${label}</a></li>`).join("")}</ul>
    </details>`
  ).join("")

  const toc = sections.filter((s) => s.title)
  const tocHtml = toc.length > 1 || related.length
    ? `<aside class="toc" aria-label="On this page">
        ${toc.length > 1 ? `<h2 class="toc-title">On this page</h2><ul>${toc.map((s) => `<li><a href="#${s.id}">${esc(s.title)}</a></li>`).join("")}</ul>` : ""}
        ${related.length ? `<h2 class="toc-title">Related pages</h2><ul>${related.map(([href, label]) => `<li><a href="${base}${href}">${esc(label)}</a></li>`).join("")}</ul>` : ""}
      </aside>`
    : ""

  const body = sections
    .map((s) => (s.title ? `<section aria-labelledby="${s.id}"><h2 id="${s.id}">${esc(s.title)}</h2>${s.html}</section>` : s.html))
    .join("\n")

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title === "PUI" ? "PUI" : `${esc(title)} | PUI`}</title>
<meta name="description" content="${esc(description)}">
<link rel="alternate" type="text/markdown" title="LLM-friendly version" href="${base}${mdPath}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700;800&family=Geist+Mono:wght@400;600&display=swap">
<script>try{var t=localStorage.getItem("pui-theme");if(t==="dark"||(!t&&matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark")}catch(e){}</script>
<link rel="stylesheet" href="${base}assets/tokens.css">
<link rel="stylesheet" href="${base}assets/pui.css">
<link rel="stylesheet" href="${base}assets/site.css">
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>
<div class="frame">
  <header class="site-header">
    <button class="icon-btn menu-btn" id="menu-toggle" type="button" aria-expanded="false" aria-controls="sidebar" aria-label="Menu">${icon.menu}</button>
    <a class="brand" href="${base}index.html"><span class="brand-mark" aria-hidden="true"></span>PUI</a>
    <div class="search" role="search">
      <label for="search-input" class="sr-only">Search documentation</label>
      <span class="search-icon">${icon.search}</span>
      <input id="search-input" type="search" placeholder="Search" autocomplete="off" aria-describedby="search-status">
      <p id="search-status" class="sr-only" role="status"></p>
      <div id="search-results" class="search-results" hidden><ul></ul></div>
    </div>
    <nav class="header-links" aria-label="Site">
      <a href="${base}index.html">Docs</a>
      <a href="${base}ai.html">Use with AI</a>
      <a href="${esc(REPO_URL)}">GitHub</a>
      <button class="icon-btn" id="theme-toggle" type="button" aria-label="Dark theme">${icon.theme}</button>
    </nav>
  </header>
  <div class="layout">
    <nav class="sidebar" id="sidebar" aria-label="Documentation">${nav}</nav>
    <main class="panel" id="main" tabindex="-1">
      <div class="panel-grid">
        <article class="article">
          <div class="page-head">
            <h1>${esc(title)}</h1>
            <div class="llm-menu">
              <button class="pui-btn pui-btn--ghost pui-btn--size-sm" type="button" data-copy-md="${base}${mdPath}">${icon.copy}<span>Copy for LLM</span></button>
              <button class="icon-btn" type="button" id="llm-more" aria-expanded="false" aria-controls="llm-options" aria-label="Markdown options">${icon.more}</button>
              <ul id="llm-options" class="llm-options" hidden>
                <li><a href="${base}${mdPath}">View as Markdown</a></li>
                <li><a href="https://chatgpt.com/?hints=search&amp;q=${encodeURIComponent(aiPrompt)}">Open in ChatGPT ${icon.external}<span class="sr-only">(external site)</span></a></li>
                <li><a href="https://claude.ai/new?q=${encodeURIComponent(aiPrompt)}">Open in Claude ${icon.external}<span class="sr-only">(external site)</span></a></li>
              </ul>
            </div>
          </div>
          ${description ? `<p class="page-description">${mdInline(description)}</p>` : ""}
          ${intro}
          ${body.replace(/<pre>/g, '<pre tabindex="0">')}
        </article>
        ${tocHtml}
      </div>
      <footer class="site-footer">
        <ul>
          <li>© 2026 Aline Aroucha. MIT License.</li>
          <li>Behavior follows <a href="https://magoo.cc/en">Magoo ${MAGOO_VERSION}</a> by Marcelo Sales</li>
          <li>Components start from <a href="https://ui.shadcn.com">shadcn/ui</a></li>
          <li><a href="${esc(REPO_URL)}">GitHub</a></li>
        </ul>
      </footer>
    </main>
  </div>
</div>
<script type="application/json" id="search-index">${JSON.stringify(searchIndex).replace(/</g, "\\u003c")}</script>
<script>window.PUI_BASE = ${JSON.stringify(base)}</script>
<script src="${base}assets/site.js"></script>
${scripts}
</body>
</html>
`
}

// Each page is written twice: HTML for people, Markdown for agents
function emit(page) {
  write(page.path, shell(page))
  const related = (page.related || []).map(([href, label]) => `- [${label}](${abs(href)})`).join("\n")
  const text = [
    `# ${page.title}`,
    page.description || "",
    page.introMd || "",
    ...page.sections.filter((s) => s.md !== null).map((s) => (s.title ? `## ${s.title}\n\n${s.md}` : s.md)),
    related ? `## Related pages\n\n${related}` : "",
    `---\nPUI documentation · ${abs(page.path)}`,
  ].filter(Boolean)
  write(page.path.replace(/\.html$/, ".md"), text.join("\n\n") + "\n")
}
const section = (title, mdText, html) => ({ title, id: anchor(title), md: mdText, html: html ?? md(mdText) })

// ------------------------------------------------------------ overview
{
  const guide = read("docs/guidelines.md").replace(/^# .*\n+/, "")
  const [lead, ...parts] = guide.split(/^## /m)
  const cover = `<figure class="cover" aria-hidden="true">
  <svg viewBox="480 0 480 288">
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
    <g class="a-bg"><rect class="r-pill" x="760" y="48" width="152" height="24"/><rect class="r-pill" x="760" y="88" width="64" height="24"/><rect class="r-pill" x="832" y="88" width="80" height="24"/></g>
  </svg>
</figure>`
  emit({
    path: "index.html",
    title: "PUI",
    description: lead.trim(),
    intro: `${cover}<div class="pui-row cta"><a class="pui-btn pui-btn--default" href="components/button.html">Browse components</a><a class="pui-btn pui-btn--outline" href="ai.html">Use with AI</a></div>`,
    sections: parts.map((p) => {
      const [head, ...rest] = p.split("\n")
      return section(head.trim(), rest.join("\n").trim())
    }),
  })
}

// ------------------------------------------------------------ use with AI
{
  const copyRow = (label, value) =>
    `<div class="copy-row"><div><div class="copy-label">${label}</div><code>${esc(value)}</code></div><button class="pui-btn pui-btn--outline pui-btn--size-sm" type="button" data-copy="${esc(value)}">Copy</button></div>`
  const rows = (items) => items.map(([l, v]) => copyRow(l, v)).join("")
  const listMd = (items) => items.map(([l, v]) => `- ${l}: \`${v}\``).join("\n")
  const install = [
    ["Set up the project (style, cn(), AGENTS.md, CLAUDE.md, Magoo MCP)", "npx github:aline-aroucha/pui init"],
    ["Add components", "npx github:aline-aroucha/pui add button card input"],
    ["Add every component", "npx github:aline-aroucha/pui add --all"],
    ["Update installed components", "npx github:aline-aroucha/pui add --all --overwrite"],
  ]
  const files = [
    ["Index for LLMs", abs("llms.txt")],
    ["All documentation in one file", abs("llms-full.txt")],
    ["Project rules (AGENTS.md)", abs("AGENTS.md")],
    ["Tokens as JSON", abs("tokens.json")],
    ["CSS with the tokens (globals.css)", abs("globals.css")],
  ]
  const rulesMd = `1. \`pui init\` writes \`AGENTS.md\` and a \`CLAUDE.md\` that imports it, so Claude Code and Codex pick up the rules automatically.
2. For Cursor, save the same text as \`.cursor/rules/pui.mdc\`. For GitHub Copilot, as \`.github/copilot-instructions.md\`.
3. \`pui init\` also adds the read-only **Magoo MCP** to \`.mcp.json\`, so agents can check keyboard, screen reader and acceptance criteria while they build.
4. To let agents find and install PUI components on their own, \`pui init\` registers \`@pui\` in \`components.json\`; turn on the shadcn MCP with \`npx shadcn@latest mcp init\`.
5. Every page on this site has a Markdown twin: use **Copy for LLM** at the top of a page, or replace \`.html\` with \`.md\` in its address.`
  const promptText = `Use the PUI design system. Read ${abs("llms-full.txt")} before you start.
Use only components from @/components/ui, color only through tokens (bg-primary, text-muted-foreground…),
US English UI copy, one primary action per area, and Magoo behavior for every component.`
  emit({
    path: "ai.html",
    title: "Use with AI",
    description: "PUI publishes plain-text files, an installer and agent rules made for AI tools.",
    sections: [
      section("Install in a project", `The \`pui\` command sets up a React + Tailwind v4 project and adds components from the PUI registry.\n\n${listMd(install)}`,
        `<p>The <code>pui</code> command sets up a React + Tailwind v4 project and adds components from the PUI registry.</p>${rows(install)}`),
      section("Files for agents", listMd(files), rows(files)),
      section("Make the agent follow the rules", rulesMd),
      section("Registry", "```json\n" + JSON.stringify({ registries: { "@pui": abs("r/{name}.json") } }, null, 2) + "\n```"),
      section("Suggested first prompt", "```text\n" + promptText + "\n```"),
    ],
  })
}

// ------------------------------------------------------------ colors
{
  const groups = [
    ["Surfaces and text", (n) => /^(background|foreground|card|popover|secondary|muted|accent|border|input|ring)/.test(n)],
    ["Brand", (n) => n.startsWith("primary")],
    ["Status", (n) => /^(destructive|success|warning)/.test(n)],
    ["Charts", (n) => n.startsWith("chart")],
    ["Sidebar", (n) => n.startsWith("sidebar")],
  ]
  const swatch = (t, theme) => {
    const v = t.value[theme]
    const label = v.startsWith("{") ? `→ ${v.slice(1, -1)}` : v
    return `<div class="swatch ${theme === "dark" ? "dark" : "light-scope"}"><span class="chip" style="background:var(--${t.name})"></span><code>${esc(label)}</code></div>`
  }
  emit({
    path: "colors.html",
    title: "Colors",
    description: "Neutrals with a slight lean toward the brand green, and one brand color, `primary`. In Tailwind each token becomes `bg-*`, `text-*` and `border-*`.",
    sections: groups.map(([title, test]) => {
      const list = colors.filter((t) => test(t.name))
      return section(
        title,
        "| Token | Light | Dark | Usage |\n| --- | --- | --- | --- |\n" + list.map((t) => `| \`${t.name}\` | \`${t.value.light}\` | \`${t.value.dark}\` | ${t.usage} |`).join("\n"),
        `<div class="table-wrap" tabindex="0" role="region" aria-label="${esc(title)} tokens"><table class="pui-table tokens-table"><thead><tr><th scope="col">Token</th><th scope="col">Light</th><th scope="col">Dark</th></tr></thead><tbody>${list
          .map((t) => `<tr><td><code class="tok">${t.name}</code><div class="usage">${esc(t.usage)}</div></td><td>${swatch(t, "light")}</td><td>${swatch(t, "dark")}</td></tr>`)
          .join("")}</tbody></table></div>`
      )
    }),
  })
}

// ------------------------------------------------------------ typography
emit({
  path: "typography.html",
  title: "Typography",
  description: "Geist for the UI and headings, Geist Mono for code and aligned numbers. The UI base is 14px (`text-sm`).",
  sections: tokens.type.groups.map((g) =>
    section(
      g.name,
      "| Style | Size / line height | Weight | Usage |\n| --- | --- | --- | --- |\n" + g.styles.map((s) => `| \`${s.name}\` | ${s.fontSize} / ${s.lineHeight} | ${s.fontWeight} | ${s.usage} |`).join("\n"),
      `<div class="type-list">${g.styles
        .map(
          (s) => `<div class="type-row"><div class="type-meta"><code class="tok">${s.name}</code><span>${s.fontSize} / ${s.lineHeight} · ${s.fontWeight}</span></div>
<div class="type-sample" style="font-family:var(--font-${g.family});font-size:${s.fontSize};line-height:${s.lineHeight};font-weight:${s.fontWeight};letter-spacing:${s.letterSpacing || "normal"}">${esc(s.sample)}</div>
<div class="usage">${esc(s.usage)}</div></div>`
        )
        .join("")}</div>`
    )
  ),
})

// ------------------------------------------------------------ spacing, radius, shadow
{
  const tableMd = (list) => "| Token | Value | Usage |\n| --- | --- | --- |\n" + list.map((t) => `| \`${t.name}\` | \`${t.value}\` | ${t.usage} |`).join("\n")
  emit({
    path: "spacing.html",
    title: "Spacing, radius and shadow",
    description: "A 4px scale, radii derived from `--radius` and subtle shadows.",
    sections: [
      section("Spacing", tableMd(tokens.spacing.tokens), `<div class="space-list">${tokens.spacing.tokens
        .map((t) => `<div class="space-row"><code class="tok">${t.name}</code><span class="bar" style="width:${t.value}"></span><span class="val">${t.value}</span><span class="usage">${esc(t.usage)}</span></div>`)
        .join("")}</div>`),
      section("Radius", tableMd(tokens.radius.tokens), `<div class="demo-grid">${tokens.radius.tokens
        .map((t) => `<div class="demo-tile"><span class="radius-box" style="border-radius:${t.value}"></span><code class="tok">${t.name}</code><span class="val">${t.value}</span><span class="usage">${esc(t.usage)}</span></div>`)
        .join("")}</div>`),
      section("Shadow", tableMd(tokens.shadow.tokens), `<div class="demo-grid">${tokens.shadow.tokens
        .map((t) => `<div class="demo-tile"><span class="shadow-box" style="box-shadow:var(--${t.name})"></span><code class="tok">${t.name}</code><span class="usage">${esc(t.usage)}</span></div>`)
        .join("")}</div>`),
    ],
  })
}

// ------------------------------------------------------------ components
function propTable(part, props) {
  const showDefault = props.some((p) => p.default)
  const html = `<div class="table-wrap prop-table" tabindex="0" role="region" aria-label="${part} props"><table class="pui-table">
<thead><tr><th scope="col">Name</th><th scope="col">Type</th>${showDefault ? '<th scope="col">Default</th>' : ""}</tr></thead>
<tbody>${props
    .map(
      (p) => `<tr class="prop-row"><th scope="row"><code class="prop-name">${esc(p.name)}</code>${p.required ? '<span class="required">Required</span>' : ""}</th><td><code class="prop-type">${esc(p.type)}</code></td>${showDefault ? `<td>${p.default ? `<code>${esc(p.default)}</code>` : '<span aria-label="No default">—</span>'}</td>` : ""}</tr>
<tr class="prop-desc"><td colspan="${showDefault ? 3 : 2}">${mdInline(p.description || "")}</td></tr>`
    )
    .join("")}</tbody></table></div>`
  const mdText = `| Name | Type | Default | Description |\n| --- | --- | --- | --- |\n` +
    props.map((p) => `| \`${p.name}\`${p.required ? " (required)" : ""} | \`${p.type.replace(/\|/g, "\\|")}\` | ${p.default ? `\`${p.default}\`` : "—"} | ${p.description || ""} |`).join("\n")
  return { html, md: mdText }
}

for (const c of components) {
  const s = slug(c)
  const info = api[c]
  const raw = read(`docs/components/${s}.md`).replace(/^# .*\n+/, "")
  const [intro, ...parts] = raw.split(/^## /m)
  const install = (intro.match(/```bash\n([\s\S]*?)```/) || [])[1]?.trim() || `npx github:aline-aroucha/pui add ${s}`
  const lead = intro.replace(/```bash[\s\S]*?```/, "").trim()
  const access = parts.find((p) => p.startsWith("Accessibility"))
  const usage = parts.filter((p) => p !== access).map((p) => "### " + p.trim()).join("\n\n")
  const code = defaultCode(c)

  const example = {
    md: "```tsx\n" + code + "\n```",
    html: `<div class="vx" data-playground="${c}">
  <div class="vx-mount"></div>
  <div class="vx-code"><div class="vx-code-bar"><span>Code</span><button class="pui-btn pui-btn--ghost pui-btn--size-sm" type="button" data-copy-from="vx-code-${s}">Copy</button></div><pre tabindex="0"><code id="vx-code-${s}">${esc(code)}</code></pre></div>
</div>`,
  }
  const gallery = `<div class="example-frame"><div id="preview" class="pui-stage"></div></div>
<details class="code"><summary>Example source</summary><pre><code>${esc(read(`preview/examples/${c}.js`))}</code></pre></details>`
  const tables = Object.entries(info.parts).map(([part, props]) => ({ part, ...propTable(part, props) }))
  const apiMd = `Install:\n\n\`\`\`bash\n${install}\n\`\`\`\n\n\`\`\`tsx\n${info.anatomy}\n\`\`\`\n\n` + tables.map((t) => `### ${t.part}\n\n${t.md}`).join("\n\n")
  const apiHtml = `<p>Install with:</p><pre><code>${esc(install)}</code></pre>
<pre class="anatomy"><code>${esc(info.anatomy)}</code></pre>
${tables.map((t) => `<h3 id="${anchor(t.part)}-props">${t.part}</h3>${t.html}`).join("\n")}`

  emit({
    path: `components/${s}.html`,
    title: c,
    description: info.description,
    intro: example.html,
    introMd: example.md,
    sections: [
      section("Examples", null, gallery),
      section("Usage", usage),
      access ? section("Accessibility", access.replace(/^Accessibility\n+/, "").trim()) : null,
      section("API", apiMd, apiHtml),
    ].filter(Boolean),
    related: (info.related || []).map((r) => [`components/${slug(r)}.html`, r]),
    scripts: `<script src="../assets/vendor/react.production.min.js"></script>
<script src="../assets/vendor/react-dom.production.min.js"></script>
<script src="../assets/pui.js"></script>
<script src="../assets/playground.js"></script>
<script src="../assets/examples/${c}.js"></script>`,
  })
}

// ------------------------------------------------------------ assets and files for AI agents
write("assets/tokens.css", tokensCss)
for (const f of ["pui.css", "pui.js", "playground.js"]) cpSync(join(root, "preview", f), join(out, "assets", f))
cpSync(join(root, "preview/examples"), join(out, "assets/examples"), { recursive: true })
cpSync(join(root, "site/site.css"), join(out, "assets/site.css"))
cpSync(join(root, "site/site.js"), join(out, "assets/site.js"))
mkdirSync(join(out, "assets/vendor"), { recursive: true })
cpSync(join(root, "node_modules/react/umd/react.production.min.js"), join(out, "assets/vendor/react.production.min.js"))
cpSync(join(root, "node_modules/react-dom/umd/react-dom.production.min.js"), join(out, "assets/vendor/react-dom.production.min.js"))

cpSync(join(root, "tokens/tokens.json"), join(out, "tokens.json"))
cpSync(join(root, "src/styles/globals.css"), join(out, "globals.css"))
cpSync(join(root, "AGENTS.md"), join(out, "AGENTS.md"))
write(
  "llms.txt",
  `# PUI

> A design system for React + Tailwind v4: tokens, ${components.length} components and rules for AI agents. Behavior follows Magoo ${MAGOO_VERSION}. UI copy in US English.

Every page has a Markdown twin: replace \`.html\` with \`.md\`.

## Docs
- [All documentation](${abs("llms-full.txt")}): guidelines, rules and components in one file
- [Agent rules](${abs("AGENTS.md")}): what to always and never do
- [Use with AI](${abs("ai.md")}): installer, agent files, MCP servers
- [Tokens](${abs("tokens.json")}): light/dark colors, typography, spacing, radius, shadow
- [Colors](${abs("colors.md")}), [Typography](${abs("typography.md")}), [Spacing](${abs("spacing.md")})

## Install
- \`npx github:aline-aroucha/pui init\`: style, cn() helper, AGENTS.md, CLAUDE.md, Magoo MCP
- \`npx github:aline-aroucha/pui add <component>\`: components from ${abs("r/")}

## Components
${components.map((c) => `- [${c}](${abs(`components/${slug(c)}.md`)}): ${api[c].description}`).join("\n")}
`
)
write(
  "llms-full.txt",
  [read("AGENTS.md"), read("docs/guidelines.md"), ...components.map((c) => readFileSync(join(out, `components/${slug(c)}.md`), "utf8"))].join("\n\n---\n\n")
)
write(".nojekyll", "")
if (existsSync(join(root, "public/r"))) cpSync(join(root, "public/r"), join(out, "r"), { recursive: true })
// `shadcn build` skips items without `files` (like the style); write them here
for (const item of JSON.parse(read("registry.json")).items.filter((i) => !i.files)) {
  write(`r/${item.name}.json`, JSON.stringify({ $schema: "https://ui.shadcn.com/schema/registry-item.json", ...item }, null, 2) + "\n")
}
console.log(`_site/ built: ${components.length} components${SITE_URL ? ` for ${SITE_URL}` : ""}`)
