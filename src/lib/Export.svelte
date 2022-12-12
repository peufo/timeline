<script lang="ts">
  import { toBlob } from 'html-to-image'
  import { getNotificationsContext } from 'svelte-notifications'

  export let elem: HTMLElement

  const { addNotification } = getNotificationsContext()

  async function capture() {
    try {
      if (location.protocol !== 'https:')
        throw new Error('Secure context required (https://)')
      const blob = await toBlob(elem)
      if (!blob) throw new Error("L'image n'a pas pu être généré")
      const data = [new window.ClipboardItem({ 'image/pngs': blob })]s
      await navigator.clipboard.write(data)
      addNotification({
        type: 'success',
        text: 'Timeline copier dans le presse papier !',
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

<button on:click={capture}>Capturer</button>
