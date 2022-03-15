import { fetchPages, fetchPosts } from './fetch'

const bodyToPlainText =
  (fetchFunction: typeof fetchPages | typeof fetchPosts) => async () => {
    const items = await fetchFunction()
    items.forEach((itm) => {
      if (!itm.id) itm.id = itm?.slug || itm?.title

      if (itm.body && itm.plainBody) {
        itm.body = itm.plainBody.slice(0, 2000)
        delete itm.plainBody
        delete itm.cover.base64
      }
    })
    return items
  }

export const algoliaConfig = {
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
