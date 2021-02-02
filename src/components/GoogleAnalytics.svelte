<script>
  // https://analytics.google.com
  import { stores } from '@sapper/app'

  const { page } = stores()

  $: if (typeof gtag !== `undefined`) {
    window.gtag(`config`, `G-NF66NGCQSG`, { page_path: $page.path })
  }
</script>

<svelte:head>
  <script async src="https://googletagmanager.com/gtag/js?id=G-NF66NGCQSG"></script>
  <script>
    window.dataLayer = window.dataLayer || []
    window.gtag = (...args) => dataLayer.push(args)

    gtag('js', new Date())

    gtag('config', 'G-NF66NGCQSG')
  </script>
</svelte:head>