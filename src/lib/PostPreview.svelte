<script lang="ts">
  import Icon from '@iconify/svelte'
  import { Img, ToolTip } from '.'
  import type { Post } from './types'

  export let post: Post

  const { title, slug, cover, date, author, tags, plainBody } = post

  const style = `padding-right: 4pt; vertical-align: -1pt; height: 12pt;`
  const authorImgStyle = `width: 4ex; height: 4ex; border-radius: 50%; vertical-align: -8pt; margin-right: 1ex;`
  const imgStyle = `border-radius: 1ex 1ex 0 0;`
</script>

<section>
  <a href={slug}>
    <Img sizes={[{ w: 400, h: 300 }]} {...cover} {imgStyle} />
  </a>
  <h3><a href={slug}>{title}</a></h3>
  <div>
    <ToolTip>
      <Img
        {...author.photo}
        alt={author.name}
        sizes={[{ w: 100, h: 100 }]}
        imgStyle={authorImgStyle}
      />{author.name}
      <address slot="tip">
        {#if author.url}
          <a href={author.url}><Icon icon="ic:round-link" {style} />{author.url}</a>
          <br />
        {/if}
        {#if author.email}
          <a href="mailto:{author.email}">
            <Icon icon="ic:round-email" {style} />{author.email}
          </a>
          <br />
        {/if}
        {#if author.fieldOfStudy}
          <Icon icon="fa-solid:graduation-cap" {style} />
          {author.fieldOfStudy}
        {/if}
      </address>
    </ToolTip>
    <span>
      <Icon icon="octicon:calendar" {style} />
      {new Date(date).toLocaleDateString(`de`)}
    </span>
    <span>
      <Icon icon="fa-solid:tags" {style} />{tags.join(`, `)}
    </span>
  </div>
  <p>
    {plainBody.slice(0, 150) + `...`}
    [<a href={slug}>weiterlesen</a>]
  </p>
</section>

<style>
  section {
    border-radius: 1ex;
    display: grid;
    font-size: 0.9em;
  }
  section > *:not(:first-child) {
    margin-left: 2.5ex;
    margin-right: 2.5ex;
  }
  div {
    padding: 1ex;
    display: flex;
    flex-wrap: wrap;
    gap: 2ex;
    align-items: baseline;
  }
  address a {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
    width: 100%;
    vertical-align: bottom;
    font-style: normal;
  }
</style>
