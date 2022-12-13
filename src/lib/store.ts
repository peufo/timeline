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
        time: 'hier',
        title: `J'ai fait`,
        detail: `Le charbon devient la source d'énergie principal`,
      },
      {
        time: `aujourd'hui`,
        title: `Je fait`,
        detail: `Plein de trucs j'éspère... mais tranquille`,
        subEvents: [
          {
            time: '10:00',
            title: 'Réveille',
            detail: 'Je sors de mon long sommeil',
          },
          {
            time: '12:00',
            title: 'Pauffinage de la timeline éditable',
          },
          {
            time: '14:00',
            title: 'Testes',
            detail: `La nouvelle fonctionnalité "Sous-timeline" fonctionne plutôt bien.\nMais forcé de constater que les boutons couvre régulièrement le titre.\nCe qui le rend chiant à éditer... `,
          },
        ],
      },
      {
        time: `demain`,
        title: `Je ferai`,
        detail: `Autre chose, parce que je suis aller assez loin dans le délire.`,
      },
    ],
  },
  {
    defaultKey: `timeline par défaut`,
    promptMessage: 'Nouvelle timeline',
  }
)

export const styleStore = createLocalStorage<string>('style', minimal, {
  defaultKey: 'minimal',
  promptMessage: 'Nouveau style',
})
const stylesModules = import.meta.glob('./templates/*.css', {
  import: 'default',
  as: 'raw',
})
loadTemplates()
async function loadTemplates() {
  for (const path in stylesModules) {
    const css = (await stylesModules[path]()) as string
    const name = path.replace('./templates/', '').replace('.css', '')
    styleStore.ensureItem(name, css)
  }
}
