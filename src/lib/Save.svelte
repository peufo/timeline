<script lang="ts">
  import '$lib/assets/index.css'
  import { timelineStore } from '$lib/store'

  const timelineKey = timelineStore.key
  const timelineKeys = timelineStore.keys
</script>

<div class="save">
  <label title="Sélectioner une sauvegarde">
    Timeline:
    <select bind:value={$timelineKey}>
      {#each $timelineKeys as key}
        <option value={key}>{key}</option>
      {/each}
    </select>
  </label>

  <button
    class="add"
    title="Ajouter une sauvegarde"
    on:click={() => timelineStore.addItem()}
  >
    +
  </button>
  <button
    class="remove"
    title="Supprimer la sauvegarde"
    on:click={() => timelineStore.deleteItem()}
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
