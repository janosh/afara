import { fetch_yaml } from '../../fetch'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = () => {
  return { projects: fetch_yaml(`Projects`) }
}
