import { fetch_yaml } from '../../fetch'
import type { PageLoad } from './$types'

export const load: PageLoad = () => {
  return { projects: fetch_yaml(`Projects`) }
}
