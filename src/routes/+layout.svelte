<script lang="ts">
  import Notifications from 'svelte-notifications'
</script>

<Notifications>
  <div class="layout">
    <header>
      <h2>Timeline éditable</h2>
    </header>
    <main>
      <slot />
    </main>
    <footer>
      <div>Vite fait pour Marie ❤️</div>
      <div>
        <a href="https://github.com/peufo/timeline">Voir le code sources </a>
      </div>
    </footer>
  </div>
</Notifications>

<style>
  .layout {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    gap: 3em;
  }

  main {
    flex-grow: 1;
  }

  header,
  footer {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #eee;
  }

  footer {
    padding: 1em;
    gap: 3em;
  }
</style>
