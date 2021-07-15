<script lang="ts" context="module">
  import { fetchYaml } from '../utils/queries'

  export async function load(): Promise<LoadOutput> {
    const nav = await fetchYaml(`Nav`)
    const footer = await fetchYaml(`Footer`)
    const social = await fetchYaml(`Social`)

    return { props: { nav, footer, social } }
  }
</script>

<script lang="ts">
  import type { LoadOutput } from '@sveltejs/kit'
  import type { NavEntry, Link } from '../types'

  import Header from '../components/Header.svelte'
  import Footer from '../components/Footer.svelte'
  import GoogleAnalytics from '../components/GoogleAnalytics.svelte'

  export let nav: NavEntry[]
  export let footer: { links: Link[] }
  export let social: Record<string, string>
</script>

<GoogleAnalytics />
<Header {nav} />
<main>
  <slot />
</main>
<Footer links={footer.links} {social} />
