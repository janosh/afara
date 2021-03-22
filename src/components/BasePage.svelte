<script>
  import Update from '@svg-icons/material-sharp/update.svg'

  import Img from '../components/Img.svelte'
  import Toc from '../components/Toc.svelte'

  export let page

  $: ({ title, slug, date, cover, body, yaml, sys } = page)

  $: date = new Date(date || sys?.publishedAt).toLocaleDateString(`de`)
  const style = `height: 3ex; vertical-align: bottom; padding-right: 4pt;`
</script>

<svelte:head>
  <title>{title ? `${title} - Afara` : `Afara`}</title>
  <meta name="date" content={date} />
</svelte:head>

<figure>
  <Img {...cover} imgStyle="height: 100%;" />
  <h1>{title}</h1>
  {#if yaml?.caption}
    <figcaption>{@html yaml.caption}</figcaption>
  {/if}
</figure>
<slot />
<article>
  {#if yaml?.toc}
    <Toc />
  {/if}
  {@html body}
  {#if sys?.publishedAt && !slug.includes(`blog`)}
    <time>
      <Update {style} />Zuletzt bearbeitet:
      {date}</time>
    <address>
      <a href="mailto:it@afara.foundation?subject=Feedback zu Seite: {title}"
        >Feedback zu dieser Seite?</a>
    </address>
  {/if}
</article>

<style>
  article {
    max-width: 42em;
    padding: 1em;
    margin: 2em auto;
  }
  figure {
    position: relative;
    overflow: hidden;
    height: 30em;
    max-height: 50vh;
    margin: 0;
  }
  figure > h1 {
    color: white;
    background: rgba(0, 0, 0, 0.4);
    font-size: 5ex;
    padding-left: 1ex;
    padding-right: 1ex;
    border-radius: 1ex;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(calc(-50% - 1em), -50%);
    text-align: center;
    margin: 0 1em;
    width: max-content;
    max-width: 80vw;
  }
  figcaption {
    position: absolute;
    bottom: 0;
    right: 1em;
    background: rgba(0, 0, 0, 0.7);
    padding: 0 8pt;
    border-radius: 4pt 4pt 0 0;
    color: white;
  }
  figcaption :global(a) {
    color: var(--lightBlue);
  }
  time {
    display: block;
    font-size: 1ex;
    margin: 2em;
    text-align: center;
    margin-top: 7em;
  }
  address {
    text-align: center;
    font-size: 1.3ex;
    font-style: normal;
    margin: 2em;
  }
</style>
