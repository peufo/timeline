<script lang="ts">
  import { browser } from '$app/environment'
  import TimeLine from '$lib/TimeLine.svelte'
  import { item, itemKey } from './store'

  let itemKeys = Object.keys(browser ? localStorage : {})
    .filter((k) => k.startsWith('item-'))
    .map((key) => key.replace('item-', ''))

  function handleAddSave() {
    const defaultKey = `save-${itemKeys.length}`
    const key = prompt('Nom de la sauvegarde', defaultKey) || defaultKey
    $itemKey = key
    itemKeys = [...itemKeys, key]
  }

  function handleRemove() {
    const index = itemKeys.indexOf($itemKey)
    itemKeys = [...itemKeys.slice(0, index), ...itemKeys.slice(index + 1)]
    localStorage.removeItem(`item-${$itemKey}`)
    $itemKey = 'default'
  }
</script>

<div class="wrapper">
  <header>
    <h2>Timeline</h2>
    <div class="save">
      <label title="Sélectioner une sauvegarde">
        Sauvegarde:
        <select bind:value={$itemKey}>
          {#each itemKeys as key}
            <option value={key}>{key}</option>
          {/each}
        </select>
      </label>

      <button
        class="add"
        title="Ajouter une sauvegarde"
        on:click={handleAddSave}
      >
        +
      </button>
      <button
        class="remove"
        title="Supprimer une sauvegarde"
        on:click={handleRemove}
      >
        -
      </button>
    </div>
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

      <a href="https://www.cdnfonts.com/" target="_blank" rel="noreferrer">
        Chercher un police
      </a>
    </div>
    <div class="timeline">
      <TimeLine
        bind:events={$item.events}
        disableFormatTime
        editable
        {...$item.control}
      />
    </div>
  </main>
</div>

<style lang="scss">
  .wrapper {
    max-width: 1000px;
    margin: auto;
  }

  header {
    display: flex;
    align-items: center;
    & > .save {
      margin-left: auto;
    }
  }

  main {
    display: flex;
    gap: 1em;
  }

  main > div,
  .save {
    border: 2px solid grey;
    border-radius: 4px;
    padding: 1em;
  }

  .timeline {
    display: grid;
    place-content: center;
  }

  .control {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1em;
    min-width: 300px;
  }

  button {
    border: 1px grey solid;
    border-radius: 3px;
  }
  .add,
  .remove {
    width: 22px;
    text-align: center;
    font-weight: bold;
  }
  .add {
    background: #a7d49b;
  }
  .remove {
    background: #dda15e;
  }
</style>
