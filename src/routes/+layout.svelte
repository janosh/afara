<script lang="ts">
  import Footer from '$lib/Footer.svelte'
  import Header from '$lib/Header.svelte'
  import '../app.css'
  import type { LayoutData } from './$types'
  export let data: LayoutData
  $: ({ nav, footer, social } = data)
</script>

<Header {nav} />
<main>
  <slot />
</main>
<Footer links={footer.links} {social} />
