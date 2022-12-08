<script lang="ts" context="module">
  export type EventDescription = {
    title: string
    detail?: string
    time: string | number | Date
  }
</script>

<script lang="ts">
  export let events: EventDescription[]
  export let hasNext = false
  export let disableFormatTime = false
  let klass = ''
  export { klass as class }
  export let style = ''

  const intl = new Intl.DateTimeFormat(undefined, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })
</script>

<div class="timeline {klass}" class:hasNext {style}>
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

<style lang="scss">
  .timeline {
    margin: 10px 20px;
    display: grid;
    grid-template-columns: max-content 12px 1fr;
    justify-content: stretch;
    max-width: 600px;
  }

  .time,
  .content {
    padding: 6px 16px;
  }

  .time {
    padding-top: 8px;
    text-align: right;
  }

  .decorator {
    padding-top: 7px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;

    & > .dot {
      flex-shrink: 0;
      width: 12px;
      height: 12px;
      background-color: rgb(171, 171, 171);
      border-radius: 50%;
      margin-top: 3px;
    }

    & > .line:not(.hide) {
      width: 2px;
      height: 100%;
      background-color: rgb(131, 131, 131);
      border-radius: 1px;
    }
  }
</style>
