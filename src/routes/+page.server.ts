import { fetch_page, fetch_yaml } from '$lib/fetch'

export const load = () => {
  return { page: fetch_page(`/`), yaml: fetch_yaml(`Landing Page`) }
}
