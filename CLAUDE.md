# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio and knowledge base site built with **MkDocs** using the **Material for MkDocs** theme, hosted on GitHub Pages at youngcharleslucas.github.io.

## Build Commands

```bash
# Start local development server with live reload
mkdocs serve

# Build static site
mkdocs build

# Deploy to GitHub Pages (normally handled by CI)
mkdocs gh-deploy --force
```

**Note:** Commands must be run with the Python virtual environment activated:
- PowerShell: `virtual\Scripts\Activate.ps1`
- cmd: `virtual\Scripts\activate.bat`

If cloning fresh, create a new venv and install: `pip install mkdocs-material`

## Architecture

### Key Files
- `mkdocs.yml` - Main configuration: site metadata, theme settings, markdown extensions, navigation structure
- `.github/workflows/ci.yml` - GitHub Actions deployment (auto-deploys on push to main)
- `overrides/main.html` - Custom HTML template override
- `docs/stylesheets/extra.css` - Custom CSS styling
- `docs/javascripts/mathjax.js` - MathJax configuration for math rendering

### Content Structure
All content lives in `docs/`:
- `index.md` - Homepage/Bio
- `WGU_Notes/` - University course notes organized by course code (D### or C###)
- `Library/` - External learning resources (Frontend Masters courses, algorithms)
- `Quotes.md` - Quote collection

### Enabled Markdown Features
- Code blocks with syntax highlighting and line numbers
- Mermaid diagrams (use `mermaid` fence)
- Tabbed content blocks (use `=== "Tab Name"`)
- Admonitions/callouts (use `!!! note "Title"` or `??? info` for collapsible)
- MathJax for LaTeX math (`$inline$` or `$$display$$`)
- Emoji via Twemoji

### Navigation
Navigation structure is defined in the `nav:` section of `mkdocs.yml`. To add new pages, create the markdown file in `docs/` and add an entry to the nav section.
