import type { ComponentProps } from 'svelte'
import type TimeLineEditable from '$lib/TimeLineEditable.svelte'
import minimal from '$lib/templates/minimal.css?raw'
import { createLocalStorage } from '$lib/localstorage'

type TimeLineProps = ComponentProps<TimeLineEditable>
export const timelineStore = createLocalStorage<TimeLineProps>(
  'timeline',

  {
    hasNext: true,
    events: [
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
    ],
  },
  {
    defaultKey: `L'énergie`,
    promptMessage: 'Nouvelle timeline',
  }
)

export const styleStore = createLocalStorage<string>('style', minimal, {
  defaultKey: 'Minimal',
  promptMessage: 'Nouveau style',
})
const stylesModules = import.meta.glob('./templates/*.css', {
  import: 'default',
})
loadTemplates()
async function loadTemplates() {
  for (const path in stylesModules) {
    const css = await stylesModules[path]()
    const name = path.replace('./templates/', '').replace('.css', '')
    // console.log(name, css)
  }
}
