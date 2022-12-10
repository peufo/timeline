import { writable } from 'svelte/store'
import { browser } from '$app/environment'

export function createLocalStorage<T = unknown>(
  prefix: string,
  defaultValue: T
) {
  let keyValue = readKey()

  const key = writable<string>(keyValue)
  const item = writable<T>(readItem(keyValue))
  const keys = writable<string[]>(
    Object.keys(browser ? localStorage : {})
      .filter((k) => k.startsWith(`${prefix}-`))
      .map((key) => key.replace(`${prefix}-`, ''))
  )

  function readKey() {
    if (!browser) return 'default'
    return localStorage.getItem(`key-${prefix}`) || 'default'
  }

  function writeKey(value: string) {
    if (!browser) return
    keyValue = value
    localStorage.setItem(`key-${prefix}`, value)
  }

  function writeItem(key: string, item: T) {
    if (!browser) return
    localStorage.setItem(`${prefix}-${key}`, JSON.stringify(item))
  }

  function readItem(key: string): T {
    if (!browser) return defaultValue
    const item = localStorage.getItem(`${prefix}-${key}`)
    if (!item) return defaultValue
    return JSON.parse(item)
  }

  item.subscribe((newItem) => writeItem(keyValue, newItem))
  key.subscribe((key) => {
    writeKey(key)
    item.set(readItem(key))
  })

  function addItem() {
    keys.update((_keys) => {
      const defaultKeyValue = `save-${_keys.length}`
      const newKeyValue =
        prompt('Nom de la sauvegarde', defaultKeyValue) || defaultKeyValue
      key.set(newKeyValue)
      return [..._keys, newKeyValue]
    })
  }
  function deleteItem() {
    if (!confirm('Ètes-vous sûr ?')) return
    key.update((_key) => {
      keys.update((_keys) => {
        const index = _keys.indexOf(_key)
        localStorage.removeItem(`${prefix}-${_key}`)
        return [..._keys.slice(0, index), ..._keys.slice(index + 1)]
      })
      return 'default'
    })
  }

  return {
    item,
    key,
    keys,
    addItem,
    deleteItem,
  }
}
