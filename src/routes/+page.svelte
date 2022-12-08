<script lang="ts">
  import TimeLine from '$lib/TimeLine.svelte'
  import type { EventDescription } from '$lib/TimeLine.svelte'

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

<h2>TimeLine component test</h2>

<main>
  <TimeLine {events} disableFormatTime hasNext />
</main>

<style>
  main {
    display: grid;
    place-content: center;
  }
</style>
