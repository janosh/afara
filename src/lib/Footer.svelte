<script lang="ts">
  import Icon from '@iconify/svelte'
  import Social from './Social.svelte'
  import type { SocialNetwork } from './types'

  const icon_map = {
    Datenschutz: `ic:round-privacy-tip`,
    Impressum: `octicon:law`,
    Kontakt: `ic:round-alternate-email`,
    Satzung: `ic:round-text-snippet`,
  }

  export let social: Record<SocialNetwork, string>
  export let links: Record<string, string>
  const style = `height: 1em; vertical-align: -3pt; padding-right: 2pt;`
</script>

<footer>
  <div class="copyright">
    <img src="/favicon.svg" alt="Logo" height="60" />
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
  <span>
    Diese Seite ist
    <a href="https://github.com/janosh/afara">
      <Icon icon="mdi:open-source-initiative" inline />
      open source
    </a>
  </span>
</footer>

<style>
  footer {
    padding: 3em calc(1em + 3vw);
    text-align: center;
    display: grid;
    gap: 2em;
    place-items: center;
    background: var(--dark-gray);
    color: white;
    padding-inline: max(1em, calc(50vw - 30em));
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
    justify-content: center;
  }
  @media (max-width: 700px) {
    footer div.copyright {
      display: contents;
    }
  }
  @media (min-width: 701px) {
    footer {
      place-content: center;
      grid-template-columns: 1fr 1fr;
    }
    footer div.copyright {
      place-items: center;
    }
  }
</style>
