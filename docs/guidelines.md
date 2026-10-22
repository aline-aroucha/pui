# PUI guidelines

PUI is a design system built on [shadcn/ui](https://ui.shadcn.com): the same components and CSS variable names, with the PUI identity. A neutral base in a slightly green-tinted gray and **one** brand color, the deep teal `primary`. Everything here is written to be followed by people and by AI agents alike.

## Rules for AI agents

Read this section before generating any PUI interface.

1. **Use the PUI components** from `@/components/ui/*`. Install what is missing with `npx github:aline-aroucha/pui add <name>`. Don't hand-build Button, Input, Select and so on.
2. **Color only through tokens.** Use the semantic Tailwind classes generated from the tokens: `bg-background`, `text-foreground`, `bg-primary text-primary-foreground`, `text-muted-foreground`, `border-border`, `bg-success text-success-foreground`. **Never** use hex, `rgb()` or the Tailwind palette (`bg-teal-600`, `text-gray-500`, `bg-white`, `text-black`).
3. **Every background has its text pair.** `bg-primary` → `text-primary-foreground`; `bg-accent` → `text-accent-foreground`. Don't put `text-white` on a color: in the dark theme the pair is dark text.
4. **Dark mode is automatic** through the `.dark` class on `<html>`. Don't write `dark:` color overrides; the tokens already switch.
5. **Spacing on the 4px scale:** `gap-2` (8), `gap-4` (16), `gap-6` (24), `gap-8` (32), `py-12` (48). No arbitrary values (`p-[13px]`).
6. **Radii:** `rounded-md` on controls, `rounded-lg` on alerts and popovers, `rounded-xl` on cards, `rounded-full` on avatars and switches.
7. **One primary action per area.** The others are `secondary`, `outline` or `ghost`.
8. **UI copy in US English**, sentence case, en-US formats (`$1,280.00`, `Oct 21, 2026`, `9:42 AM`).
9. **Accessibility:** every control has a `Label`; icon-only buttons have an `aria-label`; status is never conveyed by color alone (add an icon or a word).
10. **Icons:** [Heroicons](https://heroicons.com) from `@heroicons/react`, at the size each style was drawn for: Micro (`16/solid`, `size-4`) in buttons, fields and badges; Mini (`20/solid`, `size-5`) in menus, lists and next to headings; Outline (`24/outline`, `size-6`) in navigation and empty states. Never `lucide-react`. Decorative icons stay hidden from screen readers (Heroicons sets `aria-hidden` by default).
11. **Behavior follows [Magoo](https://magoo.cc/en).** Before building or changing a component, read its Magoo page (or ask the Magoo MCP) and meet its keyboard, screen reader, touch and acceptance criteria.

## Behavior and accessibility

PUI defines how things look; how they behave follows **[Magoo](https://magoo.cc/en)** 1.6.0, the interaction-behavior library by Marcelo Sales (MIT). Every component page has an **Accessibility** section adapted from its Magoo entry, with the Magoo IDs it is based on.

- **Every interactive state is visible:** hover, pressed, keyboard focus (solid 2px ring), selected, disabled, invalid. None depends on color alone.
- **Keyboard:** `Tab` / `Shift+Tab` follow the visual order; `Enter` and `Space` act like the native element; `Esc` closes overlays; focus is never trapped outside dialogs and always lands somewhere predictable after an element closes.
- **Screen readers** hear a name, a role and a state for every control. Messages are announced by urgency: `role="alert"` only for critical ones, `role="status"` for the rest, never on every keystroke.
- **Forms:** persistent labels, instructions and errors tied to the field (`Field`), values kept after an invalid submit, concrete error text.
- **Touch:** labels are part of the target; controls keep comfortable touch areas, also with zoom.
- **Motion:** animations stop when the person prefers reduced motion; a loader never replaces the final message.
- Components PUI doesn't ship yet (Modal, Dialogs, Toasts, Accordion, Menu, Tooltip, Radio button, Slider, Autocomplete, Dates, File upload, Breadcrumb, Pagination, Step indicator, Carousel, Drag and drop, Links, Lists, Headings, Page regions, Tabbar) still follow their Magoo page when you build them.

Agents can query Magoo directly through its read-only MCP server (Node.js 20.19+):

```json
{
  "mcpServers": {
    "magoo": { "command": "npx", "args": ["-y", "@acessibilidade/magoo-mcp@1.6.0"] }
  }
}
```

Magoo is educational guidance, not a certification: verify each behavior in the implementation.

## Color

Neutrals lean slightly toward the brand green so they don't read as stock gray. The brand appears sparingly and on purpose: main action, active item, focus, links, chart series 1.

| Token | Light | Dark | Usage |
| --- | --- | --- | --- |
| `background` | `#ffffff` | `#0a1110` | Page background. Tailwind: bg-background. |
| `foreground` | `#0d1615` | `#e6eeec` | Primary text on background, card and popover (18:1 light, 16:1 dark). |
| `card` | `#ffffff` | `#101918` | Card and raised panel background. Tailwind: bg-card. |
| `card-foreground` | `{foreground}` | `{foreground}` | Text inside a card. |
| `popover` | `#ffffff` | `#101918` | Background of popovers, menus, the open Select and tooltips. |
| `popover-foreground` | `{foreground}` | `{foreground}` | Text inside a popover. |
| `primary` | `#0b6b60` | `#45c4b0` | The PUI brand color (deep teal). Primary action, active item, links. As text it reads on background and card (6.4:1 / 8.9:1). One primary action per area. |
| `primary-foreground` | `#f3fbf9` | `#032019` | Text and icons on primary (6.1:1 / 8:1). Dark text in the dark theme: never hard-code white on primary. |
| `secondary` | `#f0f4f3` | `#1a2624` | Secondary buttons and surfaces. Tailwind: bg-secondary. |
| `secondary-foreground` | `#14211f` | `#e6eeec` | Text on secondary. |
| `muted` | `#f0f4f3` | `#1a2624` | Quiet backgrounds: table row hover, Skeleton, empty areas. |
| `muted-foreground` | `#576865` | `#93a5a1` | Secondary text, descriptions, placeholders, metadata. Reads on background, card and muted (≥5.3:1). |
| `accent` | `#e3f1ee` | `#16302c` | Hover and highlight for menu items, ghost buttons and selected rows. |
| `accent-foreground` | `#0e3c36` | `#c3ebe3` | Text on accent (10:1). |
| `destructive` | `#c8321f` | `#f0715f` | Destructive actions and errors. As text it reads on background (5.3:1 / 6.6:1). |
| `destructive-foreground` | `#ffffff` | `#2a0804` | Text on destructive (≥5.3:1 in both themes). |
| `success` | `#13734a` | `#4cc38a` | Success and confirmation states. Always pair it with an icon or a word. |
| `success-foreground` | `#ffffff` | `#03200f` | Text on success. |
| `warning` | `#a35a00` | `#f0a54a` | Warnings and pending states. Always pair it with an icon or a word. |
| `warning-foreground` | `#ffffff` | `#2a1600` | Text on warning. |
| `border` | `#dce4e2` | `#24332f` | Dividers and card borders. Decorative: carries no meaning on its own. |
| `input` | `#82928e` | `#56706b` | Field borders (Input, Select, Checkbox, Switch off). Strong enough to reach 3:1. |
| `ring` | `{primary}` | `{primary}` | Focus ring: 2px solid + 2px offset on background. ≥6:1 in both themes. |
| `chart-1` | `#0b6b60` | `#45c4b0` | Chart series 1 (the brand). |
| `chart-2` | `#2f74b5` | `#6aa9e6` | Chart series 2. |
| `chart-3` | `#c9821f` | `#f0b257` | Chart series 3. |
| `chart-4` | `#7a52b3` | `#b08ae0` | Chart series 4. |
| `chart-5` | `#5b6b68` | `#a3b3af` | Chart series 5 ("other"). |

- Checked text pairs: every text color is ≥ 4.5:1 on the backgrounds its usage names, in both themes; field borders (`input`) and the focus ring (`ring`) are ≥ 3:1.
- `success`, `warning`, `destructive-foreground` and the matching Badge variants are **PUI additions** to shadcn, for record status.
- `border` is decorative (≈1.3:1). When a border outlines a control, use `input`.
- Charts: `chart-1` … `chart-5` in order; they also differ in lightness, not only in hue.

## Typography

**Geist** for UI and headings, **Geist Mono** for code and aligned numbers (both from Google Fonts, the same as shadcn v4). The UI base is 14px (`text-sm`); content pages use 16px with `leading-7`.

- Headings `h1`–`h4` in `tracking-tight`, with `text-wrap: balance`. One `h1` per screen.
- UI: `body` (14/20). Labels: `label` (14/14, 500). Captions and badges: `caption` (12/16).
- Numbers in columns: `font-mono tabular-nums`, right-aligned.

## Spacing, radius and shadow

- 4px scale (`space-1` to `space-12`). Lay out with `flex`/`grid` and `gap`, not with margins on each child.
- `--radius` = 0.5rem; `radius-sm` 4px, `radius-md` 6px, `radius-lg` 8px, `radius-xl` 12px, as shadcn derives them.
- Subtle shadows: `shadow-xs` on controls, `shadow-sm` on cards, `shadow-md` on popovers, `shadow-lg` on dialogs. Surfaces separate through `border` first, then shadow.

## States

- **Focus:** solid 2px ring in `ring` with a 2px offset (`focus-visible:ring-2 ring-ring ring-offset-2`), keyboard only.
- **Hover:** primary darkens 10%; ghost and outline get `bg-accent text-accent-foreground`.
- **Disabled:** `opacity-50` and `pointer-events-none`. Explain nearby why it is disabled.
- **Error:** `aria-invalid` + `destructive` border + a message in `text-destructive` below the field.
- **Loading:** a `Skeleton` shaped like the content; in buttons, a spinning `Loader2` icon + label ("Saving…").

## Voice and content

- Direct and calm, like an experienced colleague. Address the reader as "you".
- Buttons use verbs that name the result: "Save changes", "Delete project", "Export CSV". Avoid "OK", "Submit", "Click here".
- Errors say what happened and how to fix it, without apologizing: "The card ending in 4821 has expired. Update your payment method."
- Sentence case in headings and buttons ("Account details", not "Account Details"). No emoji in the UI.
- Empty states say what will appear and how to start: "No orders yet. Orders from the ERP show up here after the first sync."

## Iconography

Icons come from [Heroicons](https://heroicons.com) (MIT), by the makers of Tailwind CSS, through `@heroicons/react`. Each style is drawn for one size, so pick the style by size instead of scaling:

| Style | Import | Size | Use |
| --- | --- | --- | --- |
| Micro | `@heroicons/react/16/solid` | 16px, `size-4` | Inside buttons, fields, badges, alerts, table cells |
| Mini | `@heroicons/react/20/solid` | 20px, `size-5` | Menus, lists, next to `h3`/`h4` headings |
| Outline | `@heroicons/react/24/outline` | 24px, `size-6` | Primary navigation, empty states, large actions |
| Solid | `@heroicons/react/24/solid` | 24px, `size-6` | Selected state of an Outline icon (e.g. active tab bar item) |

- Icons inherit `currentColor`; color them with text tokens (`text-muted-foreground`, `text-destructive`), never with hex.
- An icon next to text is decorative: Heroicons renders `aria-hidden="true"` by default. An icon-only button needs `aria-label` on the button.
- Status icons pair with a word: `CheckCircleIcon` + "Paid", `ExclamationTriangleIcon` + "Pending", `ExclamationCircleIcon` + "Declined".
- Components from shadcn/ui that PUI doesn't ship import `lucide-react`; replace those icons with their Heroicons match before using them:

| lucide-react | Heroicons |
| --- | --- |
| `Check` | `CheckIcon` |
| `ChevronDown` / `ChevronUp` / `ChevronRight` | `ChevronDownIcon` / `ChevronUpIcon` / `ChevronRightIcon` |
| `X` | `XMarkIcon` |
| `Search` | `MagnifyingGlassIcon` |
| `Plus` / `Minus` | `PlusIcon` / `MinusIcon` |
| `CircleAlert` / `TriangleAlert` / `Info` | `ExclamationCircleIcon` / `ExclamationTriangleIcon` / `InformationCircleIcon` |
| `Eye` / `EyeOff` | `EyeIcon` / `EyeSlashIcon` |
| `Loader2` | `ArrowPathIcon` with `motion-safe:animate-spin` |
| `MoreHorizontal` | `EllipsisHorizontalIcon` |
| `Calendar` | `CalendarIcon` |

PUI has no logo yet: the name is set in type. When a mark exists, it goes in the "Logos" asset group.

## Components

PUI ships 17 components: Alert, Avatar, Badge, Button, Card, Checkbox, Field, Input, Label, PasswordInput, Select, Separator, Skeleton, Switch, Table, Tabs, Textarea. They start from the shadcn/ui source, adjusted to the PUI tokens (destructive text pairs, solid focus ring, badge radius, `success` and `warning` variants) and to the Magoo behavior rules (urgency-based alert roles, hover and pressed feedback, mixed checkbox, keyboard-scrollable tables, reduced motion). Any other shadcn/ui component (Dialog, DropdownMenu, Sheet, Sonner, Command…) also works: it inherits the PUI tokens automatically.

## Using it in code

In a React project with Tailwind v4 (Next.js or Vite):

```bash
npx github:aline-aroucha/pui init
npx github:aline-aroucha/pui add button input label card
```

`init` sets up the project, installs the PUI theme and writes `AGENTS.md` + `CLAUDE.md`, the files that make Claude, Cursor and Copilot follow these rules.
