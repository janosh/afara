import { error as kit_error } from '@sveltejs/kit'
import yaml from 'js-yaml'
import marked from './marked'
import type { Page, Post } from './types'

export async function contentful_fetch(query: string) {
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
  if (!data) throw kit_error(404, `No data found`)

  return data
}

export async function base64_thumbnail(
  url: string,
  options: { type?: string; w?: number; h?: number } = {},
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

function render_body(itm: Page | Post) {
  if (!itm?.body) return itm

  itm.body = marked(itm.body) // generate HTML
  itm.plainBody = itm.body.replace(/<[^>]*>/g, ``) // strip HTML tags to get plain text

  return itm
}

const cover_fragment = `
  cover {
    src: url
    alt: description
    title
    width
    height
  }
`

const page_fragment = `
  items {
    title
    slug
    body
    ${cover_fragment}
    sys {
      publishedAt
    }
  }
`

const page_query = (slug: string) => `{
  pages: pageCollection(where: {slug_in: ["${slug}", "/${slug}"]}) {
    ${page_fragment}
  }
}`

const pages_query = `{
  pages: pageCollection {
    ${page_fragment}
  }
}`

export async function fetch_page(slug: string): Promise<Page> {
  if (!slug) throw `fetchPage requires a slug, got '${slug}'`
  const data = await contentful_fetch(page_query(slug))
  const page = data?.pages?.items[0]
  if (page?.cover?.src)
    page.cover.base64 = await base64_thumbnail(page?.cover?.src)
  return render_body(page)
}

export async function fetch_pages(): Promise<Page[]> {
  const data = await contentful_fetch(pages_query)
  return data?.pages?.items?.map(render_body)
}

const post_fragment = `
  items {
    title
    slug
    date
    body
    ${cover_fragment}
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

const post_query = (slug: string) => `{
  posts: postCollection(order: date_DESC, where: {slug_in: ["${slug}", "/${slug}"]}) {
    ${post_fragment}
  }
}`

const posts_query = `{
  posts: postCollection(order: date_DESC) {
    ${post_fragment}
  }
}`

async function process_post(post: Post) {
  render_body(post)

  post.slug = `/blog/${post.slug}`

  post.cover.base64 = await base64_thumbnail(post.cover.src)
  return post
}

export async function fetch_post(slug: string): Promise<Post | null> {
  if (!slug) throw `fetchPost requires a slug, got '${slug}'`

  const data = await contentful_fetch(post_query(slug))
  const post = data?.posts?.items[0]

  if (!post) return null

  return await process_post(post)
}

export async function fetch_posts(): Promise<Post[]> {
  const data = await contentful_fetch(posts_query)
  const posts = data?.posts?.items
  return await Promise.all(posts.map(process_post))
}

export async function fetch_yaml(title: string) {
  if (!title) throw `fetchYaml requires a title, got '${title}'`
  const { yml } = await contentful_fetch(`{
    yml: yamlCollection(where: {title: "${title}"}) {
      items {
        data
      }
    }
  }`)
  return yaml.load(yml?.items[0]?.data)
}
