# Mermaid Ameliorated

**A lean, no-nonsense Mermaid diagram editor — stripped of AI prompts, upsells, and commercial branding.**

Forked from [mermaid-js/mermaid-live-editor](https://github.com/mermaid-js/mermaid-live-editor).

---

## Why this fork exists

The official [mermaid-live-editor](https://github.com/mermaid-js/mermaid-live-editor) is an excellent piece of software, but over time it has accumulated features that get in the way of its core job: editing diagrams.

### Problems with the upstream

| Issue                                 | Why it matters                                                                                                                    |
| ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **AI prompt popup**                   | Every time you open the editor you're greeted with a sign-up CTA for a commercial AI service. Interrupts flow, feels like adware. |
| **Mermaid Chart upsells**             | Buttons, banners, and UI elements throughout the app steer you toward a paid platform. The editor shouldn't be a funnel.          |
| **Editor chooser modal**              | An interstitial screen asking which "experience" you want before you can even type. Just show an editor.                          |
| **Analytics for sales**               | Event tracking feeds a marketing pipeline, not your productivity.                                                                 |
| **GitHub Actions that fail on forks** | The workflows require secrets only the upstream repo has. Forking means CI spam until you manually delete them all.               |

### What Mermaid Ameliorated does about it

- **Removes all AI prompts and sign-up CTAs** — no popups, no "Try free" buttons, no signup footers. The AI prompt popup component is gutted entirely; the "Try free" button just closes the dialog.
- **Removes all Mermaid Chart branding** — no logos, no promotional banners, no upsell links, no "Get started with Mermaid Chart" in share sections. The [`MermaidChartIcon`](src/lib/components/MermaidChartIcon.svelte), [`McWrapper`](src/lib/components/McWrapper.svelte), and [`EnhancedEditsButton`](src/lib/components/EnhancedEditsButton.svelte) components are stripped to pass-through shells.
- **Removes the editor chooser** — the [`EditorChooserModal`](src/lib/components/EditorChooserModal.svelte) and all its migration infrastructure are deleted. You land directly on the editor.
- **Disables Mermaid Chart link tracking** — the analytics call (`logMermaidChartClick`) is removed from every component that called it. The env var `MERMAID_IS_ENABLED_MERMAID_CHART_LINKS` is set to `false`.
- **Removes GitHub Actions workflows** — all 7 workflow files, Dependabot config, and CodeQL config are deleted. Your fork won't spam you with failed runs.
- **Removes GitHub dropdown navigation** — the redundant "Mermaid JS", "Mermaid Live Editor", and "Mermaid CLI" links in the navbar are gone.

The result: a diagram editor that loads fast, stays out of your way, and does exactly one thing well.

---

## Features added

### Azure DevOps Markdown export

The upstream only supports PNG/SVG download and HTML embed. If you work in Azure DevOps (which uses a different markdown image syntax), you had to manually format the URL. Mermaid Ameliorated adds a one-click "Copy ADO Markdown" button that copies `![Diagram](<data-url>)` directly to your clipboard.

**Why this matters**: If you paste diagrams into Azure DevOps wiki pages, PR comments, or work items, this saves you from manually constructing the markdown every time. It's a tiny quality-of-life win that compounds daily.

### 5 visual themes

Replaces the simple light/dark toggle with a proper theme switcher offering Light, Dark, Obsidian, Deep Black, and Mono Industrial. The theme is persisted to `localStorage` so it survives reloads.

**Why this matters**: Dark mode is great, but not all dark modes are equal. Some people want warm sepia tones (Obsidian) for late-night work, others want maximum contrast (Deep Black) for readability, and others prefer muted industrial tones. Choice reduces eye strain and makes the tool feel like yours.

- **Dark** (default) — PowerShell-inspired (`#0C0C0C` bg, `#D4D4D4` fg, `#0078D4` accent). Matches Windows Terminal, VS Code dark+, and Azure CLI aesthetics. Familiar if you work in the Microsoft ecosystem.
- **Obsidian** — warm brown-grey background with gold accents. Easier on the eyes in low-light environments than pure blue-on-black.
- **Deep Black** — true `#000000` background with green accents. Maximizes contrast for OLED screens and users who prefer harsh definition.
- **Mono Industrial** — neutral grey with orange accents. A middle ground for people who find blue or green accents distracting.
- **Light** — clean white background with blue accents. For bright rooms or users who prefer light mode.

### PowerShell-dark colour scheme as default

The entire UI uses `#0C0C0C` backgrounds, `#D4D4D4` foreground text, and `#0078D4` accent blue — matching the PowerShell / Windows Terminal aesthetic.

**Why this matters**: If you spend your day in a terminal, having the diagram editor match your shell's colour scheme reduces visual context-switching. Your eyes don't have to re-calibrate between tools.

### Monospace font stack

The UI font is `'Cascadia Code', 'JetBrains Mono', 'Fira Code', 'Cascadia Mono', 'Consolas', monospace` with ligatures disabled.

**Why this matters**: Mermaid diagrams are code. A monospace UI reinforces that mental model — what you're writing is a formal specification, not prose. Ligatures are disabled because they can mislead you about the actual characters in a Mermaid directive.

### Reduced border radius

All rounded corners are set to `0.25rem` (4px) instead of the default 8px+.

**Why this matters**: Large border radii look friendly but waste vertical space in a tool where every pixel of editing surface counts. Smaller radii feel more utilitarian and professional — like a developer tool, not a consumer app.

### No favicon tracking

The default favicon is a generic blue diamond, not the heart icon the upstream uses.

**Why this matters**: The upstream favicon was a heart — a marketing choice, not a utility one. A neutral icon keeps the browser tab unremarkable and doesn't prime an emotional response.

---

## Changelog

### 2026-06-11 — v1.0.0 Initial release

**Branding & commercial content removed:**

- Removed [`MermaidChartIcon`](src/lib/components/MermaidChartIcon.svelte) — brand logo component gutted to pass-through
- Removed [`McWrapper`](src/lib/components/McWrapper.svelte) — commercial wrapper layer stripped
- Removed [`EnhancedEditsButton`](src/lib/components/EnhancedEditsButton.svelte) — upsell CTA component gutted
- Removed [`EditorChooserModal`](src/lib/components/EditorChooserModal.svelte) — experience-selection interstitial deleted
- Removed `src/lib/util/promos/` and `src/lib/util/migration/` — promo content and migration utilities deleted
- Removed `src/lib/components/migration/` — migration UI components deleted
- Deleted `static/mermaidchart-logo.svg`, `static/favicon.png`, `static/favicon.ico`, `static/icons/mermaid-tail.svg`, `static/icons/mermaid.svg`
- Deleted all GitHub dropdown nav links (Mermaid JS, Mermaid Live Editor, Mermaid CLI)
- Removed `DropdownNavMenu` component from Navbar
- Disabled all Mermaid Chart link URLs in `src/lib/util/util.ts` (all return empty strings)
- Deleted `MCBaseURL`, `getCheckoutUrl`, `getMermaidAiLiveUrl`, `getUTMSource` from util
- Emptied `src/lib/util/constants.ts`
- Removed `logMermaidChartClick` from stats, removed all calls from Editor, DesktopEditor, Navbar
- Removed Mermaid Chart analytics event tracking throughout the app
- Disabled commercial links via `.env` (`MERMAID_IS_ENABLED_MERMAID_CHART_LINKS=false`)

**AI features removed:**

- Gutted [`AIPromptPopup`](src/lib/components/AIPromptPopup.svelte) — removed signup footer, "Try free" button now just closes the dialog
- Removed AIPromptPopup from DesktopEditor integration path
- Removed all AI-related promotional UI strings

**Site references cleaned:**

- Renamed all `mermaid-diagram-` and `mermaid-history-` filenames to `diagram-` and `history-`
- Removed `mermaid.live` / `mermaid-js/mermaid-live-editor` references from Privacy dialog text
- Replaced `mermaid.live` references in error/sample diagrams with generic placeholders
- Replaced heart favicon with generic blue diamond on dark background
- Updated `static/robots.txt` and `static/sitemap.xml` to remove `mermaid.live` references

**CI/CD & config removed:**

- Deleted all 7 GitHub Actions workflow files
- Deleted `.github/dependabot.yml`
- Deleted `.github/codeql-config.yml`
- Deleted `.github/FUNDING.yml`

**UI & theming overhaul:**

- Applied PowerShell-dark colour scheme as default (`#0C0C0C` bg, `#D4D4D4` fg, `#0078D4` accent)
- Applied global monospace font stack with ligatures disabled
- Reduced `border-radius` to `0.25rem` across all components
- Replaced simple dark/light toggle with 5-theme switcher (Light / Dark / Obsidian / Deep Black / Mono Industrial)
- Theme selection persisted to localStorage
- Monaco editor theme changes correctly with selected theme
- Updated DesktopEditor monaco theme to follow `mode-watcher` dark/light state
- Updated FloatingToolbar, Card, AIPromptPopup, dialog-content borders and styling
- Set `theme-color` meta to `#0C0C0C`

**New features:**

- Added Azure DevOps Markdown export — `urls.current.mdCodeAdo` generates `![Diagram](png-url)` format for ADO pasting
- Added `mdCodeAdo` to Actions.svelte toolbar as a CopyInput button
- Theme icon component shows distinct icon per theme (sun/moon/bedtime/dark-mode/contrast)

### Planned

- [ ] GitHub Pages deployment via `docs/` folder
- [ ] Custom theme editor

---

## Development

```bash
pnpm install
pnpm dev -- --open
```

## Build

```bash
pnpm build
```

Static output is written to `docs/` for GitHub Pages or any static host.

## License

MIT — see [LICENSE](LICENSE). Upstream attribution retained as required by the original MIT license.
