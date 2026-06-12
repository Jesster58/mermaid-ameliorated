# Mermaid Ameliorated

A fork of [mermaid-js/mermaid-live-editor](https://github.com/mermaid-js/mermaid-live-editor) focused on being a **pure, no-nonsense diagram editor** — stripped of AI prompts, upsells, and commercial branding.

## Why this exists

The official live editor has become increasingly heavyweight with:

- AI prompt popups and signup CTAs
- Mermaid Chart commercial upsells throughout the UI
- Analytics that serve the company's sales funnel
- Growing complexity that distracts from the core task: editing diagrams

Mermaid Ameliorated strips all of that away. No AI features, no upsells, no account prompts — just you, your diagram, and the Mermaid renderer.

## What's different

- **No AI prompts** — the AI popup and its ecosystem are removed entirely
- **No commercial branding** — all Mermaid Chart logos, promos, and upsells are gone
- **Clean UI** — PowerShell-dark colour scheme, monospace font, tighter borders
- **5 editor themes** — Light, Dark (the default), Obsidian, Deep Black, Mono Industrial
- **ADO Markdown export** — copy diagrams as `![Diagram](...)` markdown for Azure DevOps
- **No CI workflows** — the upstream's GitHub Actions (which need secrets) are removed so your fork doesn't spam you with failures
- **Same Mermaid renderer** — under the hood it's the exact same `mermaid.render()`; all features, syntax, and diagram types work identically

## Changelog

### 2026-06-11 — Initial release

- Forked from mermaid-js/mermaid-live-editor @ v2.0.67
- Removed MermaidChartIcon, McWrapper, EnhancedEditsButton, EditorChooserModal
- Removed AI Prompt Popup signup footer and "Try free" links
- Removed all promotional banners, share-brand headings, and GitHub dropdown links
- Stripped Mermaid Chart analytics event tracking
- Disabled Mermaid Chart links via environment config
- Replaced favicon with generic blue diamond
- Re-themed to PowerShell dark mode colours (`#0C0C0C` background, `#D4D4D4` foreground, `#0078D4` accent)
- Switched to monospace font stack (Cascadia Code / JetBrains Mono / Fira Code)
- Reduced border-radius to `0.25rem` throughout
- Added Azure DevOps Markdown export (`![Diagram](...)` format)
- Removed all GitHub Actions workflows, Dependabot, and CodeQL config
- Removed site references in privacy dialog and error diagrams
- Replaced simple dark/light toggle with 5-theme switcher (Light / Dark / Obsidian / Deep Black / Mono Industrial)
- All theme changes persisted to localStorage and reflected in Monaco editor theming

## Development

```bash
pnpm install
pnpm dev -- --open
```

## Build

```bash
pnpm build
```

Output is written to `docs/` for GitHub Pages or static hosting.

## License

MIT — see [LICENSE](LICENSE). Upstream attribution retained as required by the original MIT license.
