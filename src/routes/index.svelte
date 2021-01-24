<script context="module">
  import { fetchPage, fetchYaml } from '../utils/queries'

  export async function preload() {
    const page = await fetchPage(`/`)
    const yaml = await fetchYaml(`Landing Page`)
    return { page, yaml }
  }
</script>

<script>
  import Img from '../components/Img.svelte'

  export let page, yaml

  let windowWidth
</script>

<h1>Afara e.V.</h1>
<div class="grid">
  {#each yaml.images.slice(0, windowWidth > 800 ? 9 : windowWidth < 500 ? 3 : 6) as img, idx}
    <Img
      {...img}
      sizes={[{ w: 400 }, { w: 800 }]}
      pictureStyle="grid-area: img{idx + 1};" />
  {/each}
  {#each Object.values(yaml.text) as text, idx}
    <div style="grid-area: txt{idx + 1};">
      <span>{text}</span>
    </div>
  {/each}
</div>

<svelte:window bind:innerWidth={windowWidth} />

<article>
  {@html page.body}
</article>

<style>
  h1 {
    font-size: calc(3ex + 2vw);
  }
  .grid {
    margin: 1em 2vw 2em;
    display: grid;
    grid-gap: 1ex;
    font-weight: bolder;
    grid-template-columns: repeat(11, 1fr);
    grid-template-areas:
      'img8 img8 img8 txt2 txt2 txt2 txt2 txt2 img2 img2 img2'
      'img8 img8 img8 img3 img3 img3 img3 img3 img2 img2 img2'
      'img4 img4 img4 txt1 txt1 txt1 txt1 txt1 img6 img6 img6'
      'img4 img4 img4 img9 img9 img9 img9 img9 img6 img6 img6'
      'img5 img5 img5 txt3 txt3 txt3 txt3 img1 img1 img1 img1'
      'img5 img5 img5 img7 img7 img7 img7 img1 img1 img1 img1';
  }
  @media (max-width: 800px) {
    .grid {
      grid-template-columns: repeat(3, 1fr);
      grid-auto-rows: calc(10em + 6vw);
      grid-template-areas:
        'img1 txt1 img2'
        'txt2 img3 img4'
        'img5 img6 txt3';
    }
  }
  @media (max-width: 500px) {
    .grid {
      grid-template-columns: 1fr 1fr;
      grid-template-areas:
        'img1 txt1'
        'txt2 img2'
        'img3 txt3';
    }
  }
  .grid div {
    border-radius: 5pt;
    font-size: 2ex;
    display: flex;
    place-items: center;
    padding: 5pt 1em;
    color: white;
    font-size: calc(1em + 0.5vw);
    background: var(--darkOrange);
  }
  .grid :global(img) {
    border-radius: 5pt;
    height: 100%;
  }
  section div span {
    font-size: 3ex;
    display: block;
  }
  article {
    padding: calc(1ex + 2vw);
    max-width: 40em;
    margin: auto;
  }
</style>
