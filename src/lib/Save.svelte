<script lang="ts">
  import { browser } from '$app/environment'

  import '$lib/assets/index.css'

  import { item, itemKey, defaultStoreItem } from '$lib/store'

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
    if (!confirm('Ètes-vous sûr ?')) return
    if ($itemKey === 'default') {
      $item = JSON.parse(JSON.stringify(defaultStoreItem))
      return
    }
    const index = itemKeys.indexOf($itemKey)
    itemKeys = [...itemKeys.slice(0, index), ...itemKeys.slice(index + 1)]
    localStorage.removeItem(`item-${$itemKey}`)
    $itemKey = 'default'
  }
</script>

<div class="save">
  <label title="Sélectioner une sauvegarde">
    Sauvegarde:
    <select bind:value={$itemKey}>
      {#each itemKeys as key}
        <option value={key}>{key}</option>
      {/each}
    </select>
  </label>

  <button class="add" title="Ajouter une sauvegarde" on:click={handleAddSave}>
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

<style lang="scss">
  .save {
    background-color: #eee;
    margin-left: auto;
    border: 2px solid grey;
    border-radius: 4px;
    padding: 1em;
  }
</style>
