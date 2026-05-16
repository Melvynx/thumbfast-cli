# thumbfast-cli

CLI for Thumbfa.st - AI thumbnail generation, persons, inspirations, images, and credits. Made with [api2cli.dev](https://api2cli.dev).

## Install

```bash
npx api2cli install thumbfast-cli
```

or directly from GitHub:

```bash
npx api2cli install Melvynx/thumbfast-cli
```

## Authentication

```bash
thumbfast-cli auth set "your-token"
thumbfast-cli auth test --json
```

Token file: `~/.config/tokens/thumbfast-cli.txt`.

## Usage

```bash
thumbfast-cli --help
thumbfast-cli <resource> --help
thumbfast-cli <resource> <action> --help
```

Always use `--json` in agent/script workflows.

## Resources

Run:

```bash
thumbfast-cli --help
```

to see the currently supported resources and commands.

## Development

```bash
bun install
npx api2cli bundle thumbfast
npx api2cli link thumbfast
thumbfast-cli --help
```
