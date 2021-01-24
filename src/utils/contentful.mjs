import 'dotenv/config.js'
import fs from 'fs'
import yaml from 'js-yaml'
import contentful from 'contentful-management'

// to use any of the functions in this file, generate a Content Management Token (CMT) at
// https://app.contentful.com/spaces/gi9muc70s4ub/api/cma_tokens and add it to your .env
// file along with the space's ID.

// Contentful entries returned by env.getEntries() are objects with update/publish/archive/etc. methods
// as well as a fields and a sys key. Only the attributes in fields can be changed and then e.g.
// published(). The data in entry.sys can be consumed but is non-user editable. The API will throw
// if you modify sys and then try to publish()/update() an entry.

const getSpace = async () =>
  await contentful
    .createClient({
      accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
    })
    .getSpace(process.env.CONTENTFUL_SPACE_ID)

export async function searchStringInContentType(
  searchTerm = process.argv[2],
  contentType = process.argv[3] || `page`
) {
  const space = await getSpace()

  const env = await space.getEnvironment(`master`)
  let { items } = await env.getEntries({ content_type: contentType })
  items = items.filter((item) => item?.fields?.body?.de?.includes(searchTerm))
  items = items.map((item) => item.fields.title.de)
  // eslint-disable-next-line no-console
  console.log(`items of type ${contentType} containing ${searchTerm}:`, items)
}

export async function convertBlogTagsFromRefsToList() {
  const space = await getSpace()

  const env = await space.getEnvironment(`master`)
  let { items } = await env.getEntries({ content_type: `post` })
  let { items: tags } = await env.getEntries({ content_type: `tag` })
  items.forEach((post) => {
    // console.log(`post.fields.tags:`, post.fields.tags.de.sys.id)
    const tagIds = post.fields.tags.de.map((tag) => tag.sys.id)
    const newTags = tags
      .filter((tag) => {
        return tagIds.includes(tag.sys.id)
      })
      .map((tag) => tag.fields.title.de)
      .filter((tag) => tag !== `Alle`)

    post.fields.tags2 = {}
    post.fields.tags2.de = newTags
    post.update()
    // post.publish()
  })
}

export async function copyEntries() {
  // Microcopy to Yaml
  const space = await getSpace()

  const env = await space.getEnvironment(`master`)
  let { items } = await env.getEntries({ content_type: `microcopy` })
  items.forEach(async (itm) => {
    const entry = await env.createEntry(`yaml`, itm)
    await entry.publish()
  })
}

export async function createFAQEntries() {
  const faqs = yaml.load(fs.readFileSync(`./faq.yml`))

  const space = await getSpace()

  const env = await space.getEnvironment(`master`)

  faqs.forEach(async ({ title, body, tags }) => {
    await env.createEntry(`faq`, {
      fields: {
        title: { de: title },
        tags: { de: tags },
        body: { de: body },
      },
    })
  })
}

// run with: node src/utils/contentful.js
convertBlogTagsFromRefsToList()
