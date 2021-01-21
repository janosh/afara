import { fetchPages, fetchPosts } from './queries'

const bodyToPlainText = (fetchFunction) => async () => {
  const items = await fetchFunction()
  items.forEach((itm) => {
    if (!itm.id) itm.id = itm?.slug || itm?.title
    if (itm.body && itm.plainBody) {
      itm.body = itm.plainBody
      delete itm.plainBody
    }
  })
  return items
}

export const algoliaConfig = {
  appId: process.env.ALGOLIA_APP_ID,
  apiKey: process.env.ALGOLIA_ADMIN_KEY,
  indices: [
    { name: `Seiten`, getData: bodyToPlainText(fetchPages) },
    { name: `Posts`, getData: bodyToPlainText(fetchPosts) },
  ],
  settings: {
    attributesToSnippet: [`body:20`],
    attributesToHighlight: [
      `title`,
      `date`,
      `body`,
      `cover.description`,
      `author.name`,
      `author.email`,
    ],
  },
}
