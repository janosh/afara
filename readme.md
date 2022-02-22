<p align="center">
  <a href="https://afara.foundation"><img src="static/favicon.svg" alt="Favicon" width=150></a>
</p>

<h1 align="center">
  <a href="https://afara.foundation">Afara e.V.</a>
</h1>

<h3 align="center">

[![Netlify Status](https://api.netlify.com/api/v1/badges/209f70e1-0a07-4d82-b642-55c77f2af40f/deploy-status)](https://app.netlify.com/sites/afara/deploys)
[![Lighthouse](https://github.com/janosh/afara/actions/workflows/lighthouse.yml/badge.svg)](https://github.com/janosh/afara/actions/workflows/lighthouse.yml)
[![pre-commit.ci status](https://results.pre-commit.ci/badge/github/janosh/afara/main.svg)](https://results.pre-commit.ci/latest/github/janosh/afara/main)
![GitHub repo size](https://img.shields.io/github/repo-size/janosh/afara?label=Repo+Size)

</h3>

Afara is a non-profit organization from Würzburg, Germany aiming to support educational and youth welfare projects in Africa.

This site is built with [Svelte](https://github.com/sveltejs/svelte) and [Contentful](https://contentful.com).

## Setup

Running this site locally requires [`git`](https://git-scm.com) and [`yarn`](https://yarnpkg.com) (or [`npm`](https://npmjs.com)). With those installed, do:

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
   yarn
   ```

4. Copy `.env.example` to `.env`.

   ```sh
   cp .env.example .env
   ```

   Then open `.env` and insert your [Contentful space ID and access token](https://contentful.com/developers/docs/references/authentication). These are found in the settings menu of a Contentful space under 'API keys'.

5. Start the dev server.

   ```sh
   yarn dev
   ```

## Deploy

To publish this site to netlify:

1. Create an account with [netlify](https://netlify.com).
2. Install the [`netlify-cli`](https://netlify.com/docs/cli).
3. Login to your account.

   ```sh
   netlify login
   ```

4. Connect your GitHub repo with your netlify account for [continuous deployment](https://netlify.com/docs/cli/#continuous-deployment).

   ```sh
   netlify init
   ```

5. Create a production build.

   ```sh
   yarn build
   ```

6. Finally deploy the site with

   ```sh
   netlify deploy
   ```
