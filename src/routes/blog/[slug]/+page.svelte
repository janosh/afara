<script lang="ts">
  import Img from '$lib/Img.svelte'
  import ToolTip from '$lib/ToolTip.svelte'
  import Icon from '@iconify/svelte'
  import type { PageData } from './$types'

  export let data: PageData

  $: ({ title, body, cover, date } = data.post)
  $: ({ bio, name, photo, url } = data.post.author)
  const style = `height: 18pt; vertical-align: -3pt; padding: 0 3pt;`
</script>

<Img {...cover} imgStyle="max-height: 60vh" />
<article>
  <h1>{title}</h1>
  <section>
    <Img sizes={[{ w: 150 }]} {...photo} alt={name} />
    <span>
      von
      {#if bio}
        <ToolTip minWidth="18em">
          <Icon icon="bi:person-circle" {style} />
          <strong><a href={url}>{name}</a></strong>
          <span slot="tip">{bio}</span>
        </ToolTip>
      {:else}
        <Icon icon="bi:person-circle" {style} />
        <strong>{name}</strong>
      {/if}
      am
      <Icon icon="octicon:calendar" {style} />
      <strong>{new Date(date).toLocaleDateString(`de`)}</strong>
    </span>
  </section>
  {@html body}
</article>

<style>
  article {
    max-width: 42em;
    padding: 2em;
    margin: auto;
  }
  section {
    text-align: center;
    font-weight: lighter;
  }
  section :global(img) {
    margin: 1em auto;
    display: block;
    width: 3em;
    height: 3em;
    border-radius: 50%;
  }
</style>
