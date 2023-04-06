<script lang="ts">
  import { toBlob } from 'html-to-image'
  import { page } from '$app/stores'
  import { getNotificationsContext } from 'svelte-notifications'

  import { timelineStore, styleStore } from '$lib/store'

  export let elem: HTMLElement

  const { addNotification } = getNotificationsContext()

  async function capture() {
    try {
      if (location.protocol !== 'https:')
        throw new Error('Secure context required (https://)')
      const blob = await toBlob(elem)
      if (!blob) throw new Error("L'image n'a pas pu être généré")
      const data = [new window.ClipboardItem({ 'image/png': blob })]
      await navigator.clipboard.write(data)
      addNotification({
        type: 'success',
        text: 'Timeline copiée dans le presse papier !',
        position: 'bottom-right',
        removeAfter: 3000,
      })
    } catch (error: any) {
      console.error(error)
      addNotification({
        type: 'error',
        text: error.message || 'Erreur',
        position: 'bottom-right',
        removeAfter: 3000,
      })
    }
  }

  async function copyLink() {
    try {
      const save = {
        timeline: timelineStore.toJSON(),
        style: styleStore.toJSON(),
      }
      const { origin, pathname } = $page.url
      const query = new URLSearchParams()
      query.append('save', JSON.stringify(save))
      const url = `${origin}${pathname}?${query.toString()}`
      await navigator.clipboard.writeText(url)
      addNotification({
        type: 'success',
        text: 'Lien copié dans le presse papier !',
        position: 'bottom-right',
        removeAfter: 3000,
      })
    } catch (error: any) {
      console.error(error)
      addNotification({
        type: 'error',
        text: error.message || 'Erreur',
        position: 'bottom-right',
        removeAfter: 3000,
      })
    }
  }
</script>

<button on:click={copyLink} style="margin-right: 1em;">Copier le lien</button>
<button on:click={capture}>Capturer une image</button>

<style>
  button {
    padding: 0.5em 1em;
    text-transform: uppercase;
  }
</style>
