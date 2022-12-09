<script lang="ts">
  import { onMount } from 'svelte'
  import type { TimelineEventEditable } from '$lib/types'
  import '$lib/timeline.scss'

  export let events: TimelineEventEditable[]
  export let hasNext = false

  let klass = ''
  export { klass as class }
  export let style = ''
  export let timelineElement: HTMLDivElement | undefined = undefined

  const newEvent: TimelineEventEditable = {
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

  let styleElement: HTMLStyleElement

  onMount(() => {
    styleElement = document.createElement('style')
    document.head.appendChild(styleElement)
    return () => {
      document.head.removeChild(styleElement)
    }
  })

  $: if (styleElement) styleElement.innerHTML = style
</script>

<div bind:this={timelineElement} class="timeline {klass}" class:hasNext>
  {#each events as { title, detail, time }, index}
    <div class="time" contenteditable="true" bind:innerHTML={time} />

    <div class="decorator">
      <div class="dot" />
      {#if !(!hasNext && index === events.length - 1)}
        <div class="line" />
      {/if}
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
</div>

<style bind:innerHTML={style}></style>
