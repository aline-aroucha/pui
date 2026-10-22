#!/usr/bin/env node
// pui — installs the PUI design system into a React + Tailwind v4 project.
// Components come from the PUI registry and are installed with the shadcn CLI.
import { spawnSync } from "node:child_process"
import { existsSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const SHADCN = "shadcn@4.21.3"
const DEFAULT_REGISTRY = "https://aline-aroucha.github.io/pui/r"
const COMPONENTS = ["alert", "avatar", "badge", "button", "card", "checkbox", "field", "input", "label",
  "password-input", "select", "separator", "skeleton", "switch", "table", "tabs", "textarea"]
const MAGOO_MCP = { command: "npx", args: ["-y", "@acessibilidade/magoo-mcp@1.6.0"] }
const pkgDir = join(dirname(fileURLToPath(import.meta.url)), "..")
const cwd = process.cwd()

const args = process.argv.slice(2)
const flag = (name) => {
  const i = args.indexOf(name)
  if (i < 0) return undefined
  const v = args[i + 1]
  args.splice(i, 2)
  return v
}
const registry = (flag("--registry") || process.env.PUI_REGISTRY_URL || DEFAULT_REGISTRY).replace(/\/$/, "")
const force = args.includes("--force") && args.splice(args.indexOf("--force"), 1)
const yes = args.includes("--yes") && args.splice(args.indexOf("--yes"), 1)
const overwrite = args.includes("--overwrite") && args.splice(args.indexOf("--overwrite"), 1)
const [command, ...rest] = args
const url = (name) => `${registry}/${name}.json`

function shadcn(...a) {
  const r = spawnSync("npx", ["--yes", SHADCN, ...a, ...(yes ? ["--yes"] : [])], {
    stdio: "inherit",
    shell: process.platform === "win32",
  })
  if (r.status !== 0) process.exit(r.status ?? 1)
}

function help() {
  console.log(`pui — the PUI design system

Usage
  pui init              Set up the project: PUI style, cn() helper, AGENTS.md, CLAUDE.md, Magoo MCP
  pui add <name...>     Add components (e.g. pui add button card input)
  pui add --all         Add all ${COMPONENTS.length} components
  pui list              List available components

Options
  --registry <url>      Registry base URL (default ${DEFAULT_REGISTRY})
  --force               Overwrite AGENTS.md on init
  --overwrite           Replace components you already installed (to update them)
  --yes                 Skip confirmation prompts

Docs: ${registry.replace(/\/r$/, "")}`)
}

function writeAgentRules() {
  const rules = readFileSync(join(pkgDir, "AGENTS.md"), "utf8")
  const agents = join(cwd, "AGENTS.md")
  if (existsSync(agents) && !force) {
    console.log("AGENTS.md already exists; kept it (use --force to replace).")
  } else {
    writeFileSync(agents, rules)
    console.log("Wrote AGENTS.md")
  }
  const claude = join(cwd, "CLAUDE.md")
  const current = existsSync(claude) ? readFileSync(claude, "utf8") : ""
  if (!current.includes("@AGENTS.md")) {
    writeFileSync(claude, current ? `${current.trimEnd()}\n\n@AGENTS.md\n` : "@AGENTS.md\n")
    console.log(current ? "Linked AGENTS.md from CLAUDE.md" : "Wrote CLAUDE.md")
  }
}

function writeComponentsJson() {
  const cssCandidates = ["src/app/globals.css", "app/globals.css", "src/index.css", "src/styles/globals.css", "styles/globals.css", "src/styles.css"]
  const css = cssCandidates.find((p) => existsSync(join(cwd, p)))
  if (!css) {
    console.error(`Couldn't find your main CSS file (looked for ${cssCandidates.join(", ")}). Create it with @import "tailwindcss"; and run pui init again.`)
    process.exit(1)
  }
  const config = {
    $schema: "https://ui.shadcn.com/schema.json",
    style: "new-york",
    rsc: existsSync(join(cwd, "src/app")) || existsSync(join(cwd, "app")),
    tsx: existsSync(join(cwd, "tsconfig.json")),
    tailwind: { config: "", css, baseColor: "neutral", cssVariables: true, prefix: "" },
    iconLibrary: "lucide",
    aliases: { components: "@/components", utils: "@/lib/utils", ui: "@/components/ui", lib: "@/lib", hooks: "@/hooks" },
  }
  writeFileSync(join(cwd, "components.json"), JSON.stringify(config, null, 2) + "\n")
  console.log(`Wrote components.json (styles in ${css})`)
}

// Magoo (https://magoo.cc) is the behavior and accessibility reference PUI follows; its MCP is read-only.
function addMagooMcp() {
  const file = join(cwd, ".mcp.json")
  const config = existsSync(file) ? JSON.parse(readFileSync(file, "utf8")) : {}
  if (config.mcpServers?.magoo) return
  config.mcpServers = { ...config.mcpServers, magoo: MAGOO_MCP }
  writeFileSync(file, JSON.stringify(config, null, 2) + "\n")
  console.log("Added the Magoo MCP to .mcp.json")
}

function addRegistryAlias() {
  const file = join(cwd, "components.json")
  if (!existsSync(file)) return
  const config = JSON.parse(readFileSync(file, "utf8"))
  config.registries = { ...config.registries, "@pui": `${registry}/{name}.json` }
  writeFileSync(file, JSON.stringify(config, null, 2) + "\n")
  console.log('Registered "@pui" in components.json')
}

switch (command) {
  case "init": {
    if (!existsSync(join(cwd, "package.json"))) {
      console.error("No package.json here. Run pui init inside a React project (Next.js or Vite) with Tailwind v4.")
      process.exit(1)
    }
    if (!existsSync(join(cwd, "components.json"))) writeComponentsJson()
    addRegistryAlias()
    shadcn("add", url("style"))
    writeAgentRules()
    addMagooMcp()
    console.log("\nPUI is ready. Next: npx github:aline-aroucha/pui add button")
    break
  }
  case "add": {
    const names = rest.includes("--all") ? COMPONENTS : rest
    if (!names.length) {
      console.error("Name at least one component, e.g. pui add button. See pui list.")
      process.exit(1)
    }
    const unknown = names.filter((n) => !COMPONENTS.includes(n))
    if (unknown.length) {
      console.error(`Unknown component: ${unknown.join(", ")}. Available: ${COMPONENTS.join(", ")}`)
      process.exit(1)
    }
    shadcn("add", ...names.map(url), ...(overwrite ? ["--overwrite"] : []))
    break
  }
  case "list":
    console.log(COMPONENTS.join("\n"))
    break
  case undefined:
  case "help":
  case "--help":
  case "-h":
    help()
    break
  default:
    console.error(`Unknown command "${command}".\n`)
    help()
    process.exit(1)
}
