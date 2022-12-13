<script lang="ts">
  import TimeLineEditable from '$lib/TimeLineEditable.svelte'
  import { timelineStore, styleStore } from '$lib/store'
  import LocalStorage from '$lib/LocalStorage.svelte'
  import '$lib/assets/index.css'
  import Monaco from '$lib/Monaco.svelte'
  import Export from '$lib/Export.svelte'

  const timeLineItem = timelineStore.item
  const styleItem = styleStore.item

  let timelineElement: HTMLDivElement
</script>

<div class="wrapper">
  <div class="style-container">
    <div class="flex-center">
      <b style="margin-left: 4px;">STYLE</b>
      <div class="grow-1" />
      <LocalStorage store={styleStore} style="translate: 0 2px;" />
    </div>

    <div class="border radius-top-right-0 style grow-1">
      <Monaco
        bind:value={$styleItem}
        options={{ language: 'css', lineNumbers: 'off' }}
      />
    </div>

    <div class="border options">
      <label>
        Afficher la dernière ligne
        <input type="checkbox" bind:checked={$timeLineItem.hasNext} />
      </label>
    </div>
  </div>

  <div>
    <div class="flex-center">
      <b style="margin-left: 4px;">TIMELINE</b>
      <div class="grow-1" />
      <LocalStorage store={timelineStore} style="translate: 0 2px;" />
    </div>

    <div class="timeline border radius-top-right-0">
      <TimeLineEditable
        bind:timelineElement
        bind:events={$timeLineItem.events}
        hasNext={$timeLineItem.hasNext}
        style={$styleItem}
      />
    </div>
    <div style="display: flex; padding-top: 0.5em;">
      <div class="grow-1" />
      <Export elem={timelineElement} />
    </div>
  </div>
</div>

<style lang="scss">
  .wrapper {
    --style-width: 440px;
    display: grid;
    gap: 1em;
    padding-left: 2em;
    padding-right: 2em;
    grid-template-columns: max-content 1fr var(--style-width);
    justify-items: center;
    align-items: start;
  }

  .border {
    border: 2px solid grey;
    border-radius: 4px;
  }

  .border.radius-top-right-0 {
    border-top-right-radius: 0;
  }

  .style-container {
    position: sticky;
    top: 1em;
    height: calc(100vh - 14em);
    display: flex;
    flex-direction: column;
    > .style {
      width: var(--style-width);
      padding: 8px 0;
    }
  }

  .options {
    margin-top: 0.5em;
    padding: 1em;
    background-color: #eee;
  }

  .flex-center {
    display: flex;
    align-items: center;
  }

  .grow-1 {
    flex-grow: 1;
  }
</style>
