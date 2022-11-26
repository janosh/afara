<p align="center">
  <a href="https://afara.foundation"><img src="static/favicon.svg" alt="Favicon" width=150></a>
</p>

<h1 align="center">
  <a href="https://afara.foundation">Afara e.V.</a>
</h1>

<h3 align="center">

[![Deployment](https://github.com/janosh/afara/actions/workflows/gh-pages.yml/badge.svg)](https://github.com/janosh/afara/actions/workflows/gh-pages.yml)
[![Lighthouse](https://github.com/janosh/afara/actions/workflows/lighthouse.yml/badge.svg)](https://github.com/janosh/afara/actions/workflows/lighthouse.yml)
[![pre-commit.ci status](https://results.pre-commit.ci/badge/github/janosh/afara/main.svg)](https://results.pre-commit.ci/latest/github/janosh/afara/main)
![GitHub repo size](https://img.shields.io/github/repo-size/janosh/afara?label=Repo+Size)

</h3>

Afara is a non-profit organization from Würzburg, Germany aiming to support educational and youth welfare projects in Africa.

This site is built with [Svelte](https://github.com/sveltejs/svelte) and [Contentful](https://contentful.com).

## Setup

Running this site locally requires [`git`](https://git-scm.com) and [`pnpm`](https://pnpm.io) (or [`npm`](https://npmjs.com)). With those installed, do:

1. Clone the repo and change into its directory.

   ```sh
   git clone https://github.com/janosh/afara && cd afara
   ```

2. (optional) Setup [`pre-commit` hooks](https://pre-commit.com).

   ```sh
   pre-commit install
   ```

3. Install dependencies.

   ```sh
   pnpm
   ```

4. Copy `.env.example` to `.env`.

   ```sh
   cp .env.example .env
   ```

   Then open `.env` and insert your [Contentful space ID and access token](https://contentful.com/developers/docs/references/authentication). These are found in the settings menu of a Contentful space under 'API keys'.

5. Start the dev server.

   ```sh
   pnpm dev
   ```

## Deployment

This site is deployed as static HTML to [GitHub Pages](https://github.com/janosh/afara/deployments/activity_log) ([by this action](.github/workflows/gh-pages.yml)).
