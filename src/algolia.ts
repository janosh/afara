import { fetch_pages, fetch_posts } from './fetch'

const bodyToPlainText =
  (fetchFunction: typeof fetch_pages | typeof fetch_posts) => async () => {
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
    { name: `Seiten`, getData: bodyToPlainText(fetch_pages) },
    { name: `Posts`, getData: bodyToPlainText(fetch_posts) },
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
