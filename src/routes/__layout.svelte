<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit'
  import Footer from '../components/Footer.svelte'
  import Header from '../components/Header.svelte'
  import type { NavEntry } from '../types'
  import { fetchYaml } from '../utils/queries'

  export const load: Load = async () => {
    const nav = await fetchYaml(`Nav`)
    const footer = await fetchYaml(`Footer`)
    const social = await fetchYaml(`Social`)

    return { props: { nav, footer, social } }
  }
</script>

<script lang="ts">
  export let nav: NavEntry[]
  export let footer: { links: Record<string, string> }
  export let social: Record<string, string>
</script>

<Header {nav} />
<main>
  <slot />
</main>
<Footer links={footer.links} {social} />
