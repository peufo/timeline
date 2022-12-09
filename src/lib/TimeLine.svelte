<script lang="ts">
  import type { TimeLineEvent } from '$lib/types'
  import '$lib/timeline.scss'

  export let events: TimeLineEvent[]
  export let hasNext = false
  export let disableFormatTime = false
  let klass = ''
  export { klass as class }
  export let style = ''
  export let colorPoint = 'rgb(131, 131, 131)'
  export let colorLine = 'rgb(171, 171, 171)'
  export let timelineElement: HTMLDivElement | undefined

  const intl = new Intl.DateTimeFormat(undefined, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })
</script>

<div
  bind:this={timelineElement}
  class="timeline {klass}"
  class:hasNext
  style="
    --color-point: {colorPoint};
    --color-line: {colorLine};
    {style}
  "
>
  {#each events as { title, detail, time }, index}
    <div class="time">
      {disableFormatTime ? time : intl.format(new Date(time))}
    </div>

    <div class="decorator">
      <div class="dot" />
      <div class="line" class:hide={!hasNext && index === events.length - 1} />
    </div>

    <div class="content">
      <b>{title}</b>
      <p>{detail}</p>
    </div>
  {/each}
</div>
