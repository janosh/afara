<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit'
  import BasePage from '../components/BasePage.svelte'
  import MapEmbed from '../components/MapEmbed.svelte'
  import type { Page } from '../types'
  import { fetchPage } from '../utils/queries'

  export const load: Load = async () => {
    const page = await fetchPage(`kontakt`)
    return { props: { page } }
  }
</script>

<script lang="ts">
  export let page: Page
</script>

<BasePage {page}>
  <MapEmbed
    place="Matterstockstraße 17, 97080 Würzburg"
    title="Kontaktadresse"
    slot="afterBody"
  />
</BasePage>
