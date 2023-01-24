<script lang="ts">
  import Icon from '@iconify/svelte'
  import { Social } from '.'
  import type { SocialNetwork } from './types'

  export let social: Record<SocialNetwork, string>
  export let links: Record<string, string>

  const style = `height: 1em; vertical-align: -3pt; padding-right: 2pt;`
  const icon_map = {
    Datenschutz: `ic:round-privacy-tip`,
    Impressum: `octicon:law`,
    Kontakt: `ic:round-alternate-email`,
    Satzung: `ic:round-text-snippet`,
  }
</script>

<footer>
  <div class="copyright">
    <img src="/favicon.svg" alt="Logo" height="50" />
    <span>© {new Date().getFullYear()} Afara e.V.</span>
  </div>
  <Social {social} style="margin-top: 1ex;" />
  <div>
    {#each Object.entries(links) as [title, href]}
      <a {href}>
        <Icon icon={icon_map[title]} {style} />
        {title}
      </a>
    {/each}
  </div>
</footer>

<style>
  footer {
    padding: 3em calc(1em + 3vw);
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 3em;
    background: var(--dark-gray);
    color: white;
    place-content: center;
    place-items: center;
  }
  footer :global(a) {
    color: var(--light-green);
  }
  footer :global(a:hover) {
    color: var(--dark-orange);
  }
  footer div {
    margin: auto;
    display: flex;
    gap: 3pt 1em;
    flex-wrap: wrap;
    place-content: center;
    place-items: center;
  }
</style>
