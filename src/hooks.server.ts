import { dev } from '$app/environment'
import { algoliaConfig } from '$lib/algolia'
import { indexAlgolia } from 'svelte-algolia/server-side'

const appId = import.meta.env.VITE_ALGOLIA_APP_ID as string
const apiKey = import.meta.env.VITE_ALGOLIA_ADMIN_KEY as string

// only update Algolia indices on production builds if required env vars are defined
if (dev === false && appId && apiKey) {
  indexAlgolia({ ...algoliaConfig, appId, apiKey })
}
