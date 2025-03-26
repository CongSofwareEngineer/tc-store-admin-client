import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { IModel, ISizeModel } from '../../type'
import { COLOR_CONFIG } from '@/constant/app'
import { Button, Collapse } from 'antd'
import useLanguage from '@/hook/useLanguage'
import { useModalAdmin } from '@/zustand/useModalAdmin'
import { cloneData } from '@/utils/functions'
import MyCollapse, { ItemCollapseProps } from '@/components/MyCollapse'
import SizeModelConfig from '../SizeModelConfig'
import MyInput from '@/components/MyInput'
import { DeleteOutlined, DiffOutlined, PlusCircleOutlined } from '@ant-design/icons'
import ModalDelete from '@/components/ModalDelete'
export type TypeHandle = 'add' | 'update' | 'delete'
export type TypeValue = 'arr' | 'object' | 'string'
export type IAttributeAdminProps = {
  data: IModel[]
  onChange: (param: IModel[]) => void
}

const CollapseCustom = styled(Collapse)`
  border: 1px solid ${COLOR_CONFIG['gray-5']} !important;
  overflow: hidden;
  .ant-collapse-header {
    background-color: #fbfbfb;
  }
  .ant-collapse-content {
    padding: 12px;
  }
  .ant-collapse-item {
    border-bottom: 0px !important;
  }
`

const ModelConfig = ({ data, onChange }: IAttributeAdminProps) => {
  const { translate } = useLanguage()
  const { openModal } = useModalAdmin()

  const handleAddNewData = () => {
    const models: IModel[] = cloneData(data)
    models.push({
      model: `model_` + models.length,
      name: `name ` + models.length,
      sizes: [
        {
          amount: 100,
          size: 0,
          sold: 0,
        },
      ],
    })
    onChange(models)
  }

  const onDouble = (index: number) => {
    const dataClone: IModel[] = cloneData(data)
    const indexLast = dataClone.length

    dataClone[indexLast] = cloneData(dataClone[index])

    dataClone[indexLast].model = `model_${indexLast}`
    dataClone[indexLast].name = dataClone[index].name + '-new'

    onChange(dataClone)
  }

  const onAddSizeModel = (index: number) => {
    const dataClone: IModel[] = cloneData(data)
    dataClone[index].sizes.push({
      size: 0,
      amount: 100,
      sold: 0,
    })
    onChange(dataClone)
  }

  const onDeleteModels = (index: number) => {
    const callback = () => {
      let dataClone: IModel[] = cloneData(data)
      dataClone = dataClone.filter((_, indexFilter) => indexFilter !== index)
      onChange(dataClone)
    }
    openModal({
      body: <ModalDelete isModalAdmin callback={callback} />,
      overClickClose: false,
      showBtnClose: false,
    })
  }

  const onChangeNameModel = (index: number, name: string) => {
    const dataClone: IModel[] = cloneData(data)
    dataClone[index].name = name
    onChange(dataClone)
  }

  const onChangeValueModel = (indexParent: number, index: number, value: ISizeModel) => {
    const dataClone: IModel[] = cloneData(data)
    dataClone[indexParent].sizes[index] = value
    onChange(dataClone)
  }
  const onDeleteValueModel = (indexParent: number, index: number) => {
    const dataClone: IModel[] = cloneData(data)
    dataClone[indexParent].sizes = dataClone[indexParent].sizes.filter(
      (_: any, indexFilter) => indexFilter !== index
    )

    onChange(dataClone)
  }

  const items = [
    {
      key: 'Attribute',
      label: <div>{'Model'} </div>,
      children: (
        <div className='flex flex-col gap-2'>
          {data.map((e, index) => {
            const items: ItemCollapseProps = [
              {
                key: 'mode-' + e.model,
                label: e.name,
                children: (
                  <div className='flex flex-col gap-2 w-full'>
                    <div>{translate('header.name')}</div>
                    <div className='flex items-center gap-3'>
                      <MyInput
                        value={e.name}
                        className='!w-[200px]'
                        onChangeText={(name) => onChangeNameModel(index, name.toString())}
                      />
                      <div className='text-green-600 text-xl'>
                        <PlusCircleOutlined
                          onClick={() => onAddSizeModel(index)}
                          className='cursor-pointer'
                        />
                      </div>
                      <div className='text-xl text-green-600'>
                        <DiffOutlined onClick={() => onDouble(index)} className='cursor-pointer' />
                      </div>
                      <div className='text-red-500 text-xl'>
                        <DeleteOutlined
                          onClick={() => onDeleteModels(index)}
                          className='cursor-pointer'
                        />
                      </div>
                    </div>

                    <SizeModelConfig
                      value={e}
                      onChangeValue={(indexChi, value) =>
                        onChangeValueModel(index, indexChi, value)
                      }
                      onDelete={(indexChi) => onDeleteValueModel(index, indexChi)}
                    />
                  </div>
                ),
              },
            ]
            return (
              <MyCollapse key={`item-models-${index}`} items={items} className='!bg-[#f3efef]' />
            )
          })}
          <div className='flex gap-3 w-[300px] mt-2'>
            <div className='flex flex-1'>
              <Button onClick={handleAddNewData} className='flex-1'>
                Add new
              </Button>
            </div>
            {/* <div className='flex flex-1'>
               <Button type='primary' className='flex-1'>
                 {translate('common.delete')}
               </Button>
             </div> */}
          </div>
        </div>
      ),
    },
  ]

  return (
    <div className='flex flex-col gap-2 w-full'>
      <CollapseCustom items={items} />
    </div>
  )
}

export default ModelConfig
