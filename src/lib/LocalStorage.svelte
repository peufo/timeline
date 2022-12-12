<script lang="ts">
  import '$lib/assets/index.css'
  import type { createLocalStorage } from '$lib/localstorage'

  type Type = $$Generic

  export let store: ReturnType<typeof createLocalStorage<Type>>
  export let style = ''

  const key = store.key
  const keys = store.keys
</script>

<div class="container" {style}>
  <select bind:value={$key} title="Sélectioner une sauvegarde">
    {#each $keys as key}
      <option value={key}>{key}</option>
    {/each}
  </select>

  <button
    class="add"
    title="Ajouter une sauvegarde"
    on:click={() => store.createItem()}
  >
    +
  </button>
  <button
    class="remove"
    title="Supprimer la sauvegarde"
    on:click={() => store.deleteItem()}
  >
    -
  </button>
</div>

<style lang="scss">
  .container {
    background-color: #fff;
    border-left: 2px solid grey;
    border-top: 2px solid grey;
    border-right: 2px solid grey;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    padding: 4px;
  }
</style>
