<script context="module">
  import { fetchYaml } from '../utils/queries'

  export async function preload() {
    const projects = await fetchYaml(`Projects`)
    return { projects }
  }
</script>

<script>
  import Img from '../components/Img.svelte'

  export let projects
</script>

<h1>Unsere Projekte</h1>
<ul>
  {#each projects as { title, slug, img }}
    <li>
      <a href={slug}><Img src={img} alt={title} imgStyle="border-radius: 4pt;" /></a>
      <h2><a href={slug}>{title}</a></h2>
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
    max-width: 50em;
    padding: 2em;
    margin: 2em auto;
  }
  ul li a {
    display: block;
  }
  ul li h2 {
    margin-top: 2pt;
  }
</style>
