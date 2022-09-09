<script lang="ts">
  import Search from 'svelte-algolia'
  import Nav from './Nav.svelte'
  import SearchHit from './SearchHit.svelte'
  import type { NavEntry } from './types'

  export let nav: NavEntry[]
  export let breakpoint = 800

  let scrollY: number
  let innerWidth: number
  $: mobile = innerWidth < breakpoint

  const searchProps = {
    indices: { Seiten: SearchHit, Posts: SearchHit },
    appId: import.meta.env.VITE_ALGOLIA_APP_ID,
    searchKey: import.meta.env.VITE_ALGOLIA_SEARCH_KEY,
    loadingStr: `Suche läuft...`,
    noResultMsg: (query: string) => `Keine Ergebnisse für '${query}'`,
    resultCounter: (hits: unknown[]) =>
      hits.length > 0 ? `<span>Ergebnisse: ${hits.length}<span>` : ``,
    placeholder: `Suche`,
    ariaLabel: `Suche`,
  }
</script>

<svelte:window bind:scrollY bind:innerWidth />

<header class:opaque={scrollY > 300} class={mobile ? `mobile` : `desktop`}>
  <Nav links={nav} opaque={scrollY > 300} {mobile} />
  <Search {...searchProps} --inputColor="white" --iconColor="white" />
</header>

<style>
  header {
    place-content: center;
    place-items: center;
    gap: 2vw;
    white-space: nowrap;
    display: grid;
    position: fixed;
    top: 0;
    font-weight: 300;
    background: rgba(0, 0, 0, 0.6);
    box-shadow: 0 0 1ex black;
    z-index: 2;
    width: 100%;
    box-sizing: border-box;
    transition: background-color 0.2s;
  }
  header.opaque {
    background: var(--headerBg);
  }
  header.mobile {
    font-size: 1.4em;
    gap: 5vw;
    grid-template-columns: auto 1fr auto auto;
    grid-template-areas: 'nav logo search'; /* switch order of nav and logo*/
    padding: 3pt 2ex;
  }
  header.desktop {
    padding: 3pt 1ex;
    font-size: 1.2em;
    display: flex;
  }
</style>
