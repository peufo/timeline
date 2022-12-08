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
  export let timelineElement: HTMLDivElement | undefined

  const intl = new Intl.DateTimeFormat(undefined, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })

  const newEvent: EventDescription = {
    title: 'Future',
    time: '2042',
    detail: 'Ca déchire',
  }
  function addEvent(index: number) {
    console.log(index)
    events = [
      ...events.slice(0, index),
      { ...newEvent },
      ...events.slice(index),
    ]
  }

  function removeEvent(index: number) {
    events = [...events.slice(0, index), ...events.slice(index + 1)]
  }
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
  {#if editable}
    {#each events as { title, detail, time }, index}
      <div class="time" contenteditable="true" bind:innerHTML={time} />

      <div class="decorator">
        <div class="dot" />
        <div
          class="line"
          class:hide={!hasNext && index === events.length - 1}
        />
      </div>

      <div class="content">
        <b contenteditable="true" bind:innerHTML={title} />
        <p contenteditable="true" bind:innerHTML={detail} />
        <div class="edit">
          <button
            class="add"
            on:click={() => addEvent(index)}
            title="Ajouter avant">↑</button
          >
          <button
            class="add"
            on:click={() => addEvent(index + 1)}
            title="Ajouter après">↓</button
          >
          <button
            class="remove"
            on:click={() => removeEvent(index)}
            title="Supprimer"
          >
            -
          </button>
        </div>
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
        <p>{detail}</p>
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
    -webkit-print-color-adjust: exact !important; /*Chrome, Safari */
    color-adjust: exact !important; /*Firefox*/
  }

  .time,
  .content {
    padding: 6px 16px;
    position: relative;
  }

  .time {
    text-align: right;
  }

  .content {
    .edit {
      display: none;
      position: absolute;
      right: -2em;
      top: 0;
    }
    &:hover > .edit {
      display: block;
    }
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

  button {
    border: 1px grey solid;
    border-radius: 3px;
  }
  .add {
    background: #a7d49b;
  }
  .remove {
    background: #dda15e;
  }
</style>
