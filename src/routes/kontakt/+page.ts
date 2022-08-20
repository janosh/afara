import type { PageLoad } from '@sveltejs/kit'
import { fetchPage } from '../../fetch'

export const load: PageLoad = async () => {
  const page = await fetchPage(`kontakt`)

  return { page }
}
