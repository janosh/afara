<script lang="ts">
  import { Img } from '$lib'

  export let data

  let windowWidth: number

  const orange = `#ea9419`
  const yellow = `#ffc326`
  const colors = [yellow, orange, orange]
</script>

<h1>AFARA e.V.</h1>
<div class="grid">
  {#each data.yaml.images.slice(0, windowWidth > 800 ? 9 : windowWidth < 500 ? 3 : 6) as img, idx}
    <Img
      {...img}
      sizes={[{ w: 400 }, { w: 800 }]}
      pictureStyle="grid-area: img{idx + 1};"
      loading="eager"
    />
  {/each}
  {#each Object.values(data.yaml.text) as text, idx}
    <div style="grid-area: txt{idx + 1}; background: {colors[idx]};">
      <span>{text}</span>
    </div>
  {/each}
</div>

<svelte:window bind:innerWidth={windowWidth} />

<article>
  {@html data.page.body}
</article>

<style>
  h1 {
    font-size: clamp(2rem, 2rem + 2vw, 3rem);
    margin: 2em 0 0 0;
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
      'img5 img5 img5 txt3 txt3 txt3 txt3 txt3 img1 img1 img1'
      'img5 img5 img5 img7 img7 img7 img7 img7 img1 img1 img1';
  }
  @media (min-width: 801px) {
    .grid {
      grid-auto-rows: 4em 12em;
    }
  }
  @media (max-width: 800px) {
    .grid {
      grid-template-columns: repeat(3, 1fr);
      grid-auto-rows: calc(12em + 6vw);
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
    display: flex;
    place-items: center;
    place-content: center;
    padding: 5pt 1em;
    color: white;
  }
  .grid div span {
    margin: 5pt 0 0 0;
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
  :global(main :where(h1, h2, h3, h4, h5, h6)) {
    /* decrease top margin from global.css */
    margin-top: 1.2em;
  }
</style>
