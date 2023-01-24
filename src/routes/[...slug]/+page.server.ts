import { fetch_page } from '$lib/fetch'
import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ params }) => {
  const page = await fetch_page(params.slug)

  if (!page) throw error(404, `Die Seite '${params.slug}' existiert nicht.`)

  return { page }
}
