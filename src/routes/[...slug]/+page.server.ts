import { error } from '@sveltejs/kit'
import { fetch_page } from '../../fetch'
import type { PageLoad } from './$types'

export const load: PageLoad = async ({ params }) => {
  const page = await fetch_page(params.slug)
  if (!page) throw error(404, `Page not found`)
  return { page }
}
