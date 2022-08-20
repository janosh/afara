import type { PageLoad } from '@sveltejs/kit'
import { fetchYaml } from '../../fetch'

export const load: PageLoad = async () => {
  const projects = await fetchYaml(`Projects`)

  return { projects }
}
