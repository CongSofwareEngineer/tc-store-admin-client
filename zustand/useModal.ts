import { devtools } from 'zustand/middleware'
import { create } from 'zustand'
import { INIT_ZUSTAND, TYPE_ZUSTAND, ZUSTAND } from '@/constant/zustand'

export type ModalData = TYPE_ZUSTAND[typeof ZUSTAND.Modal]

type ModalStoreState = { [ZUSTAND.Modal]: ModalData }

type ModalStoreActions = {
  openModal: (nextModal: ModalStoreState[ZUSTAND.Modal]) => void
  closeModal: () => void
}

type ModalStore = ModalStoreState & ModalStoreActions

const zustandModal = create<ModalStore>()(
  devtools(
    (set) => ({
      [ZUSTAND.Modal]: INIT_ZUSTAND[ZUSTAND.Modal],
      openModal: (param: ModalData) => set({ [ZUSTAND.Modal]: param }),
      closeModal: () => {
        set((pre) => ({
          [ZUSTAND.Modal]: {
            ...pre?.[ZUSTAND.Modal],
            content: null,
            open: false,
          },
        }))
      },
    }),
    {
      name: `zustand-${ZUSTAND.Modal}`,
      enabled: process.env.NEXT_PUBLIC_DISABLE_DEV === undefined,
    }
  )
)

export const useModal = () => {
  return zustandModal((state) => state)
}
