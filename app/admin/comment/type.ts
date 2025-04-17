import { IImgUpload } from '@/components/UploadImg'

export type IItemReply = {
  note: string
  like: number
  date: string
  listImg?: Array<IImgUpload | string>
}
