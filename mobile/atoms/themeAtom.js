import AsyncStorage from '@react-native-async-storage/async-storage';
import { atom, useAtom } from 'jotai';

const atomWithAsyncStorage = (key, initialValue) => {
  const baseAtom = atom(initialValue)
  baseAtom.onMount = (setValue) => {
    ;(async () => {
      const item = await AsyncStorage.getItem(key)
      setValue(JSON.parse(item))
    })()
  }
  const derivedAtom = atom(
    (get) => get(baseAtom),
    (get, set, update) => {
      const nextValue =
        typeof update === 'function' ? update(get(baseAtom)) : update
      set(baseAtom, nextValue)
      AsyncStorage.setItem(key, JSON.stringify(nextValue))
    }
  )
  return derivedAtom
}

export const themeAtom = atomWithAsyncStorage('theme', 'light')