import React from 'react'
import { INewProduct } from '../../type'
import { useModalAdmin } from '@/zustand/useModalAdmin'
import { cloneData } from '@/utils/functions'
import ModalDelete from '@/components/ModalDelete'
import MyCollapse from '@/components/MyCollapse'
import useLanguage from '@/hook/useLanguage'
import MyInput from '@/components/MyInput'
import { DeleteOutlined } from '@ant-design/icons'
import { Button } from 'antd'
type IAttributes = {
  data: INewProduct['attributes']
  onChange: (data: INewProduct['attributes']) => void
}
const Attributes = ({ onChange, data }: IAttributes) => {
  const { openModal } = useModalAdmin()
  const { translate } = useLanguage()

  const onDelete = (index: number) => {
    const callback = () => {
      const dataClone = cloneData(data)?.filter((_: any, indexFilter) => indexFilter !== index)
      onChange(dataClone)
    }
    openModal({
      body: <ModalDelete isModalAdmin callback={callback} />,
      overClickClose: false,
      showBtnClose: false,
    })
  }

  const onChangeKey = (index: number, value: string) => {
    const dataClone = cloneData(data)!
    dataClone[index].key = value
    onChange(dataClone)
  }

  const onChangeValue = (index: number, value: string) => {
    const dataClone = cloneData(data)!
    dataClone[index].value = value.split(',')
    onChange(dataClone)
  }

  const onAddNew = () => {
    const dataClone = cloneData(data)!
    dataClone.push({
      key: 'new',
      value: [],
    })
    onChange(dataClone)
  }

  const items = [
    {
      key: 'Attribute',
      label: <div>{'Attribute'} </div>,
      children: (
        <div className='flex p-5 flex-col gap-2 w-full'>
          {data?.map((e, index) => {
            return (
              <div key={`attribute-${index}`} className='flex gap-3 overflow-x-auto pb-2'>
                <div className='flex flex-col gap-1 md:min-w-[150px]'>
                  <div>{translate('header.name')}</div>
                  <MyInput
                    value={e.key}
                    onChangeText={(e) => onChangeKey(index, e.toString())}
                    className='!w-full'
                  />
                </div>
                <div className='flex flex-col gap-1 md:min-w-[150px]'>
                  <div>value</div>
                  <MyInput
                    value={e.value.join(',')}
                    onChangeText={(e) => onChangeValue(index, e.toString())}
                    className='!w-full'
                  />
                </div>
                <div className='flex flex-col gap-1 '>
                  <div className='opacity-0'>value</div>
                  <div className='text-red-500 text-xl'>
                    <DeleteOutlined onClick={() => onDelete(index)} className='cursor-pointer' />
                  </div>
                </div>
              </div>
            )
          })}
          <Button className='!w-[150px] mt-2' onClick={onAddNew}>
            {translate('common.addNew')}
          </Button>
        </div>
      ),
    },
  ]
  return <MyCollapse items={items} />
}

export default Attributes
