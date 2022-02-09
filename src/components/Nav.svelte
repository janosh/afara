<script lang="ts">
  import { page } from '$app/stores'
  import ChevronExpand from '@svicons/bootstrap/chevron-expand.svelte'
  import Menu from '@svicons/heroicons-solid/menu.svelte'
  import { slide } from 'svelte/transition'
  import type { NavEntry } from '../types'
  import { onClickOutside } from '../actions'

  export let nav: NavEntry[]
  export let opaque = false

  let isOpen = false
  let activeSubNav = -1
  let hovered = -1
  let viewWidth: number

  const close = () => {
    isOpen = false
    hovered = -1
  }

  const setActiveSubNav = (idx: number) => () => {
    if (activeSubNav !== idx) activeSubNav = idx
    else activeSubNav = -1
  }

  // isCurrent needs to be reactive to respond to changes in $page.url.pathname
  $: isCurrent = (url: string) => {
    if (url === $page.url.pathname) return `page`
    if (url !== `/` && $page.url.pathname.includes(url)) return `page`
    return undefined
  }
</script>

<svelte:window bind:innerWidth={viewWidth} />

<button
  on:click|preventDefault={() => (isOpen = true)}
  aria-label="Navigationsmenü öffnen"
>
  <Menu height="2.9ex" style="vertical-align: middle;" />
</button>

<a
  on:click={close}
  class="logo"
  class:opaque
  href="/"
  sveltekit:prefetch
  aria-current={isCurrent(`/`)}
>
  <img src="/favicon.svg" alt="Logo" height="50" width="50" />
</a>

<nav class:isOpen class:opaque use:onClickOutside={close}>
  <ul>
    {#each nav as { title, url, subNav }, idx}
      <li
        on:mouseenter={() => (hovered = idx)}
        on:mouseleave={() => (hovered = -1)}
        class:hover={hovered === idx}
      >
        <a on:click={close} sveltekit:prefetch aria-current={isCurrent(url)} href={url}>
          {title}</a
        >
        {#if subNav}
          <button on:click={setActiveSubNav(idx)} aria-label="Untermenü {title} öffnen">
            <ChevronExpand
              height="1em"
              style="vertical-align: middle; color: var(--green);"
            />
          </button>
        {/if}
        {#if subNav && (activeSubNav === idx || viewWidth > 800)}
          <ul
            transition:slide
            style="grid-template-columns: repeat({Math.ceil(subNav.length / 13)}, 1fr);"
          >
            {#each subNav as { title, url, span }}
              <li class:span>
                <a
                  on:click={close}
                  sveltekit:prefetch
                  aria-current={isCurrent(url)}
                  href={url}>{title}</a
                >
              </li>
            {/each}
          </ul>
        {/if}
      </li>
    {/each}
  </ul>
</nav>

<style>
  button {
    grid-area: nav;
    padding: 0;
  }
  a,
  button {
    color: var(--headerColor);
    border-radius: 50%;
    transition: background-color 0.4s;
  }
  button:hover {
    background: var(--gray);
  }
  a:hover {
    color: var(--hoverColor);
  }
  a[aria-current] {
    color: var(--orange);
  }
  a.logo {
    grid-area: logo;
    border-radius: 50%;
    padding: 2pt;
    display: flex;
  }
  ul {
    list-style: none;
  }
  li::marker {
    color: var(--headerColor);
  }
  nav > ul > li > ul {
    padding-left: 2ex;
  }
  nav {
    overflow: auto;
  }
  @media (max-width: 800px) {
    /* mobile styles */
    nav {
      position: fixed;
      top: 1em;
      left: 1em;
      padding: 1em;
      max-height: calc(100vh - 2em);
      background: var(--headerBg);
      transform: translate(-120%);
      box-sizing: border-box;
      overscroll-behavior: none;
      transition: transform 0.4s, box-shadow 0.4s;
    }
    nav.isOpen {
      box-shadow: 0 0 1em black;
      transform: translate(0);
    }
    nav > ul {
      display: grid;
      grid-gap: 1ex;
      padding: 0;
      margin: 0;
    }
    nav > ul > li > ul {
      margin-top: 1ex;
      list-style: disc;
    }
    a.logo {
      /* needed for centering logo since menu button takes less space than colormode + search */
      margin-left: 4vw;
    }
  }
  @media (min-width: 801px) {
    /* desktop styles */
    nav,
    nav > ul {
      display: contents;
    }
    nav > ul > li {
      position: relative;
      /* extend hover area to reach subnavs */
      padding-bottom: 1ex;
      margin-bottom: -1ex;
    }
    nav > ul > li > ul {
      position: absolute;
      background: rgba(0, 0, 0, 0.6);
      padding: 1ex 1em;
      border-radius: 1ex;
      box-shadow: 0 0 1em -1ex black;
      top: 3.5ex;
      visibility: hidden;
      opacity: 0;
      display: grid;
      gap: 5pt 1em;
      width: max-content;
      max-height: 80vh;
      overflow-y: auto;
      overscroll-behavior: none;
      transition: background-color 0.3s;
    }
    nav.opaque > ul > li > ul {
      background: var(--headerBg);
    }
    .logo.opaque {
      background: rgba(255, 255, 255, 0.9);
      border-radius: 50%;
      padding: 1px;
    }
    nav > ul > li > ul > li.span {
      grid-column: 1/-1;
      border-top: 1px solid var(--headerColor);
      padding-top: 6pt;
      margin-top: 6pt;
    }
    nav > ul > li.hover > ul {
      visibility: visible;
      opacity: 1;
    }
    button:first-child {
      display: none;
    }
  }
</style>
