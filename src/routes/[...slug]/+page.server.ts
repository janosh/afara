import { fetch_page } from '$lib/fetch'
import { error } from '@sveltejs/kit'

export const load = async ({ params }) => {
  const page = await fetch_page(params.slug)

  if (!page) throw error(404, `Die Seite '${params.slug}' existiert nicht.`)

  return { page }
}
