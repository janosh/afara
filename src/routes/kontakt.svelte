<script context="module">
  import { fetchPage } from '../utils/queries'

  export async function preload() {
    const page = await fetchPage(`kontakt`)
    return { page }
  }
</script>

<script>
  import BasePage from '../components/BasePage.svelte'
  import MapEmbed from '../components/MapEmbed.svelte'

  export let page
</script>

<BasePage {page} />

<MapEmbed place="Matterstockstraße 17, 97080 Würzburg" title="Kontaktadresse" />
