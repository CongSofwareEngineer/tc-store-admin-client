import { persist, devtools, StorageValue } from 'zustand/middleware'
import MessageVN from '@/public/assets/language/vn.json'
// import MessageEN from '@/public/assets/language/en.json'

import { createStore } from 'zustand'

import { ZUSTAND } from '@/constant/zustand'
import { LANGUAGE_SUPPORT } from '@/constant/app'
import { removeDataLocal, saveDataLocal } from '@/utils/functions'

type LanguageStoreState = { [ZUSTAND.Language]: { locale: string; messages: any } }
type LanguageStoreActions = {
  setLanguage: (language: LANGUAGE_SUPPORT) => void
}

type LanguageStore = LanguageStoreState & LanguageStoreActions
const nameZustand = `zustand-${ZUSTAND.Language}`
export const zustandLanguage = createStore<LanguageStore>()(
  devtools(
    persist(
      (set) => ({
        [ZUSTAND.Language]: {
          locale: LANGUAGE_SUPPORT.VN,
          messages: MessageVN,
        },
        setLanguage: (language: LANGUAGE_SUPPORT) => {
          if (language === LANGUAGE_SUPPORT.EN) {
            set({
              [ZUSTAND.Language]: {
                locale: LANGUAGE_SUPPORT.EN,
                messages: MessageVN,
              },
            })
          } else {
            set({
              [ZUSTAND.Language]: {
                locale: LANGUAGE_SUPPORT.VN,
                messages: MessageVN,
              },
            })
          }
        },
      }),
      {
        name: nameZustand,
        storage: {
          setItem: (name = nameZustand, value: StorageValue<LanguageStore>) => {
            saveDataLocal(name, value.state[ZUSTAND.Language].locale)
          },
          getItem: () => null,
          removeItem: () => removeDataLocal(nameZustand),
        },
        merge: (_: unknown, currentState: LanguageStore) => {
          // const local = getDataLocal(nameZustand)
          // if (!local || local === LANGUAGE_SUPPORT.VN) {
          //   currentState[ZUSTAND.Language].locale = LANGUAGE_SUPPORT.VN
          //   currentState[ZUSTAND.Language].messages = MessageVN
          // } else {
          //   currentState[ZUSTAND.Language].locale = LANGUAGE_SUPPORT.EN
          //   currentState[ZUSTAND.Language].messages = MessageEN
          // }

          return currentState
        },
      }
    ),
    {
      name: nameZustand,
      enabled: process.env.NEXT_PUBLIC_DISABLE_DEV === undefined,
    }
  )
)

export const useLanguage = () => {
  return zustandLanguage.getState()
}
