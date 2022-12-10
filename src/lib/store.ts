import type { ComponentProps } from 'svelte'
import type TimeLineEditable from './TimeLineEditable.svelte'
import { createLocalStorage } from '$lib/localstorage'

const templatesModules = import.meta.glob('./templates/*.css', {
  import: 'default',
})

initTemplates()
async function initTemplates() {
  for (const path in templatesModules) {
    const css = await templatesModules[path]()
    const name = path.replace('./templates/', '').replace('.css', '')
    console.log(name, css)
  }
}

type TimeLineProps = ComponentProps<TimeLineEditable>

const defaultStyle = `.dot {
	background: #999999;
}

.line {
	background: #bbbbbb;
}

.time {
	font-style: oblique;
}

.title {
	text-transform: uppercase;
}

.detail {
	color: #555;
	font-size: small;
}`

const defaultEvent = [
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

export const defaultTimeline: TimeLineProps = {
  hasNext: true,
  style: defaultStyle,
  events: defaultEvent,
}

export const timelineStore = createLocalStorage<TimeLineProps>(
  'timeline',
  defaultTimeline
)
