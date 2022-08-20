import type { PageLoad } from '@sveltejs/kit'
import { fetchPage, fetchYaml } from '../fetch'

export const load: PageLoad = async () => {
  const page = await fetchPage(`/`)

  const yaml = await fetchYaml(`Landing Page`)

  return { page, yaml }
}
