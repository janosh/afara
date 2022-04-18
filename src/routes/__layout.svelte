<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit'
  import '../app.css'
  import Footer from '../components/Footer.svelte'
  import Header from '../components/Header.svelte'
  import { fetchYaml } from '../fetch'
  import type { NavEntry } from '../types'

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
