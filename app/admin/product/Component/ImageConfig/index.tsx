import React, { useMemo } from 'react'
import { INewProduct } from '../../type'
import MySelect, { PropsSelectItem } from '@/components/MySelect'
import MyImage from '@/components/MyImage'
import { cloneData } from '@/utils/functions'
import { CloseCircleOutlined } from '@ant-design/icons'

type IImageConfig = {
  data: INewProduct
  onChange: (value: INewProduct['images']) => void
}
const ImageConfig = ({ data, onChange }: IImageConfig) => {
  const optionModel: PropsSelectItem[] = useMemo(() => {
    const optionsTemp = data.models.map((model) => {
      const itemSelect: PropsSelectItem = {
        label: model.name,
        value: model.model,
      }
      return itemSelect
    })
    return optionsTemp
  }, [data.models])

  const onChangeModel = (index: number, model: string) => {
    const dataClone: INewProduct['images'] = cloneData(data.images)
    dataClone[index].model = model
    onChange(dataClone)
  }

  const onDelete = (index: number) => {
    let dataClone: INewProduct['images'] = cloneData(data.images)
    dataClone = dataClone.filter((_: any, indexFilter) => indexFilter !== index)
    onChange(dataClone)
  }

  return (
    <div>
      {data?.images?.map((img, index) => {
        return (
          <div key={`image_${index}`} className='flex gap-2 flex-wrap w-full'>
            <div className='md:min-w-[100px] w-[80px] md:min-h-[100px] h-[80px] relative'>
              <MyImage alt='img' src={img.url?.base64 || img.url} className='!w-full !h-full ' />
              <CloseCircleOutlined
                onClick={() => onDelete(index)}
                className='absolute right-0 top-0 text-[18px] cursor-pointer '
              />
            </div>
            <MySelect
              option={optionModel}
              value={img?.model}
              onChange={(model) => onChangeModel(index, model)}
            />
          </div>
        )
      })}
    </div>
  )
}

export default ImageConfig
