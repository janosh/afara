require(`dotenv`).config()
const replace = require(`@rollup/plugin-replace`)
const netlify = require(`@sveltejs/adapter-netlify`)

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
}

/** @type {import('@sveltejs/kit').Config} */
module.exports = {
  kit: {
    adapter: netlify(),

    // hydrate the <body> element in src/app.html
    target: `#svelte`,

    vite: {
      plugins: [replace(replacements)],
    },
  },
}
