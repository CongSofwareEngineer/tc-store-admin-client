import React from 'react'
import { IModel, ISizeModel } from '../../type'
import useLanguage from '@/hook/useLanguage'
import { useModalAdmin } from '@/zustand/useModalAdmin'
import MyInput from '@/components/MyInput'
import { DeleteOutlined, DiffOutlined, PlusCircleOutlined } from '@ant-design/icons'
import ModalDelete from '@/components/ModalDelete'

type ISizeModelConfig = {
  value: IModel
  onChangeValue: (index: number, value: ISizeModel) => void
  onDelete: (index: number) => void
}
const SizeModelConfig = ({ value, onChangeValue, onDelete }: ISizeModelConfig) => {
  const { translate } = useLanguage()
  const { openModal } = useModalAdmin()

  const handleDelete = (index: number) => {
    openModal({
      body: <ModalDelete isModalAdmin callback={() => onDelete(index)} />,
      overClickClose: false,
      showBtnClose: false,
    })
  }
  return (
    <div>
      {value.sizes.map((size, index) => {
        return (
          <div key={`SizeModelConfig_${index}`} className='w-full flex   gap-3'>
            <div className='flex flex-col gap-1'>
              <div>Size</div>
              <MyInput
                type='number'
                value={size.size}
                onChange={(e) =>
                  onChangeValue(index, {
                    ...size,
                    size: Number(e?.toString()),
                  })
                }
              />
            </div>

            <div className='flex flex-col gap-1'>
              <div>{translate('textPopular.amount')}</div>
              <MyInput
                type='number'
                value={size.amount}
                onChange={(e) =>
                  onChangeValue(index, {
                    ...size,
                    amount: Number(e?.toString()),
                  })
                }
              />
            </div>
            <div className='flex flex-col gap-1'>
              <div className='opacity-0'>{translate('textPopular.amount')}</div>
              <div className='text-red-500 text-xl'>
                <DeleteOutlined onClick={() => handleDelete(index)} className='cursor-pointer' />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default SizeModelConfig
