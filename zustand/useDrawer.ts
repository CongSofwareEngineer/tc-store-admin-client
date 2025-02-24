import { devtools } from 'zustand/middleware'
import { create } from 'zustand'
import { INIT_ZUSTAND, TYPE_ZUSTAND, ZUSTAND } from '@/constant/zustand'

export type DrawerData = TYPE_ZUSTAND[ZUSTAND.Drawer]

type DrawerStoreState = { [ZUSTAND.Drawer]: DrawerData }

type DrawerStoreActions = {
  openDrawer: (nextDrawer: DrawerStoreState[ZUSTAND.Drawer]) => void
  closeDrawer: () => void
}

type DrawerStore = DrawerStoreState & DrawerStoreActions

const zustandDrawer = create<DrawerStore>()(
  devtools(
    (set) => ({
      [ZUSTAND.Drawer]: INIT_ZUSTAND[ZUSTAND.Drawer],
      openDrawer: (param: DrawerData) => set({ [ZUSTAND.Drawer]: param }),
      closeDrawer: () =>
        set((state) => {
          if (state[ZUSTAND.Drawer]?.afterClose) {
            state[ZUSTAND.Drawer].afterClose()
          }
          return {
            [ZUSTAND.Drawer]: {
              content: null,
              placement: state[ZUSTAND.Drawer].placement,
              width: state[ZUSTAND.Drawer].width,
              height: state[ZUSTAND.Drawer].height,
              open: false,
            },
          }
        }),
    }),
    {
      name: `zustand-${ZUSTAND.Drawer}`,
      enabled: process.env.NEXT_PUBLIC_DISABLE_DEV === undefined,
    }
  )
)

export const useDrawer = () => {
  return zustandDrawer((state) => state)
}
