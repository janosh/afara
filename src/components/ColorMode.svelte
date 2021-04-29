<script>
  import Modal from './Modal.svelte'
  import { colorMode, colorModeKey } from '../stores'
  import Sun from '@svicons/fa-solid/sun.svelte'
  import Moon from '@svicons/entypo/moon.svelte'
  import BrightnessAuto from '@svicons/material-sharp/brightness-auto.svelte'

  export const colors = {
    blue: `#0039c1`,
    darkBlue: `#002e9d`,
    darkerBlue: `#061725`,
    lightBlue: `#42a7ff`,

    green: `#81ad46`,
    darkGreen: `#4d8711`,
    darkerGreen: `#3c660f`,
    lightGreen: `#0fc5b6`,
    lighterGreen: `#caef76`,

    yellow: `#ffac4d`,
    lightYellow: `#d6ff00`,
    darkYellow: `#ffca35`,

    orange: `#ecb517`,
    darkOrange: `#d88100`,
    lightOrange: `#ffca29`,

    red: `#de4931`,

    lighterGray: `#fafafa`,
    lightGray: `#e2e2e2`,
    gray: `#2b363f`,
    darkGray: `#1d242a`,
  }

  export const modeColors = {
    light: {
      textColor: `black`,
      linkColor: colors.blue,
      hoverColor: colors.lightBlue,
      bodyBg: colors.lighterGray,
      accentBg: `white`,
      lightBg: colors.lightGray,
      shadow: colors.gray,
      borderColor: colors.lightBlue,
      headingColor: colors.lightBlue,
      headerBg: colors.darkOrange,
      headerColor: `white`,
      transparent: `rgba(255, 255, 255, 0.8)`,
    },
    dark: {
      textColor: `white`,
      linkColor: colors.lightBlue,
      hoverColor: colors.green,
      bodyBg: colors.darkerBlue,
      accentBg: `black`,
      lightBg: colors.darkGray,
      shadow: `black`,
      borderColor: colors.darkGreen,
      headingColor: colors.lightGreen,
      headerBg: colors.darkGray,
      headerColor: colors.lightBlue,
      transparent: `rgba(0, 0, 0, 0.5)`,
    },
  }

  const setModeFactory = (mode) => () => {
    open = false
    $colorMode = mode
    applyColors()
  }

  function applyColors() {
    // If colorMode is `auto` we pick dark or light depending on prefersDark media query.
    const prefersDark = window.matchMedia(`(prefers-color-scheme: dark)`).matches
    let activeMode
    if ($colorMode === `auto`) activeMode = prefersDark ? `dark` : `light`
    else activeMode = $colorMode

    // Define CSS vars for moded colors (both during SSR and in production).
    for (const [key, val] of Object.entries(modeColors[activeMode])) {
      if (val === undefined) console.error(`CSS variable ${key} is undefined`)
      document.body.style.setProperty(`--${key}`, val)
    }

    // Define CSS vars for non-moded colors as well while we're at it
    for (const [key, val] of Object.entries(colors)) {
      document.body.style.setProperty(`--${key}`, val)
    }
  }

  // boundFn and <svelte:head> below provide SSR support
  // we modify a stringified version of applyColors so it can run before hydration
  // and prevent color falshes on page load
  const boundFn = String(applyColors).replace(/\$colorMode/g, `colorMode`)

  /* eslint-disable no-useless-escape */
  const script = `
    <script>
      const colorMode = localStorage.${colorModeKey} ?? 'auto'
      const modeColors = ${JSON.stringify(modeColors)}
      const colors = ${JSON.stringify(colors)}
      window.addEventListener('DOMContentLoaded', ${boundFn})
    <\/script>`
  /* eslint-enable no-useless-escape */

  let open = false

  const handleKeydown = (event) => {
    if (!event.ctrlKey) return
    if (event.key === `1`) setModeFactory(`light`)()
    if (event.key === `2`) setModeFactory(`dark`)()
    if (event.key === `3`) setModeFactory(`auto`)()
  }
</script>

<button class="opener" on:click={() => (open = true)}>
  <Moon width="30px" style="vertical-align: text-bottom;" />
</button>

<svelte:window on:keydown={handleKeydown} />

{#if open}
  <Modal on:close={() => (open = false)} style="width: max-content; max-width: 90vw;">
    <div>
      <button on:click={setModeFactory(`light`)} class="choice light">
        <Sun />
        Hell</button>
      <button on:click={setModeFactory(`dark`)} class="choice dark">
        <Moon color="yellow" />
        Dunkel</button>
      <button on:click={setModeFactory(`auto`)} class="choice auto">
        <BrightnessAuto color="var(--bodyBg)" />
        Auto</button>
    </div>
  </Modal>
{/if}

<svelte:head>
  {@html script}
</svelte:head>

<style>
  div {
    display: flex;
    flex-wrap: wrap;
    gap: 1em;
    place-content: center;
  }
  @media (max-width: 700px) {
    div {
      width: min-content;
    }
  }
  button.opener {
    padding: 0;
    grid-area: colormode;
    background: transparent;
    color: var(--yellow);
  }
  button.choice {
    height: 7ex;
    width: 10ex;
    display: grid;
    place-items: center;
    font-size: 3ex;
    box-shadow: 0 0 1em black;
    transition: 0.3s;
  }
  button.choice:hover {
    transform: scale(1.02);
  }
  button.choice.light {
    background: #f1f1f1;
    color: black;
  }
  button.choice.dark {
    background: #061725;
    color: white;
  }
  button.choice.auto {
    color: var(--textColor);
    background: linear-gradient(to right bottom, var(--textColor) 50%, var(--bodyBg) 50%);
  }
  button.choice :global(svg) {
    height: 3ex;
    padding-bottom: 12pt;
  }
</style>
