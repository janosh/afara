<script lang="ts" context="module">
  import { fetchPage } from '../utils/queries'

  export async function load(): Promise<LoadOutput> {
    const page = await fetchPage(`kontakt`)
    return { props: { page } }
  }
</script>

<script lang="ts">
  import type { LoadOutput } from '@sveltejs/kit'

  import BasePage from '../components/BasePage.svelte'
  import MapEmbed from '../components/MapEmbed.svelte'
  import type { Page } from '../types'

  export let page: Page
</script>

<BasePage {page}>
  <MapEmbed
    place="Matterstockstraße 17, 97080 Würzburg"
    title="Kontaktadresse"
    slot="afterBody" />
</BasePage>
