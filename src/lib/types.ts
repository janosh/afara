export type Link = {
  title: string
  url: string
}

export type NavEntry = Link & {
  span?: number
  subNav?: NavEntry[]
}

export type Page = {
  title: string
  slug: string
  cover: Image
  body: string
  plainBody: string // for creating excerpts and search previews
  date?: string
  yaml?: Yaml
  sys: { publishedAt: string }
}

export type Author = {
  name: string
  bio: string
  url: string
  email: string
  photo: Image
  fieldOfStudy: string
}

export const blogTags = [
  `Alle`,
  `Erfahrungsberichte`,
  `Events`,
  `Kooperationen`,
  `Spendenaktionen`,
  `Treffen`,
  `Vorstand`,
] as const

export type BlogTag = (typeof blogTags)[number]

export type Post = Page & {
  author: Author
  date: string
  tags: BlogTag[]
  plainBody: string
}

export type Image = {
  src: string
  alt: string
  width: number
  height: number
  base64: string
  title: string
}

export type Yaml = {
  [key: string]: unknown
}

export const SocialNetworks = [
  `Email`,
  `Facebook`,
  `Instagram`,
  `YouTube`,
] as const

export type SocialNetwork = (typeof SocialNetworks)[number]
