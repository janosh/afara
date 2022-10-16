import { fetch_page } from '../../fetch'
import type { PageLoad } from './$types'

export const load: PageLoad = () => {
  return { page: fetch_page(`kontakt`) }
}
