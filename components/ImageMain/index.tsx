import React from 'react'
import { detectImg } from '@/utils/functions'
import { cn } from '@/utils/tailwind'
import { Image } from 'antd'
import { IProduct } from '@/type'

type IImageMain = {
  model?: string
  listImage: IProduct['images']
  className?: string
}
const ImageMain = ({ model, listImage, className }: IImageMain) => {
  let img

  if (Array.isArray(listImage)) {
    if (model) {
      img = listImage?.find((img) => img.model === model)
    } else {
      img = listImage[0]
    }
  }

  return (
    <Image
      className={cn('!relative ', className)}
      alt={img?.url.toString() || ''}
      src={detectImg(img?.url.toString() || '')}
    />
  )
}

export default ImageMain
