import React, { useEffect, useState } from 'react'
import { cloneData } from '@/utils/functions'
import styled from 'styled-components'
import { Button, Collapse } from 'antd'
import { COLOR_CONFIG } from '@/constant/app'
import { TYPE_PRODUCT } from '@/constant/admin'
import AttributeShoes from './Shoes'
import useLanguage from '@/hook/useLanguage'
import OptionAddNew from './OptionAddNew'
import { useModalAdmin } from '@/zustand/useModalAdmin'

export type TypeHandle = 'add' | 'update' | 'delete'
export type TypeValue = 'arr' | 'object' | 'string'
export type IAttributeAdminProps = {
  data: any
  onChange: (type: TypeHandle, param?: any) => void
  typeProduct?: string
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
const AttributeAdmin = ({ data, onChange, typeProduct = 'shoes' }: IAttributeAdminProps) => {
  const { translate } = useLanguage()
  const { openModal } = useModalAdmin()
  const [dataAttributes, setDataAttributes] = useState<any[]>([])

  useEffect(() => {
    const listTemp: any[] = []
    Object.entries(data).forEach(([key, value]: any[]) => {
      listTemp.push({
        key,
        value,
      })
    })
    setDataAttributes(listTemp)
  }, [data])

  const convertArrToStringValue = (params: any[]) => {
    const objTemp: any = {}
    params.forEach((e) => {
      objTemp[e.key] = e.value
    })

    onChange(objTemp)
  }

  const onChangeValueData = (index: number, params: any) => {
    let dataAttributeClone = cloneData(dataAttributes)
    if (params) {
      dataAttributeClone[index] = params
      setDataAttributes(dataAttributeClone)
      convertArrToStringValue(dataAttributeClone)
    } else {
      dataAttributeClone = dataAttributeClone.filter((_: any, indexFilter: number) => {
        return indexFilter !== index
      })

      setDataAttributes(dataAttributeClone)
      convertArrToStringValue(dataAttributeClone)
    }
  }

  const handleAddNewData = () => {
    const callBack = (type: 1 | 2 = 1) => {
      const dataAttributeClone = cloneData(dataAttributes)
      const newData: any = {}
      console.log({ type })

      if (type === 2) {
        switch (typeProduct) {
          case TYPE_PRODUCT.shoes:
            newData.key = `newKey${dataAttributeClone.length}`
            newData.value = [
              {
                size: '38',
                model: [],
              },
            ]
            break
        }
      } else {
        switch (typeProduct) {
          case TYPE_PRODUCT.shoes:
            newData.key = `newKey${dataAttributeClone.length}`
            newData.value = []
            break
        }
      }

      dataAttributeClone.push(newData)
      setDataAttributes(dataAttributeClone)
      convertArrToStringValue(dataAttributeClone)
    }

    openModal({
      body: <OptionAddNew onchange={callBack} />,
      title: 'Option add a new',
    })
  }

  const items = [
    {
      key: 'Attribute',
      label: <div>{translate('textPopular.attribute')} </div>,
      children: (
        <div className='flex flex-col gap-2'>
          {dataAttributes.map((e, index) => {
            switch (typeProduct) {
              case TYPE_PRODUCT.shoes:
                return (
                  <div className='flex flex-col gap-2 w-full' key={`attribute-${index}`}>
                    <AttributeShoes
                      onChange={(param) => onChangeValueData(index, param)}
                      keyIndex={`item-${index}`}
                      data={e}
                      keyType={e.key}
                    />
                  </div>
                )

              default:
                return <div> coming soon</div>
            }
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
      {/* <div className='flex flex-col gap-2'>
        {dataAttributes.map((e, index) => {
          // if (Array.isArray(e.value)) {
          //   return <ObjAndArr data={e} onChangeValue={(type, value) => onChangeValue('arr', type, value, index)} />
          // }
          switch (typeAttributes) {
            case 'arrObject':
              return <ArrObject data={e} />

            default:
              return <div> coming soon</div>
          }
        })}
      </div> */}
    </div>
  )
}

export default AttributeAdmin
