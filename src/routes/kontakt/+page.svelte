<script lang="ts">
  import { BasePage, MapEmbed } from '$lib'

  export let data
</script>

<BasePage page={data.page}>
  <MapEmbed query="Afara e.V." title="Kontaktadresse" slot="afterBody" />
</BasePage>
