import 'dotenv/config'
import replace from '@rollup/plugin-replace'

import adapter from '@sveltejs/adapter-static'
import preprocess from "svelte-preprocess"

import { indexAlgolia } from 'svelte-algolia/main.js'
import { algoliaConfig } from './src/utils/algolia.js'

const keys = [`CONTENTFUL_ACCESS_TOKEN`, `CONTENTFUL_SPACE_ID`]

const replacements = Object.fromEntries(
  keys.map((key) => [`process.env.${key}`, JSON.stringify(process.env[key])])
)

const dev = process.env.NODE_ENV === `development`
if (dev) {
  const ctfToken = process.env.CONTENTFUL_ACCESS_TOKEN
  const ctfId = process.env.CONTENTFUL_SPACE_ID

  const ctfGqlUrl = `https://graphql.contentful.com/content/v1/spaces`
  const graphiql = `${ctfGqlUrl}/${ctfId}/explore?access_token=${ctfToken}`
  // eslint-disable-next-line no-console
  console.log(`Contentful GraphiQL:`, graphiql)
} else {
  indexAlgolia(algoliaConfig)
}

export default {
  preprocess: preprocess(),

  kit: {
    adapter: adapter(),

    // hydrate the div with id 'svelte' in src/app.html
    // duplicate hydration content on project pages likely coming from this bug https://git.io/JcKv1
    // target: `#svelte`,

    vite: {
      plugins: [replace(replacements)],
    },

    // https://kit.svelte.dev/docs#configuration-trailingslash
    trailingSlash: `ignore`, // GitHub issue discussing Netlify: https://git.io/JngRL
  },
}
