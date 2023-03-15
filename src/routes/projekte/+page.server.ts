import { fetch_yaml } from '$lib/fetch'

export const load = () => {
  return { projects: fetch_yaml(`Projects`) }
}
