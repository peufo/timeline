<script lang="ts">
  import type { EventDescription } from '$lib/types'

  export let events: EventDescription[]
  export let hasNext = false
  export let disableFormatTime = false
  export let editable = false
  let klass = ''
  export { klass as class }
  export let style = ''
  export let colorPoint = 'rgb(131, 131, 131)'
  export let colorLine = 'rgb(171, 171, 171)'

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
  class="timeline {klass}"
  class:hasNext
  style="
    --color-point: {colorPoint};
    --color-line: {colorLine};
    {style}
  "
>
  {#if editable}
    {#each events as { title, detail, time }, index}
      <div
        class="time"
        contenteditable="true"
        bind:innerHTML={time}
        on:focus
        on:blur
        data-index={index}
      />
      <div class="decorator">
        <div class="dot" />
        <div
          class="line"
          class:hide={!hasNext && index === events.length - 1}
        />
      </div>
      <div class="content">
        <b
          contenteditable="true"
          bind:innerHTML={title}
          on:focus
          on:blur
          data-index={index}
        />
        <p
          contenteditable="true"
          bind:innerHTML={detail}
          on:focus
          on:blur
          data-index={index}
        />
      </div>
    {/each}
  {:else}
    {#each events as { title, detail, time }, index}
      <div class="time">
        {disableFormatTime ? time : intl.format(new Date(time))}
      </div>
      <div class="decorator">
        <div class="dot" />
        <div
          class="line"
          class:hide={!hasNext && index === events.length - 1}
        />
      </div>
      <div class="content">
        <b>{title}</b>
        <p>
          {detail}
        </p>
      </div>
    {/each}
  {/if}
</div>

<style lang="scss">
  .timeline {
    margin: 10px 20px;
    display: grid;
    grid-template-columns: max-content 12px 1fr;
    justify-content: stretch;
    max-width: 210mm;
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
      background-color: var(--color-point);
      border-radius: 50%;
      margin-top: 3px;
    }

    & > .line:not(.hide) {
      width: 2px;
      height: 100%;
      background-color: var(--color-line);
      border-radius: 1px;
    }
  }
</style>
