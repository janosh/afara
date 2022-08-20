import { error, type PageServerLoad } from '@sveltejs/kit'
import { fetchPost } from '../../../fetch'

export const load: PageServerLoad = async ({ params }) => {
  const post = await fetchPost(params.slug)

  if (post) return { post }
  throw error(404, `Page not found`)
}
