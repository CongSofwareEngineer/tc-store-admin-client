import { TYPE_ZUSTAND, ZUSTAND } from '@/constant/zustand'

export type CategoryMenuData = TYPE_ZUSTAND[ZUSTAND.CategoryMenu]
export type UserDataData = TYPE_ZUSTAND[ZUSTAND.UserData]
export type ModalAdminData = TYPE_ZUSTAND[ZUSTAND.ModalAdmin]
export type ProvincesData = TYPE_ZUSTAND[ZUSTAND.Provinces]
export type LanguageData = TYPE_ZUSTAND[ZUSTAND.Language]

export type ZustandState = {
  [ZUSTAND.UserData]: UserDataData
  [ZUSTAND.ModalAdmin]: ModalAdminData
  [ZUSTAND.Provinces]: ProvincesData
}

export type ZustandActions = {
  setUserData: (nextUserData: UserDataData) => void
  resetUser: () => void
  loadUserDataLocal: () => void
  setModalAdmin: (nextModalAdmin: ModalAdminData) => void
  openModal: (nextModalAdmin: ModalAdminData) => void
  closeModal: () => void
  setProvinces: (nextProvinces: ProvincesData) => void
  fetchDataProvinces: () => Promise<void>
}

export type ZustandStorageState = {
  [ZUSTAND.CategoryMenu]: CategoryMenuData
  [ZUSTAND.Language]: LanguageData
}

export type ZustandStorageActions = {
  setCategoryMenu: (nextCategoryMenu: CategoryMenuData) => void
  fetchDataCategoryMenu: () => Promise<void>
  setLanguage: (nextLanguage: LanguageData) => void
}

export type ZustandStore = ZustandState & ZustandActions
export type ZustandStoreStorage = ZustandStorageState & ZustandStorageActions
