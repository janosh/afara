import type { LayoutLoad } from '@sveltejs/kit'
import '../app.css'
import { fetchYaml } from '../fetch'

export const load: LayoutLoad = async () => {
  const nav = await fetchYaml(`Nav`)
  const footer = await fetchYaml(`Footer`)
  const social = await fetchYaml(`Social`)

  return { nav, footer, social }
}

export const prerender = true
