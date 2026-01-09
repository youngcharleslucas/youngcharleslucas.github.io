Format a regular markdown file to python markdown for Material for Mkdocs: $ARGUMENTS

$ARGUMENTS: The file or files in a directory that I want converted  

# Convert to Material for Mkdocs

## Purpose

**Ultrathink for this task**  

Convert standard GitHub-flavored markdown files to enhanced Python-Markdown format optimized for Material for Mkdocs, with intelligent use of admonitions, annotations, code blocks, tabs, content tabs, icons, and visual enhancements.

The point of these documents is to provide study material that can be easily ingested 
into memory. I will use this material for future job interviews or to give training 
sessions on topics at work.  

Some of these documents might be used for procedures to perform practicals on topics 
so that I have experience performing tasks with technologies and systems.  

## Instructions

### Analysis Phase
1. **Read and understand the content**: Carefully analyze the markdown file to understand its structure, key concepts, and intended audience
2. **Identify enhancement opportunities**: Look for content that would benefit from:
   - Admonitions (notes, warnings, tips, examples, etc.)
   - Code blocks with syntax highlighting and annotations
   - Tabbed content for alternative approaches or examples
   - Image placement and captions
   - Highlighted key terms and concepts
   - Icons for visual interest
   - Content organization improvements

### Conversion Rules

#### Admonitions
Use admonitions to highlight important information. You can use your disgression 
to determine if there are sections that need to be converted to admonitions. 
Convert relevant content using these types:

- `!!! note` - General information, definitions, or context
- `!!! tip` - Helpful suggestions or best practices
- `!!! warning` - Cautionary information or common pitfalls
- `!!! danger` - Critical warnings about destructive or risky actions
- `!!! example` - Code examples or use cases
- `!!! info` - Additional context or reference information
- `!!! success` - Positive outcomes or completion indicators
- `!!! question` - FAQ items or clarifying questions
- `!!! quote` - Quotations or citations

Use collapsible admonitions (`???`) for optional or advanced content:
```markdown
??? note "Optional: Advanced Configuration"
    This section covers advanced options...
```

#### Code Blocks
Enhance code blocks with:
- Proper language identifiers for syntax highlighting
- Titles using `title="filename.py"`
- Line highlighting using `hl_lines="2 3"`
- Line numbers using `linenums="1"`
- Annotations using `# (1)` with explanation blocks

Example:
```markdown
```python title="example.py" linenums="1" hl_lines="2 3"
def hello_world():
    print("Hello")  # (1)
    return True

1. This prints a greeting message
``` (close with three backticks)
```

#### Content Tabs
Use tabs for alternative approaches, different languages, or platform-specific content:

```markdown
=== "Python"
    ```python
    print("Hello, World!")
    ```

=== "JavaScript"
    ```javascript
    console.log("Hello, World!");
    ```
```

#### Key Terms and Emphasis
- Use ==highlight syntax== for key terms or concepts (requires pymdownx.mark extension)
- Use **bold** for important terminology
- Use `inline code` for commands, functions, or technical terms
- Add icons using `:material-icon-name:` syntax where appropriate

#### Images
Enhance images with:
- Descriptive captions
- Alignmen images in the center
- Width specifications using `{ width="300" }`
- Lazy loading using `{ loading=lazy }`
- If you can, cite the source of the images, like where they came from on the web, 
  or who created the image.

Example:
```markdown
<figure markdown="span">
  ![Image title](https://dummyimage.com/600x400/)
  <figcaption>Image caption</figcaption>
</figure>
```

#### Bullets  
-   Bullets will use `-` and not `*`  
-   The spacing after `-` will be three spaces, totaling for character spaces from 
    the left of the start of a line before text is entered.  
-   Try to keep the width of a line less than 80 characters long  
-   If a bullet takes up multiple lines, then all lines below the first line must 
    match the same indention of 4 spaces.  
-   Multiple line paragraphs are continued together with one space at the end of the 
    line.  
-   To end a line and begin a new bullet or paragraph, you finish the line with *two spaces*  

#### Task Lists
Convert bullet points to interactive task lists where appropriate:
```markdown
- [x] Completed task
- [ ] Pending task
```

#### Tables  
If you see information that can be summarized to help emphasize important 
topics or provide comparisons of topics then put them in a table.  
Enhance tables with alignment and formatting:
```markdown
| Feature | Description | Status |
|---------|:------------|:------:|
| Item 1  | Description | ✅ |
```

#### Annotations
Add inline annotations for complex concepts:
```markdown
This is important text (1) that needs explanation.
{ .annotate }

1. Here's the detailed explanation
```

### Content Enhancement Strategy

When converting, intelligently:

1. **Structure improvements**:
   - Add table of contents hints if document is long
   - Group related content into sections
   - Use admonitions to break up long text blocks

