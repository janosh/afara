import { fetch_yaml } from '$lib/fetch'
import type { LayoutLoad } from './$types'

export const load: LayoutLoad = async () => {
  const nav = await fetch_yaml(`Nav`)
  const footer = await fetch_yaml(`Footer`)
  const social = await fetch_yaml(`Social`)

  return { nav, footer, social }
}

export const prerender = true
