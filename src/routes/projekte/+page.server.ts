import { fetch_yaml } from '$lib/fetch'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = () => {
  return { projects: fetch_yaml(`Projects`) }
}
