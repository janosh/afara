<script lang="ts">
  import BasePage from '$lib/BasePage.svelte'
  import MapEmbed from '$lib/MapEmbed.svelte'
  import type { PageData } from './$types'

  export let data: PageData
</script>

<BasePage page={data.page}>
  <MapEmbed query="Afara e.V." title="Kontaktadresse" slot="afterBody" />
</BasePage>
