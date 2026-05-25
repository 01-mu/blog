---
title: "Infisical instead of .env"
date: 2026-05-25
tags: ["infisical"]
description: "To manage my secret keys."
draft: true
---

I started using Infisical to manage my secret keys.

---

## Why do I use Infisical

I saw this post and got interested in Infisical.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Rest in peace, .env. You served us well but you gotta go. Infisical fetches secrets at runtime so they never touch disk. CLI works with any language + SDKs and infra integrations. Docs below. <a href="https://t.co/klwHGUUHG3">pic.twitter.com/klwHGUUHG3</a></p>&mdash; Infisical (@infisical) <a href="https://twitter.com/infisical/status/2039080983085941039?ref_src=twsrc%5Etfw">March 31, 2026</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

In the first place, my X (known as Twitter) timeline often says ".env shouldn't be used" because AI agents read `.env` file.
I hadn't used secret managers like Infisical, so I tried it for this blog.

## How to use Infisical

Maybe, it's natural to use homebrew to install it, but I use `flake.nix`.

```nix
# flake.nix
{
  description = "sample development shell";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs = { self, nixpkgs }:
    let
      systems = [ "x86_64-linux" "aarch64-linux" "x86_64-darwin" "aarch64-darwin" ];
      forEachSystem = f: nixpkgs.lib.genAttrs systems (system: f system);
    in
    {
      devShells = forEachSystem (system:
        let
          pkgs = import nixpkgs {
            inherit system;
            config.allowUnfree = true;
          };
        in
        {
          default = pkgs.mkShell {
            packages = [
              pkgs.bun
              pkgs.infisical # <- add here
            ];
            shellHook = ''
              echo "Dev shell ready. Try: bun install"
            '';
          };
        });
    };
}
```

If you use homebrew, you can install it with `brew install infisical`.

My sample project is constructed by Bun, so I execute the following to start the development server.

```bash
# before
bun run dev
```

Then this command reads `.env` files.

Infisical doesn't need to read `.env` files.
The following command using Infisical injects secrets into the environment.
(The secrets need to be prepared by `infisical login` and `infisical init`)

```bash
# after
infisical run -- bun run dev
```

It feels simple and secure. I will keep using it.
