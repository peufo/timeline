import { writable } from 'svelte/store'
import { browser } from '$app/environment'
import type { TimelineEventEditable, Control } from './types'

type StoreItem = {
  control: Control
  events: TimelineEventEditable[]
}

export const defaultStoreItem: StoreItem = {
  control: {
    colorPoint: '#999999',
    colorLine: '#bbbbbb',
    hasNext: true,
  },
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
