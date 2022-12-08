<script lang="ts">
  import TimeLine from '$lib/TimeLine.svelte'
  import type { EventDescription } from '$lib/TimeLine.svelte'

  let colorPoint = '#999999'
  let colorLine = '#bbbbbb'
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
      <input type="color" bind:value={colorPoint} />
    </label>
    <label>
      Couleur des lignes
      <input type="color" bind:value={colorLine} />
    </label>
  </div>
  <div class="timeline">
    <TimeLine {events} disableFormatTime hasNext {colorPoint} {colorLine} />
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
    gap: 0.5em;
  }
</style>
