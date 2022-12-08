<script lang="ts">
  import TimeLine from '$lib/TimeLine.svelte'
  import type { EventDescription } from '$lib/types'
  import { item, itemKey } from './store'

  let colorLine = '#bbbbbb'
  let hasNext = true

  const events: EventDescription[] = [
    {
      title: `Le charbon`,
      time: '1850',
      detail: `Le charbon devient la source d'énergie principal`,
    },
    {
      title: `Electricité`,
      time: '1885',
      detail: `Début de l'électricité`,
    },
  ]
</script>

<h2>TimeLine</h2>

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
    <TimeLine bind:events={$item.events} disableFormatTime {...$item.control} />
  </div>
</main>

<style>
  main {
    display: flex;
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
  }

  .control {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1em;
  }
</style>
