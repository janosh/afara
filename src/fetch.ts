import yaml from 'js-yaml'
import marked from './marked'
import type { Page, Post } from './types'

export async function contentfulFetch(query: string) {
  const token = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN
  const id = import.meta.env.VITE_CONTENTFUL_SPACE_ID

  if (!token || !id)
    throw `Missing Contentful access token and/or space ID. Please add to .env`

  const ctfGqlUrl = `https://graphql.contentful.com/content/v1/spaces`
  const ctfGraphqlEndPoint = `${ctfGqlUrl}/${id}?access_token=${token}`

  const response = await fetch(ctfGraphqlEndPoint, {
    method: `POST`,
    headers: { 'Content-Type': `application/json` },
    body: JSON.stringify({ query }),
  })

  const { data, error } = await response.json()

  if (error) throw error
  return data
}

export async function base64Thumbnail(
  url: string,
  options: { type?: string; w?: number; h?: number } = {}
): Promise<string> {
  const { type = `jpg`, w = 10, h = 10 } = options

  const response = await fetch(`${url}?w=${w}&h=${h}&q=80`)

  if (typeof window === `undefined`) {
    // server side (node) https://stackoverflow.com/a/52467372
    const buffer = Buffer.from(await response.arrayBuffer())
    return `data:image/${type};base64,` + buffer.toString(`base64`)
  } else {
    // client side (browser) https://stackoverflow.com/a/20285053
    const blob = await response.blob()
    return await new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(blob)
    })
  }
}

function renderBody(itm: Page | Post) {
  if (!itm?.body) return itm

  itm.body = marked(itm.body) // generate HTML
  itm.plainBody = itm.body.replace(/<[^>]*>/g, ``) // strip HTML tags to get plain text

  return itm
}

const coverFragment = `
  cover {
    src: url
    alt: description
    title
    width
    height
  }
`

const pageFragment = `
  items {
    title
    slug
    body
    ${coverFragment}
    sys {
      publishedAt
    }
  }
`

const pageQuery = (slug: string) => `{
  pages: pageCollection(where: {slug_in: ["${slug}", "/${slug}"]}) {
    ${pageFragment}
  }
}`

const pagesQuery = `{
  pages: pageCollection {
    ${pageFragment}
  }
}`

export async function fetchPage(slug: string): Promise<Page> {
  if (!slug) throw `fetchPage requires a slug, got '${slug}'`
  const data = await contentfulFetch(pageQuery(slug))
  const page = data?.pages?.items[0]
  if (page?.cover?.src)
    page.cover.base64 = await base64Thumbnail(page?.cover?.src)
  return renderBody(page)
}

export async function fetchPages(): Promise<Page[]> {
  const data = await contentfulFetch(pagesQuery)
  return data?.pages?.items?.map(renderBody)
}

const postFragment = `
  items {
    title
    slug
    date
    body
    ${coverFragment}
    tags
    author {
      name
      email
      bio
      photo {
        src: url
        width
        height
      }
    }
  }
`

const postQuery = (slug: string) => `{
  posts: postCollection(order: date_DESC, where: {slug_in: ["${slug}", "/${slug}"]}) {
    ${postFragment}
  }
}`

const postsQuery = `{
  posts: postCollection(order: date_DESC) {
    ${postFragment}
  }
}`

async function processPost(post: Post) {
  renderBody(post)

  post.slug = `/blog/${post.slug}`

  post.cover.base64 = await base64Thumbnail(post.cover.src)
  return post
}

export async function fetchPost(slug: string): Promise<Post | null> {
  if (!slug) throw `fetchPost requires a slug, got '${slug}'`

  const data = await contentfulFetch(postQuery(slug))
  const post = data?.posts?.items[0]

  if (!post) return null

  return await processPost(post)
}

export async function fetchPosts(): Promise<Post[]> {
  const data = await contentfulFetch(postsQuery)
  const posts = data?.posts?.items
  return await Promise.all(posts.map(processPost))
}

export async function fetchYaml(title: string) {
  if (!title) throw `fetchYaml requires a title, got '${title}'`
  const { yml } = await contentfulFetch(`{
    yml: yamlCollection(where: {title: "${title}"}) {
      items {
        data
      }
    }
  }`)
  return yaml.load(yml?.items[0]?.data)
}
