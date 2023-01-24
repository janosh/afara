<script lang="ts">
  import { BasePage, MapEmbed } from '$lib'
  import type { PageData } from './$types'

  export let data: PageData
</script>

<BasePage page={data.page}>
  <MapEmbed query="Afara e.V." title="Kontaktadresse" slot="afterBody" />
</BasePage>
