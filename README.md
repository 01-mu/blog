# Masato's Notes

A calm, long-form English personal blog for Masato. The site is intentionally
minimal so the writing stays quiet and readable.

## Public Repository Security Policy
- Never commit secrets, API keys, tokens, or credentials.
- Never commit `.env` files or environment-specific variants.
- Configure any required environment variables only in the Cloudflare Pages GUI.
- If something might be sensitive, document it conceptually instead.

## Local Development
```bash
nix --extra-experimental-features 'nix-command flakes' develop
bun install
bun run dev
```
Optional (direnv):
```bash
direnv allow
```

## Writing Workflow
- Posts live in `src/content/posts` as Markdown.
- Frontmatter fields: `title`, `date`, `tags`, `description` (optional), `draft`.
- Drafts (`draft: true`) are excluded from production builds.

## Checks
```bash
bun astro check
```

## Deployment
- Cloudflare Pages is managed by Terraform under `infra/cloudflare`.
- Build command: `bun install --frozen-lockfile && bun run build`
- Output directory: `dist`
- Production branch: `main`
- Bun version: match `package.json`.

## Domain Notes
- Domain: `01-mu.dev`
- Registrar: Cloudflare Registrar
- DNS hosting: Cloudflare
- Bind the custom domain in the Cloudflare Pages GUI.
