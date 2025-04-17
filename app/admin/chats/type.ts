export type IInfoChat = {
  date?: number
  content: string
  isAdmin?: boolean
  isSeen?: boolean
  key?: string
  [key: string]: unknown
}

export type IContentChat = { [key: string | number]: IInfoChat }

export type IItemChat = {
  key: string
  content: IContentChat
  date: number
}

export type IChatRes = {
  [key: string]: IInfoChat | string | number
}
