import type { PageServerLoad } from '@sveltejs/kit'
import { error } from '@sveltejs/kit'
import { fetchPosts, fetchYaml } from '../../fetch'

export const load: PageServerLoad = async () => {
  const posts = await fetchPosts()
  const social = await fetchYaml(`Social`)

  if (posts && social) return { posts, social }
  throw error(404, `Page not found`)
}
