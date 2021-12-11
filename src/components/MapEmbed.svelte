<script lang="ts">
  import { session } from '$app/stores'

  export let query: string
  export let title: string

  const { GOOGLE_MAPS_API_KEY: key } = $session

  const src = `https://google.com/maps/embed/v1/place?q=${query}&key=${key}`
</script>

<iframe {title} {src} />

<style>
  iframe {
    height: 30em;
    max-height: 70vh;
    width: 100%;
    border: 0;
    border-radius: 4px;
  }
</style>
