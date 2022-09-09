<script lang="ts">
  import { blogTags } from '$lib/types'
  import type { SvelteComponent } from 'svelte'
  import { fade, slide } from 'svelte/transition'
  import ChevronExpand from '~icons/bi/chevron-expand'
  import HandsHelping from '~icons/fa-solid/hands-helping'
  import Tags from '~icons/fa-solid/tags'
  import BeachAccess from '~icons/ic/beach-access'
  import EventAvailable from '~icons/ic/event-available'
  import RateReview from '~icons/ic/rate-review'
  import CloseCross from '~icons/ic/round-close'
  import Euro from '~icons/ic/round-euro'
  import StatsChart from '~icons/ic/round-query-stats'
  import SelectAll from '~icons/ic/select-all'
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
  const icons: Record<BlogTag, typeof SvelteComponent> = {
    Alle: SelectAll,
    Spendenaktionen: Euro,
    Vorstand: StatsChart,
    Events: EventAvailable,
    Erfahrungsberichte: RateReview,
    Kooperationen: HandsHelping,
    Treffen: BeachAccess,
  }

  let open = false
  let windowWidth: number
  const style = `height: 18pt; vertical-align: middle; margin-right: 5pt;`
</script>

<svelte:window bind:innerWidth={windowWidth} />

<h2>
  <Tags style="height: 16pt; margin-right: 5pt;" />Tags
  {#if windowWidth < 750}
    <button on:click={() => (open = !open)} aria-label="Blog Tags öffnen">
      {#if open}
        <CloseCross {style} />
      {:else}
        <ChevronExpand {style} />
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
