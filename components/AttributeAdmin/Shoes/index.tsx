import React from 'react'
import MyCollapse, { ItemCollapseProps } from '@/components/MyCollapse'
import { Input } from 'antd'
import useLanguage from '@/hook/useLanguage'
import { DeleteOutlined, DiffOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { cloneData, isObject } from '@/utils/functions'
import { useModalAdmin } from '@/zustand/useModalAdmin'
import ModalDelete from '@/components/ModalDelete'
import MyInput from '@/components/MyInput'

export type IEditItemAttributesProps = {
  data: any
  onChange: (param?: any) => void
  keyIndex?: string
  keyType: string
}

const AttributeShoes = ({ keyType, data, onChange, keyIndex = '' }: IEditItemAttributesProps) => {
  const { translate } = useLanguage()
  const { openModal } = useModalAdmin()

  const onChangeValueData = (
    indexParent: number,
    index: number,
    key: string,
    value: any,
    isObj = true
  ) => {
    const dataClone = cloneData(data)
    if (isObj) {
      dataClone.value[indexParent][keyType][index][key] = value
    } else {
      dataClone.value[indexParent] = value
    }
    onChange(dataClone)
  }

  const handleDeleteValueData = (indexParent: number, index: number, isObj = true) => {
    const callBack = () => {
      const dataClone = cloneData(data)

      if (isObj) {
        dataClone.value[indexParent][keyType] = dataClone.value[indexParent][keyType].filter(
          (_: any, indexFilter: number) => indexFilter !== index
        )
      } else {
        dataClone.value = dataClone.value.filter(
          (_: any, indexFilter: number) => indexParent !== indexFilter
        )
      }

      onChange(dataClone)
    }
    openModal({
      body: <ModalDelete isModalAdmin callback={callBack} />,
    })
  }

  const handleAddValueData = (indexParent: number) => {
    const dataClone = cloneData(data)

    dataClone.value[indexParent][keyType].push({
      [keyType]: `${keyType}_${dataClone.value[indexParent][keyType].length + 1}`,
      sold: 0,
      amount: 10,
    })

    onChange(dataClone)
  }

  const handleDoubleValueData = (index: number) => {
    const dataClone = cloneData(data)
    const dataDouble = cloneData(dataClone.value[index])
    dataDouble.size = `${dataDouble.size}-new`
    dataClone.value.splice(1, 0, dataDouble)
    onChange(dataClone)
  }

  const handleDeleteKeyValueData = (index: number) => {
    const callBack = () => {
      const dataClone = cloneData(data)
      dataClone.value = dataClone.value.filter(
        (_: any, indexFilter: number) => index !== indexFilter
      )
      onChange(dataClone)
    }
    openModal({
      body: <ModalDelete isModalAdmin callback={callBack} />,
    })
  }

  const onChangeKeyData = (indexParent: number, value: string) => {
    const dataClone = cloneData(data)
    dataClone.value[indexParent].size = value
    onChange(dataClone)
  }

  const onChangeKey = (value: string) => {
    const dataClone = cloneData(data)

    dataClone.key = value
    onChange(dataClone)
  }

  const handleAddNewKey = () => {
    const dataClone = cloneData(data)
    const isObj = dataClone.value.some((e: any) => isObject(e))

    if (isObj) {
      const newData = {
        [keyType]: dataClone.value.length + 1,
        amount: 10,
        sold: 0,
      }
      dataClone.value.push({
        size: 0,
        [keyType]: [newData],
      })
    } else {
      dataClone.value.push('new value')
    }

    onChange(dataClone)
  }

  const handleDeleteKey = () => {
    const callBack = () => {
      onChange(null)
    }

    openModal({
      body: <ModalDelete isModalAdmin callback={callBack} />,
    })
  }

  const renderValue = (val: any, index: number) => {
    const key = val['size']
    const value = val[keyType]
    const items: ItemCollapseProps = [
      {
        key: `renderValue-${index}`,
        label: <div>{`Size : ${key}`} </div>,
        children: (
          <div className='flex flex-col gap-2'>
            <div className='flex gap-3 items-center'>
              <Input
                className='!w-[200px]'
                value={key}
                onChange={(e) => onChangeKeyData(index, e.target.value)}
              />
              <div className='text-green-600 text-xl'>
                <PlusCircleOutlined
                  onClick={() => handleAddValueData(index)}
                  className='cursor-pointer'
                />
              </div>
              <div className='text-xl text-green-600'>
                <DiffOutlined
                  onClick={() => handleDoubleValueData(index)}
                  className='cursor-pointer'
                />
              </div>
              <div className='text-red-500 text-xl'>
                <DeleteOutlined
                  onClick={() => handleDeleteKeyValueData(index)}
                  className='cursor-pointer'
                />
              </div>
            </div>
            <div>List data :</div>
            {value.map((valeDetail: any, indexDetail: number) => {
              return (
                <div key={`valeDetail-${indexDetail}`} className='flex gap-2 items-center'>
                  <div className='flex flex-col gap-1'>
                    <div>{`Model: ${indexDetail + 1}`}</div>
                    <MyInput value={valeDetail[keyType]} />
                  </div>
                  <div className='flex flex-col gap-1'>
                    <div>{translate('textPopular.amount')}</div>
                    <Input
                      onChange={(e) =>
                        onChangeValueData(index, indexDetail, 'amount', e.target.value)
                      }
                      value={valeDetail['amount']}
                    />
                  </div>
                  <div className='flex text-xl text-red-600 flex-col justify-center items-center h-full'>
                    <div className='pb-6 ' />
                    <DeleteOutlined
                      onClick={() => handleDeleteValueData(index, indexDetail)}
                      className='cursor-pointer'
                    />
                  </div>
                </div>
              )
            })}
          </div>
        ),
      },
    ]

    return <MyCollapse items={items} className='!bg-[#f3efef]' />
  }

  const renderValueArr = (val: any, index: number) => {
    return (
      <div className='flex flex-col gap-1'>
        <div>{`Value ${index + 1} :`}</div>
        <div className='flex items-center gap-2'>
          <Input
            value={val}
            onChange={(e) => onChangeValueData(index, 0, '', e.target.value, false)}
            className='max-w-[250px]'
          />
          <div className='flex text-xl text-red-600 flex-col justify-center items-center h-full'>
            <DeleteOutlined
              onClick={() => handleDeleteValueData(index, 0, false)}
              className='cursor-pointer'
            />
          </div>
        </div>
      </div>
    )
  }

  const renderKey = () => {
    const items: ItemCollapseProps = [
      {
        key: keyIndex,
        label: <div>{data.key} </div>,
        children: (
          <div className='flex flex-col gap-2'>
            <div className='flex items-center gap-2'>
              <div className='w-[300px]'>
                <Input value={data.key} onChange={(e) => onChangeKey(e.target.value)} />
              </div>
              <div className='text-green-600 text-xl'>
                <PlusCircleOutlined onClick={handleAddNewKey} className='cursor-pointer' />
              </div>
              <div className='text-red-500 text-xl'>
                <DeleteOutlined onClick={() => handleDeleteKey()} className='cursor-pointer' />
              </div>
            </div>
            <div className='flex flex-col mt-2 gap-2 w-full'>
              {data.value.map((e: any, index: number) => {
                if (isObject(e)) {
                  return renderValue(e, index)
                }
                return renderValueArr(e, index)
              })}
            </div>
          </div>
        ),
      },
    ]

    return <MyCollapse items={items} className='!bg-[#f3efef]' />
  }

  return renderKey()
}

export default AttributeShoes
