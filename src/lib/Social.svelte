<script lang="ts">
  import Icon from '@iconify/svelte'
  import type { SocialNetwork } from './types'
  import { SocialNetworks } from './types'

  export let social: Record<SocialNetwork, string>
  export let style = ``
  export let vertical = false
  export let fixed = false

  const icon_map: Record<SocialNetwork, string> = {
    Facebook: `fa-brands:facebook`,
    Instagram: `fa-brands:instagram`,
    YouTube: `fa-brands:youtube`,
    Email: `ic:round-email`,
  }
</script>

<div {style} class:vertical class:fixed>
  {#each SocialNetworks as key}
    <a href={social[key]} aria-label={key}>
      <Icon icon={icon_map[key]} height="3ex" />
    </a>
  {/each}
</div>

<style>
  div {
    display: flex;
    flex-wrap: wrap;
    gap: 1em;
    place-items: center;
    line-height: 0;
  }
  div.vertical {
    flex-direction: column;
  }
  div.fixed {
    position: fixed;
    z-index: 1;
    padding: 1ex;
  }
  div.fixed.vertical {
    right: 0;
    border-radius: 1ex 0 0 1ex;
    top: 50%;
    transform: translateY(-50%);
  }
  @media (max-width: 1150px) {
    div.fixed {
      display: none;
    }
  }
  a {
    transition: transform 0.2s;
  }
  a:hover {
    transform: scale(1.04);
  }
</style>
