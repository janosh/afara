<script lang="ts">
  import { blogTags } from '$lib/types'
  import Icon from '@iconify/svelte'
  import { fade, slide } from 'svelte/transition'
  import type { BlogTag, Post } from './types'

  export let posts: Post[]
  export let activeTag = `Alle`

  const tagCounter = Object.fromEntries(blogTags.map((tag) => [tag, 0]))

  // count tag occurrences
  for (const post of posts) {
    for (const tag of post.tags) {
      tagCounter[tag] += 1
    }
  }
  tagCounter.Alle = posts.length
  const icons: Record<BlogTag, string> = {
    Alle: `ic:select-all`,
    Spendenaktionen: `ic:round-euro`,
    Vorstand: `ic:round-query-stats`,
    Events: `ic:event-available`,
    Erfahrungsberichte: `ic:rate-review`,
    Kooperationen: `fa-solid:hands-helping`,
    Treffen: `ic:beach-access`,
  }

  let open = false
  let windowWidth: number
  const style = `height: 18pt; vertical-align: middle; margin-right: 5pt;`
</script>

<svelte:window bind:innerWidth={windowWidth} />

<h2>
  <Icon icon="fa-solid:tags" style="height: 16pt; margin-right: 5pt;" />Tags
  {#if windowWidth < 750}
    <button on:click={() => (open = !open)} aria-label="Blog Tags öffnen">
      {#if open}
        <Icon icon="ic:round-close" {style} />
      {:else}
        <Icon icon="bi:chevron-expand" {style} />
      {/if}
    </button>
  {/if}
</h2>
{#if windowWidth > 750 || open}
  <ul transition:slide>
    {#each Object.entries(tagCounter) as [tag, count]}
      <li>
        <button
          transition:fade
          aria-label="Nach Tag {tag} filtern"
          class:active={activeTag === tag}
          on:click={() => (activeTag = tag)}
        >
          <svelte:component
            this={icons[tag]}
            style="height: 2.2ex; vertical-align: -3pt; margin-right: 6pt"
          />
          {tag} ({count})
        </button>
      </li>
    {/each}
  </ul>
{/if}

<style>
  h2 {
    text-align: center;
    margin-top: 4em;
  }
  ul {
    font-size: 0.9em;
    padding: 0 1em 2em;
    max-width: 50em;
    display: flex;
    flex-wrap: wrap;
    gap: 1em;
    place-content: center;
    margin: auto;
    list-style: none;
  }
  ul > li > button {
    background: var(--lightBg);
    border-radius: 4pt;
    padding: 3pt 7pt;
    display: flex;
    align-items: center;
    transition: color 0.4s, background-color 0.4s;
  }
  ul > li > button.active {
    color: white;
    background: var(--dark-green);
  }
</style>
