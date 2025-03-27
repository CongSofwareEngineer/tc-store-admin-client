import { devtools, persist } from 'zustand/middleware'
import { createStore } from 'zustand'
import { INIT_ZUSTAND, TYPE_ZUSTAND, ZUSTAND } from '@/constant/zustand'
import secureLocalStorage from 'react-secure-storage'
import { decryptData } from '@/utils/crypto'

type UserDataStoreState = { [ZUSTAND.UserData]: TYPE_ZUSTAND[ZUSTAND.UserData] }

type UserDataStoreActions = {
  setUserData: (nextUserData: UserDataStoreState[ZUSTAND.UserData]) => void
  reset: () => void
}

type UserDataStore = UserDataStoreState & UserDataStoreActions

const zustandUserData = createStore<UserDataStore>()(
  devtools(
    persist(
      (set) => ({
        [ZUSTAND.UserData]: INIT_ZUSTAND[ZUSTAND.UserData],
        setUserData: (user: TYPE_ZUSTAND[ZUSTAND.UserData]) => set({ [ZUSTAND.UserData]: user }),
        reset: () => set({ [ZUSTAND.UserData]: INIT_ZUSTAND[ZUSTAND.UserData] }),
      }),
      {
        name: `zustand-${ZUSTAND.UserData}`,
        storage: {
          getItem: () => {
            const dataSecure = secureLocalStorage.getItem(ZUSTAND.UserData)
            if (dataSecure) {
              const dataDecode = decryptData(dataSecure.toString())
              const userData: TYPE_ZUSTAND[ZUSTAND.UserData] = JSON.parse(dataDecode)
              if (window.location.pathname !== '/') {
              }
              console.log('====================================')
              console.log({ pathname: window.location.pathname })
              console.log('====================================')
              return {
                state: {
                  userData: JSON.parse(dataDecode),
                },
              }
            }
            return null
          },
          removeItem: () => null,
          setItem: () => null,
        },
        merge: (preState: any, currentState: UserDataStore) => {
          if (preState?.userData) {
            currentState[ZUSTAND.UserData] = preState?.userData
          }

          return currentState
        },
      }
    ),
    {
      name: `zustand-${ZUSTAND.UserData}`,
      enabled: process.env.NEXT_PUBLIC_ENV !== 'production',
    }
  )
)

export const useUserData = () => {
  return zustandUserData.getState()
}
