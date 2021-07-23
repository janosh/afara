<script lang="ts">
  import Search from 'svelte-algolia/Search.svelte'

  import { session } from '$app/stores'

  import type { NavEntry } from '../types'
  import Nav from './Nav.svelte'
  import ModalColorPicker from 'svelte-color-mode/ModalColorPicker.svelte'
  import ColorMode from 'svelte-color-mode/ColorMode.svelte'
  import SearchHit from './SearchHit.svelte'

  import { colors, colorsByMode } from '../utils/colors'

  export let nav: NavEntry[]

  let scrollY: number

  const searchProps = {
    indices: { Seiten: SearchHit, Posts: SearchHit },
    appId: $session.ALGOLIA_APP_ID,
    searchKey: $session.ALGOLIA_SEARCH_KEY,
    loadingStr: `Suche läuft...`,
    noResultMsg: (query: string) => `Keine Ergebnisse für '${query}'`,
    resultReporter: (hits: unknown[]) =>
      hits.length > 0 ? `<span>Ergebnisse: ${hits.length}<span>` : ``,
    placeholder: `Suche`,
    ariaLabel: `Suche`,
  }
</script>

<svelte:window bind:scrollY />

<header class:opaque={scrollY > 300}>
  <Nav {nav} opaque={scrollY > 300} />
  <ColorMode {colorsByMode} otherColors={colors} />
  <ModalColorPicker />
  <Search
    {...searchProps}
    --hitsBgColor="var(--bodyBg)"
    --inputColor="white"
    --iconColor="white" />
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
  @media (max-width: 1000px) {
    header {
      font-size: 1.4em;
      gap: 5vw;
      grid-template-columns: auto 1fr auto auto;
      grid-template-areas: 'nav logo colormode search'; /* switch order of nav and logo*/
      padding: 3pt 2ex;
    }
  }
  @media (min-width: 1001px) {
    header {
      padding: 3pt 1ex;
      font-size: 1.2em;
      display: flex;
    }
  }
</style>
