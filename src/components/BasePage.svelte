<script>
  import Img from '../components/Img.svelte'
  import Toc from '../components/Toc.svelte'

  export let page

  $: ({ title, cover, body, yaml } = page)
</script>

<figure>
  <Img {...cover} />
  {#if $$slots.title}
    <slot name="title" />
  {:else if title}
    <h1>{title}</h1>
  {/if}
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
  figure > h1,
  figure > :global([slot='title']) {
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
</style>
