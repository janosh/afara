<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit'
  import Img from '../components/Img.svelte'
  import { fetchYaml } from '../utils/queries'

  export const load: Load = async () => {
    const projects = await fetchYaml(`Projects`)

    return { props: { projects } }
  }
</script>

<script lang="ts">
  export let projects: { title: string; slug: string; img: string }[]
</script>

<h1>Unsere Projekte</h1>
<ul>
  {#each projects as { title, slug, img }}
    <li>
      <a href={slug}>
        <Img src={img} alt={title} imgStyle="border-radius: 4pt; height: 16em;" />
      </a>
      <h2>
        <a href={slug}>{title}</a>
      </h2>
    </li>
  {/each}
</ul>

<style>
  h1 {
    margin-top: 3em;
  }
  ul {
    list-style: none;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(15em, 1fr));
    gap: 2em;
    max-width: 55em;
    padding: 2em;
    margin: 2em auto;
  }
  ul > li > a:first-child {
    display: block;
    color: var(--textColor);
    transition: transform 0.3s;
  }
  ul > li > a:first-child:hover {
    transform: scale(1.01);
  }
  ul > li > h2 {
    margin-top: 2pt;
  }
</style>
