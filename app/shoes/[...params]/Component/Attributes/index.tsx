import React, { useMemo } from 'react'
import { ItemDetailType } from '../../type'
import { Checkbox, Select } from 'antd'
import useLanguage from '@/hook/useLanguage'
import { cloneData } from '@/utils/functions'

type IAttributes = {
  data: ItemDetailType
  onChange?: (param?: any) => void
}
const Attributes = ({ data, onChange = () => {} }: IAttributes) => {
  const { translate } = useLanguage()
  const configBill = data?.configBill
  const optionSizes: number[] = useMemo(() => {
    const listSize = data?.attributes.sizes.map((e: any) => {
      return Number(e.size)
    })
    return listSize
  }, [data])

  const onChangeKeyData = (value: number) => {
    const dataClone = cloneData(data)
    const dataSizes = data?.attributes?.sizes.find((e: any) => Number(e.size) === Number(value))
    dataClone.configBill.size = value
    const colors = dataSizes.colors.find((e: any) => Number(e.amount) > 0)

    dataClone.configBill.color = colors?.color || 'no'
    onChange(dataClone)
  }

  const onChangeValueData = (value: string) => {
    const dataClone = cloneData(data)
    dataClone.configBill.color = value
    onChange(dataClone)
  }

  const renderListColors = () => {
    if (!configBill) {
      return <></>
    }

    const listColor = data?.attributes?.sizes.find((e: any) => {
      return Number(configBill.size) === Number(e.size)
    })

    return (
      <div className='flex flex-col gap-1'>
        <div>{translate('textPopular.color')}:</div>
        <div className='flex flex-wrap gap-3'>
          {listColor?.colors.map((e: any, index: number) => {
            const keyLocal: any = `admin.color.${e.color}`
            return (
              <div key={`color-${index}`} className='flex items-center'>
                <Checkbox
                  disabled={Number(e.amount) === 0}
                  onChange={() => onChangeValueData(e.color)}
                  checked={configBill.color === e.color}
                >
                  {translate(keyLocal) || e.color}
                </Checkbox>
                {Number(e.amount) === 0 && <span className='text-red-600 text-sm'>(Hết hàng)</span>}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
  return (
    <div className='flex flex-col md:gap-3 gap-2'>
      <div className='flex flex-col gap-1'>
        <div>Size :</div>
        <div className='flex gap-2 items-center'>
          <Select
            value={Number(data?.configBill?.size)}
            className='w-[100px]'
            onChange={(e) => onChangeKeyData(e)}
            options={optionSizes.map((e) => {
              return {
                label: e,
                value: e,
              }
            })}
          />
        </div>
      </div>
      {renderListColors()}
    </div>
  )
}

export default Attributes
