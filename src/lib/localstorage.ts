import { writable } from 'svelte/store'
import { browser } from '$app/environment'

interface CreateLocalStorageOptions {
  defaultKey?: string
  promptMessage?: string
}

export function createLocalStorage<T = unknown>(
  prefix: string,
  defaultValue: T,
  {
    defaultKey = 'default',
    promptMessage = 'New save',
  }: CreateLocalStorageOptions = {}
) {
  let keyValue = readKey()

  const key = writable<string>(keyValue)
  const keys = writable<string[]>(getKeys())
  const item = writable<T>(readItem(keyValue))

  key.subscribe((_key) => {
    writeKey(_key)
    item.set(readItem(_key))
  })
  item.subscribe((_item) => writeItem(keyValue, _item))

  function valueOf<Type = unknown>(
    store: ReturnType<typeof writable<Type>>
  ): Type {
    let value: Type | null = null
    store.update((v) => {
      value = v
      return v
    })
    return value as Type
  }

  function getKeys() {
    return Object.keys(browser ? localStorage : {})
      .filter((k) => k.startsWith(`${prefix}-`))
      .map((key) => key.replace(`${prefix}-`, ''))
  }

  function readKey() {
    if (!browser) return defaultKey
    return localStorage.getItem(`key-${prefix}`) || defaultKey
  }

  function writeKey(value: string) {
    if (!browser) return
    keyValue = value
    localStorage.setItem(`key-${prefix}`, value)
  }

  function readItem(key: string): T {
    if (!browser) return defaultValue
    const item = localStorage.getItem(`${prefix}-${key}`)
    if (item) return JSON.parse(item)
    keys.update((_keys) => (_keys.includes(key) ? _keys : [..._keys, key]))
    return defaultValue
  }

  function writeItem(key: string, item: T) {
    if (!browser) return
    localStorage.setItem(`${prefix}-${key}`, JSON.stringify(item))
  }

  function createItem() {
    keys.update((_keys) => {
      const defaultKeyValue = `${prefix}-${_keys.length}`
      const newKeyValue = prompt(promptMessage, defaultKeyValue)
      if (!newKeyValue) return _keys
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
      return defaultKey
    })
  }

  function itemExist(_key: string) {
    const existingItem = localStorage.getItem(`${prefix}-${_key}`)
    return !!existingItem
  }

  /** Ensure the exitence of an item */
  function ensureItem(_key: string, item: T) {
    if (!browser || itemExist(_key)) return
    writeItem(_key, item)
    keys.update((_keys) => [..._keys, _key])
  }

  /** Return a json of key and selected item */
  function toJSON() {
    return {
      key: valueOf(key),
      item: valueOf(item),
    }
  }

  return {
    item,
    key,
    keys,
    createItem,
    itemExist,
    ensureItem,
    deleteItem,
    toJSON,
  }
}
