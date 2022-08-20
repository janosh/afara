<script lang="ts">
  import Img from '$lib/Img.svelte'
  import ToolTip from '$lib/ToolTip.svelte'
  import PersonCircle from '~icons/bi/person-circle'
  import Calendar from '~icons/octicon/calendar'
  import type { PageData } from './$types'

  export let data: PageData
  $: ({ post } = data)

  $: ({ title, body, cover } = post)
  $: ({ bio, name, photo, url } = post.author)
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
          <PersonCircle {style} />
          <strong><a href={url}>{name}</a></strong>
          <span slot="tip">{bio}</span>
        </ToolTip>
      {:else}
        <PersonCircle {style} />
        <strong>{name}</strong>
      {/if}
      am
      <Calendar {style} />
      <strong>{new Date(post.date).toLocaleDateString(`de`)}</strong>
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
