import { fetch_page, fetch_yaml } from '../fetch'
import type { PageLoad } from './$types'

export const load: PageLoad = () => {
  return { page: fetch_page(`/`), yaml: fetch_yaml(`Landing Page`) }
}
