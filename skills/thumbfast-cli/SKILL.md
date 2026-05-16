---
name: thumbfast-cli
description: "Manage Thumbfa.st via CLI - thumbnail generation, persons, inspirations, images, and credits. Use when the user mentions Thumbfa.st, thumbfast, thumbnail generation, AI thumbnails, generate thumbnail, face references, reference images, inspirations, or credit usage."
category: content-creation
---

# thumbfast-cli

## When To Use This Skill

Use the `thumbfast-cli` skill when you need to:

- Generate AI thumbnails from text prompts or reference images
- Check the status of ongoing thumbnail generations
- Create variations of existing thumbnails
- Manage person face references for consistent thumbnail generation
- Upload and manage reference images
- Browse and manage thumbnail inspirations
- Check credit balance and usage history

## Capabilities

- Generate thumbnails using AI models (Gemini) from text prompts and reference images
- Track generation status and cancel in-progress generations
- Create variations of existing thumbnail prompts
- Manage person records (face references) for use in thumbnail generation
- Upload images from URLs as references for generation
- Browse, search, and manage inspiration thumbnails
- View credit balance and detailed usage history

## Common Use Cases

- "Generate a thumbnail for my React tutorial video"
- "Check if my thumbnail generation is done"
- "Create a variation of my last thumbnail with a darker background"
- "Add myself as a person for face consistency"
- "Upload this image as a reference"
- "Show me coding-related inspirations"
- "How many credits do I have left?"
- "Show my credit usage for the last week"

## Setup

If `thumbfast-cli` is not found, install and build it:
```bash
bun --version || curl -fsSL https://bun.sh/install | bash
npx api2cli bundle thumbfast
npx api2cli link thumbfast
```

`api2cli link` adds `~/.local/bin` to PATH automatically. The CLI is available in the next command.

Always use `--json` flag when calling commands programmatically.

## Working Rules

- Always use `--json` for agent-driven calls so downstream steps can parse the result.
- Start with `--help` if the exact action or flags are unclear instead of guessing.
- Prefer read commands first when you need to inspect current state before mutating data.
- All API calls use POST internally. The CLI abstracts this completely.
- Token prefix is `tf_`. Tokens are stored in `~/.config/tokens/thumbfast-cli.txt`.

## Authentication

```bash
thumbfast-cli auth set "tf_your-token"
thumbfast-cli auth test
```

Auth commands: `auth set <token>`, `auth show`, `auth remove`, `auth test`

Token is stored in `~/.config/tokens/thumbfast-cli.txt`.

## Resources

### generation

Manage thumbnail generations. Costs 1 thumbnail credit per generation. Rate limited to 10 req/min.

| Action | Command | Key Flags |
|--------|---------|-----------|
| generate | `thumbfast-cli generation generate` | `--prompt <text>`, `--image-ids <ids>`, `--model <model>` |
| status | `thumbfast-cli generation status` | `--generation-id <id>` (required) |
| variation | `thumbfast-cli generation variation` | `--prompt-id <id>`, `--new-prompt <text>`, `--model <model>` |
| list | `thumbfast-cli generation list` | `--cursor <cursor>`, `--search <query>` |
| cancel | `thumbfast-cli generation cancel` | `--generation-id <id>` (required) |
| trigger | `thumbfast-cli generation trigger` | (none) |

### person

Manage person face references for thumbnail generation.

| Action | Command | Key Flags |
|--------|---------|-----------|
| create | `thumbfast-cli person create` | `--name <name>` (required) |
| list | `thumbfast-cli person list` | (none) |
| get | `thumbfast-cli person get` | `--person-id <id>` (required) |
| delete | `thumbfast-cli person delete` | `--person-id <id>` (required) |

### inspiration

Browse and manage thumbnail inspirations. Creating costs 0.1 thumbnails.

| Action | Command | Key Flags |
|--------|---------|-----------|
| create | `thumbfast-cli inspiration create` | (none) |
| list | `thumbfast-cli inspiration list` | `--category <cat>`, `--search <query>`, `--limit <n>`, `--cursor <cursor>` |
| get | `thumbfast-cli inspiration get` | `--inspiration-id <id>` (required) |
| delete | `thumbfast-cli inspiration delete` | `--inspiration-id <id>` (required) |

### image

Manage reference images for thumbnail generation. Uploading costs 0.05 thumbnails (includes AI description).

| Action | Command | Key Flags |
|--------|---------|-----------|
| upload | `thumbfast-cli image upload` | `--image-url <url>` (required), `--name <name>` |
| list | `thumbfast-cli image list` | (none) |
| get | `thumbfast-cli image get` | `--image-id <id>` (required) |
| search | `thumbfast-cli image search` | (none) |
| delete | `thumbfast-cli image delete` | `--image-id <id>` (required) |

### credits

View account credit balance and usage history.

| Action | Command | Key Flags |
|--------|---------|-----------|
| balance | `thumbfast-cli credits balance` | (none) |
| history | `thumbfast-cli credits history` | `--limit <n>`, `--cursor <cursor>` |

## Output Format

`--json` returns a standardized envelope:
```json
{ "ok": true, "data": { ... }, "meta": { "total": 42 } }
```

On error: `{ "ok": false, "error": { "message": "...", "status": 401 } }`

## Quick Reference

```bash
thumbfast-cli --help                    # List all resources and global flags
thumbfast-cli <resource> --help         # List all actions for a resource
thumbfast-cli <resource> <action> --help # Show flags for a specific action
```

## Global Flags

All commands support: `--json`, `--format <text|json|csv|yaml>`, `--verbose`, `--no-color`, `--no-header`

Exit codes: 0 = success, 1 = API error, 2 = usage error

## Credit Costs

| Action | Cost |
|--------|------|
| Generate thumbnail | 1 thumbnail |
| Generate variation | 1 thumbnail |
| Create inspiration | 0.1 thumbnails |
| Upload image | 0.05 thumbnails |
| Enhance prompt | 0.1 thumbnails |
