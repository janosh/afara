import adapter from '@sveltejs/adapter-static'
import preprocess from 'svelte-preprocess'

/** @type {import('@sveltejs/kit').Config} */
export default {
  preprocess: preprocess(),

  kit: {
    adapter: adapter(),

    prerender: {
      entries: [`/`, `/geschichte`, `/vorort`, `/patenschaften-junger-muetter`],
    },

    alias: {
      $root: `.`,
    },
  },
}
