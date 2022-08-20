<script lang="ts">
  import AlternateEmail from '~icons/ic/round-alternate-email'
  import PrivacyTip from '~icons/ic/round-privacy-tip'
  import DocumentText from '~icons/ic/round-text-snippet'
  import OpenSource from '~icons/mdi/open-source-initiative'
  import Law from '~icons/octicon/law'
  import Social from './Social.svelte'
  import type { SocialNetwork } from './types'

  const icons = {
    Impressum: Law,
    Datenschutz: PrivacyTip,
    Kontakt: AlternateEmail,
    Satzung: DocumentText,
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
        <svelte:component this={icons[title]} {style} />
        {title}
      </a>
    {/each}
  </div>
  <span>
    Diese Seite ist
    <a href="https://github.com/janosh/afara">
      <OpenSource height="2.5ex" style="vertical-align: middle; padding-right: 3pt;" />
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
    background: var(--darkGray);
    color: white;
    padding-inline: max(1em, calc(50vw - 30em));
  }
  footer :global(a) {
    color: var(--lightGreen);
  }
  footer :global(a:hover) {
    color: var(--darkOrange);
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
