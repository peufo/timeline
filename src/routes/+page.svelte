<script lang="ts">
  import TimeLineEditable from '$lib/TimeLineEditable.svelte'
  import { item } from '$lib/store'
  import Save from '$lib/Save.svelte'
  import '$lib/assets/index.css'

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
    <Save />
  </header>

  <main>
    <div class="control">
      <label>
        Couleur des points
        <input type="color" bind:value={$item.control.colorPoint} />
      </label>
      <label>
        Couleur des lignes
        <input type="color" bind:value={$item.control.colorLine} />
      </label>
      <label>
        Afficher la dernière ligne
        <input type="checkbox" bind:checked={$item.control.hasNext} />
      </label>

      <!--
        <a href="https://www.cdnfonts.com/" target="_blank" rel="noreferrer">
          Chercher une police d'écriture
        </a>
      -->

      <button on:click={handleExport}>
        <b>EXPORTER</b>
      </button>
    </div>
    <div class="timeline" style="-webkit-print-color-adjust: exact !important;">
      <TimeLineEditable
        bind:timelineElement
        bind:events={$item.events}
        {...$item.control}
        style="font-family: Roboto, sans-serif!important;"
      />
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

  main > div {
    border: 2px solid grey;
    border-radius: 4px;
    padding: 1em;
  }

  .timeline {
    display: grid;
    place-content: center;
    width: max-content;
  }

  .control {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1em;
    min-width: 300px;
  }
  .control {
    background-color: #eee;
  }

  button {
    border: 1px grey solid;
    border-radius: 3px;
  }
</style>
