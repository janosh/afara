<script lang="ts">
  import { slide, fade } from 'svelte/transition'

  import Tags from '@svicons/fa-solid/tags.svelte'
  import ChevronExpand from '@svicons/bootstrap/chevron-expand.svelte'
  import CircleWithCross from '@svicons/entypo/circle-with-cross.svelte'
  import Euro from '@svicons/material-sharp/euro.svelte'
  import RateReview from '@svicons/material-sharp/rate-review.svelte'
  import SelectAll from '@svicons/material-sharp/select-all.svelte'
  import EventAvailable from '@svicons/material-sharp/event-available.svelte'
  import BeachAccess from '@svicons/material-sharp/beach-access.svelte'
  import HandsHelping from '@svicons/fa-solid/hands-helping.svelte'
  import StatsChart from '@svicons/ionicons-solid/stats-chart.svelte'
  import type { BlogTag } from '../types'

  export let tags: [BlogTag, number][]
  export let activeTag = `Alle`

  const icons = {
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
        <CircleWithCross {style} />
      {:else}
        <ChevronExpand {style} />
      {/if}
    </button>
  {/if}
</h2>
{#if windowWidth > 750 || open}
  <ul transition:slide>
    {#each tags as [tag, count]}
      <li>
        <button
          transition:fade
          aria-label="Nach Tag {tag} filtern"
          class:active={activeTag === tag}
          on:click={() => (activeTag = tag)}>
          <svelte:component
            this={icons[tag]}
            style="height: 2.2ex; vertical-align: -3pt; margin-right: 6pt" />
          {tag}
          ({count})</button>
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
    color: var(--textColor);
    border-radius: 4pt;
    padding: 3pt 7pt;
    transition: 0.4s;
    display: flex;
    align-items: center;
  }
  ul > li > button.active {
    color: white;
    background: var(--darkGreen);
  }
</style>
