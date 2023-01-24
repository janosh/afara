import { fetch_page, fetch_yaml } from '$lib/fetch'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = () => {
  return { page: fetch_page(`/`), yaml: fetch_yaml(`Landing Page`) }
}
