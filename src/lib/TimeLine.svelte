<script lang="ts">
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
</script>

<div bind:this={timelineElement} class="timeline {klass}" {style} class:hasNext>
  {#each events as { title, detail, time, date }, index}
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
      <b>{title}</b>
      <div>{detail}</div>
    </div>
  {/each}
</div>
