<script lang="ts">
  import { page } from '$app/stores'
  import { name } from '../../package.json'
</script>

<svelte:head>
  <title>Fehler {$page.status} &bull; {name}</title>
</svelte:head>

<div>
  <h1>Fehler {$page.status}: {$page.error?.message}</h1>
  {#if $page.status >= 500}
    <p>
      When neu laden nicht hilft, schreib uns bitte eine E-Mail mit dem Fehlercode und
      evtl. relevanten Informationen an
      <a href="mailto:it@{name}" target="_blank" rel="noreferrer">it@{name}</a>. Danke! 🙏
    </p>
  {/if}

  <p>Back to <a href=".">landing page</a>.</p>
</div>

<style>
  div {
    font-size: 1.2em;
    max-width: 45em;
    padding: 5em 3em 1em;
    margin: auto;
    text-align: center;
  }
  p {
    text-align: center;
    max-width: 35em;
    margin: auto;
  }
</style>
