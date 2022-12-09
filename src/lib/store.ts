import type { ComponentProps } from 'svelte'
import { writable } from 'svelte/store'
import type TimeLineEditable from '$lib/TimeLineEditable.svelte'
import { browser } from '$app/environment'

type StoreItem = ComponentProps<TimeLineEditable>

const defaultStyle = [
  '.dot {',
  '\tbackground: #999999;',
  '}',
  '',
  '.line {',
  '\tbackground: #bbbbbb;',
  '}',
  '',
  '.time {',
  '\tcolor: grey;',
  '}',
  '.title {',
  '\tcolor: green;',
  '}',
  '.detail {',
  '\tcolor: blue;',
  '}',
].join('\n')

export const defaultStoreItem: StoreItem = {
  hasNext: true,
  style: defaultStyle,
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
}

let itemKeyValue =
  (browser && localStorage.getItem('selected-key')) || 'default'

export const itemKey = writable<string>(itemKeyValue)
export const item = writable<StoreItem>(readItem(itemKeyValue))

item.subscribe((newItem) => saveItem(itemKeyValue, newItem))
itemKey.subscribe((key) => {
  if (!browser) return
  itemKeyValue = key
  localStorage.setItem('selected-key', key)
  item.set(readItem(key))
})

function saveItem(key: string, item: StoreItem) {
  if (!browser) return
  localStorage.setItem(`item-${key}`, JSON.stringify(item))
}

function readItem(key: string): StoreItem {
  if (!browser) return defaultStoreItem
  const item = localStorage.getItem(`item-${key}`)
  if (!item) return defaultStoreItem
  return JSON.parse(item)
}