2. **Visual hierarchy**:
   - Ensure proper heading levels (don't skip levels)
   - Add horizontal rules (`---`) to separate major sections
   - Use blockquotes for important callouts

3. **Educational enhancements**:
   - Convert plain examples to admonition examples
   - Add "tip" admonitions for best practices
   - Create "warning" admonitions for common mistakes
   - Use tabs for "before/after" or comparison examples

4. **Interactive elements**:
   - Convert applicable lists to task lists
   - Add keyboard shortcuts using `++ctrl+c++` syntax
   - Include icons for better visual scanning

5. **Code improvements**:
   - Add annotations to explain complex code
   - Use line highlighting for important lines
   - Add titles to code blocks showing filenames
   - Group related code examples in tabs

### Metadata
Add proper frontmatter to the converted file:

```yaml
---
title: Document Title
description: Brief description of the document
tags:
  - relevant
  - tags
  - here
---
```

### Output Format
- Preserve all original content and meaning
- Maintain the logical flow and organization
- Add enhancements that genuinely improve understanding
- Don't over-use admonitions (use judiciously where they add value)
- Test that all syntax is valid Python-Markdown with Material extensions
- Include a comment at the top noting it was converted for Material for Mkdocs

### Example Conversion

**Before (GitHub Markdown):**
```markdown
# Installation

To install the package, run:

pip install mypackage

Note: Make sure Python 3.8+ is installed.

## Usage

Here's a basic example:

import mypackage
mypackage.run()

You can also pass options to customize behavior.
```

**After (Material for Mkdocs):**
```markdown
---
title: Installation Guide
description: How to install and use mypackage
---

<!-- Converted for Material for Mkdocs -->

# Installation

!!! info "Prerequisites"
    Make sure you have ==Python 3.8+== installed before proceeding.

To install the package, run the following command:

```bash title="Terminal"
pip install mypackage
```

## Usage

Here's a basic example to get started:

```python title="basic_usage.py" linenums="1"
import mypackage

mypackage.run()  # (1)
```

1. Runs the package with default settings

!!! tip "Customization"
    You can pass options to `run()` to customize behavior according to your needs.

=== "Basic Usage"
    ```python
    mypackage.run()
    ```

=== "With Options"
    ```python
    mypackage.run(verbose=True, timeout=30)
    ```
```

## Index File Handling

Material for Mkdocs uses `index.md` files as the default page for each directory. Follow these rules:

### Rule 1: Single File in Directory
If a directory contains **only one markdown file**, rename the converted file to `index.md`:

```
folder/
  └── guide.md  →  guide-mkdocs.md  →  index.md
```

### Rule 2: Multiple Files Without Parent Match
If a directory contains **two or more markdown files** and **none** of the filenames match the parent folder name, do NOT create an `index.md` file. Keep all files with their original names (plus `-mkdocs` suffix):

```
tutorials/
  ├── getting-started.md  →  getting-started-mkdocs.md
  └── advanced-usage.md   →  advanced-usage-mkdocs.md
(No index.md created)
```

### Rule 3: File Matches Parent Folder Name
If a directory contains a markdown file whose name matches the parent folder name, convert that file to `index.md`:

```
installation/
  ├── installation.md     →  index.md
  ├── prerequisites.md    →  prerequisites-mkdocs.md
  └── troubleshooting.md  →  troubleshooting-mkdocs.md
```

### Index File Priority
When determining which file should become `index.md`, check in this order:
1. File that matches parent folder name (e.g., `installation.md` in `installation/`)
2. If only one file exists, use that file
3. Otherwise, don't create an index file

!!! tip "Navigation Structure"
    Having an `index.md` file in each directory creates a cleaner navigation structure in Material for Mkdocs, as users will land on the index page when clicking a section in the navigation menu.

## Execution Steps

1. Ask for the path to the markdown file(s) to convert (can be a file or directory)
2. If a directory is provided, scan for all `.md` files
3. Analyze the directory structure to determine index file handling
4. Read and analyze each file
5. Create converted versions following the index file rules above
6. Explain the enhancements made and any index file decisions
7. Provide a summary of Material for Mkdocs extensions that should be enabled in `mkdocs.yml`

## Required Extensions

Inform the user they should have these extensions enabled in their `mkdocs.yml`:

```yaml
markdown_extensions:
  - admonition
  - pymdownx.details
  - pymdownx.superfences
  - pymdownx.tabbed:
      alternate_style: true
  - pymdownx.highlight:
      anchor_linenums: true
  - pymdownx.inlinehilite
  - pymdownx.snippets
  - pymdownx.critic
  - pymdownx.mark
  - pymdownx.keys
  - pymdownx.tasklist:
      custom_checkbox: true
  - attr_list
  - md_in_html
  - pymdownx.emoji:
      emoji_index: !!python/name:material.extensions.emoji.twemoji
      emoji_generator: !!python/name:material.extensions.emoji.to_svg
```

## Quality Principles

- **Clarity over complexity**: Only add features that genuinely improve understanding
- **Consistency**: Use similar patterns for similar types of content
- **Visual balance**: Don't over-use colors, boxes, or emphasis
- **Accessibility**: Ensure all enhanced content is still readable and logical
- **Semantics**: Use admonition types that match their content's meaning
