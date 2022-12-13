<script lang="ts">
  import { onMount } from 'svelte'
  import type { TimeLineEvent } from '$lib/types'
  import '$lib/timeline.scss'

  let klass = ''
  export { klass as class }
  export let style = ''
  export let timelineElement: HTMLDivElement | undefined = undefined
  export let events: TimeLineEvent[]
  export let hasNext = false

  const intl = new Intl.DateTimeFormat(undefined, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })

  let styleElement: HTMLStyleElement
  onMount(() => {
    styleElement = document.createElement('style')
    document.head.appendChild(styleElement)
    return () => {
      document.head.removeChild(styleElement)
    }
  })
  $: if (styleElement) {
    styleElement.innerHTML = style
  }
</script>

<div bind:this={timelineElement} class="timeline {klass}" {style} class:hasNext>
  {#each events as { title, detail, time, date, subEvents }, index}
    <div class="time">
      {!!date ? intl.format(date) : time}
    </div>

    <div class="decorator">
      <div class="dot" />
      {#if !(!hasNext && index === events.length - 1)}
        <div class="line" />
      {/if}
    </div>

    <div class="content">
      <b class="title">{title}</b>
      <p class="detail">{detail}</p>
      {#if subEvents && subEvents.length}
        <svelte:self bind:events={subEvents} {hasNext} {style} class={klass} />
      {/if}
    </div>
  {/each}
</div>
