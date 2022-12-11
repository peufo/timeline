<script lang="ts">
  import TimeLineEditable from '$lib/TimeLineEditable.svelte'
  import { timelineStore, styleStore } from '$lib/store'
  import LocalStorage from '$lib/LocalStorage.svelte'
  import '$lib/assets/index.css'
  import Monaco from '$lib/Monaco.svelte'

  const timeLineItem = timelineStore.item
  const styleItem = styleStore.item

  let timelineElement: HTMLDivElement

  async function handleExport() {
    const printJS = (await import('print-js')).default
    printJS({
      printable: timelineElement,
      type: 'html',
      targetStyles: ['*'],
      font_size: undefined,
    })
  }
</script>

<div class="wrapper">
  <header>
    <h2>Timeline éditable</h2>
  </header>

  <main>
    <div>
      <div style="display: flex;">
        <div style="flex-grow: 1;" />
        <LocalStorage store={styleStore} />
      </div>
      <div class="container store style-container">
        <Monaco
          bind:value={$styleItem}
          options={{ language: 'css', lineNumbers: 'off' }}
        />
      </div>

      <div class="container options-container">
        <label>
          Afficher la dernière ligne
          <input type="checkbox" bind:checked={$timeLineItem.hasNext} />
        </label>
      </div>
    </div>

    <div>
      <div style="display: flex;">
        <div style="flex-grow: 1;" />
        <LocalStorage store={timelineStore} />
      </div>

      <div class="container store timeline-container">
        <TimeLineEditable
          bind:timelineElement
          bind:events={$timeLineItem.events}
          hasNext={$timeLineItem.hasNext}
          style={$styleItem}
        />
      </div>
      <button on:click={handleExport}>
        <b>EXPORTER</b>
      </button>
    </div>
  </main>
</div>

<style lang="scss">
  .wrapper {
    width: min-content;
    margin: auto;
  }

  header {
    display: flex;
    align-items: center;
  }

  main {
    display: flex;
    align-items: flex-start;
    gap: 1em;
  }

  .container {
    border: 2px solid grey;
    border-radius: 4px;
  }

  .container.store {
    border-top-right-radius: 0;
  }

  .timeline-container {
    width: max-content;
    max-width: 700px;
    padding: 1em;
  }

  .style-container {
    width: 340px;
  }

  .options-container {
    margin-top: 0.5em;
    padding: 1em;
    background-color: #eee;
  }

  button {
    border: 1px grey solid;
    border-radius: 3px;
  }
</style>
