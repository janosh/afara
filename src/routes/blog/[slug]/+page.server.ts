import { fetch_post } from '$lib/fetch'

export const load = ({ params }) => {
  return { post: fetch_post(params.slug) }
}
