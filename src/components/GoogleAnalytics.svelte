<script>
  // https://analytics.google.com
  import { page } from '$app/stores'

  $: if (typeof gtag !== `undefined`) {
    window.gtag(`config`, `G-NF66NGCQSG`, { page_path: $page.path })
  }
</script>

<svelte:head>
  <script async src="https://googletagmanager.com/gtag/js?id=G-NF66NGCQSG"></script>
  <script>
    window.dataLayer = window.dataLayer || []
    function gtag() {
      dataLayer.push(arguments)
    }

    gtag('js', new Date())

    gtag('config', 'G-NF66NGCQSG')
  </script>
</svelte:head>
