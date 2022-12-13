<script lang="ts">
  import { onMount } from 'svelte'
  import type { TimelineEventEditable } from '$lib/types'
  import '$lib/timeline.scss'

  let klass = ''
  export { klass as class }
  export let style = ''
  export let timelineElement: HTMLDivElement | undefined = undefined
  export let events: TimelineEventEditable[]
  export let hasNext = false

  const newEvent: TimelineEventEditable = {
    title: 'Nouvelle étape',
    time: '2042',
    detail: 'Details...',
  }
  function addEvent(index: number) {
    events = [
      ...events.slice(0, index),
      { ...newEvent },
      ...events.slice(index),
    ]
  }

  function removeEvent(index: number) {
    events = [...events.slice(0, index), ...events.slice(index + 1)]
  }

  function addSubEvents(index: number) {
    events[index].subEvents = [{ ...newEvent }]
  }

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

<div bind:this={timelineElement} class="timeline {klass}" class:hasNext>
  {#each events as { title, detail, time, subEvents }, index}
    <div class="time" contenteditable="true" bind:innerHTML={time} />

    <div class="decorator">
      <div class="dot" />
      {#if !(!hasNext && index === events.length - 1)}
        <div class="line" />
      {/if}
    </div>

    <div class="content">
      <b class="title" contenteditable="true" bind:innerHTML={title} />
      {#if detail}
        <p class="detail" contenteditable="true" bind:innerHTML={detail} />
      {:else}
        <div style="height: 1em;" />
      {/if}

      {#if subEvents && subEvents.length}
        <svelte:self bind:events={subEvents} {hasNext} {style} class={klass} />
      {/if}

      <div class="edit">
        {#if !detail}
          <button
            class="add"
            on:click={() => (detail = 'detail...')}
            title="Ajouter detail">+ detail</button
          >
        {/if}
        {#if !subEvents || !subEvents.length}
          <button
            class="add"
            on:click={() => addSubEvents(index)}
            title="Ajouter dedans">↘</button
          >
        {/if}
        <button
          class="add"
          on:click={() => addEvent(index + 1)}
          title="Ajouter après">↓</button
        >
        <button
          class="add"
          on:click={() => addEvent(index)}
          title="Ajouter avant">↑</button
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
</div>
