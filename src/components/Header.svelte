<script>
  import Nav from './Nav.svelte'
  import ColorMode from './ColorMode.svelte'
  import Search from './Search.svelte'

  export let nav

  let scrollY
</script>

<svelte:window bind:scrollY />

<header class:opaque={scrollY > 300}>
  <Nav {nav} opaque={scrollY > 300} />
  <ColorMode />
  <Search indices={[`Seiten`, `Posts`]} />
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
    transition: 0.2s;
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
