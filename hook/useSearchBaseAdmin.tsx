import React, { useEffect, useState } from 'react'
import MyForm from '@/components/Form/MyForm'
import InputForm from '@/components/Form/InputForm'
import useLanguage from './useLanguage'
import CategoryForm from '@/components/CategoryForm'
import CheckBoxForm from '@/components/Form/CheckBoxForm'
import { usePathname, useRouter } from 'next/navigation'
import ButtonForm from '@/components/Form/ButtonForm'
import useMedia from './useMedia'
import { isObject } from '@/utils/functions'
import useQuerySearch from './useQuerySearch'
import MyDatePickerForm from '@/components/Form/MyDatePickerForm'
import StatusFormBill from '@/components/Form/StatusFormBill'
import { FILTER_BILL } from '@/constant/app'
import { Button, Form } from 'antd'
import { useCategoryMenu } from '@/zustand/useCategoryMenu'
import { convertDateToNumber, formatDateTime } from '@/utils/momentFunc'

type KeySearchProps = {
  dateStart?: boolean
  dateEnd?: boolean
  category?: boolean
  id?: boolean
  sdt?: boolean
  keyName?: boolean
  status?: boolean
  admin?: boolean
  oneDate?: boolean
  idProduct?: boolean
  idUser?: boolean
}

type TitleProps = {
  id?: string
  keyName?: string
  oneDate?: string
  dateStart?: string
  dateEnd?: string
  idProduct?: string
}

type defaultValueProps = {
  dateStart?: number
  dateEnd?: number
  category?: string
  id?: string
  sdt?: string
  keyName?: string
  status?: string
  admin?: boolean
  oneDate?: string
  idProduct?: string
  idUser?: string
  [key: string]: any
}

const useSearchBaseAdmin = (
  param?: KeySearchProps,
  paramTitle?: TitleProps,
  defaultValue?: defaultValueProps
) => {
  const { translate, lang } = useLanguage()
  const pathPage = usePathname()
  const router = useRouter()
  const { isClient } = useMedia()
  const { categoryMenu } = useCategoryMenu()
  const { queries } = useQuerySearch()
  const [formData, setFormData] = useState<{ [key: string]: any } | null>(null)

  const [form] = Form.useForm()

  useEffect(() => {
    const getValueQuery = (key: string, defaultValues: any = '') => {
      let value = null
      if (queries && queries?.[key]) {
        value = queries?.[key][0]
      }
      return value || defaultValue?.[key] || defaultValues
    }

    const getCategory = () => {
      const initData = {
        label: 'All',
        value: 'all',
      }
      if (queries?.['category']) {
        const dataLan = categoryMenu.find((e) => e.keyName === queries?.['category'][0]!)
        initData.label = dataLan?.lang?.[lang || 'vn'].toString() || queries?.['category'][0]!
        initData.value = dataLan?.keyName.toString() || queries?.['category'][0]!
      }

      return initData
    }

    if (isClient) {
      const initData = {
        category: getCategory(),
        id: getValueQuery('id'),
        sdt: getValueQuery('sdt'),
        keyName: getValueQuery('keyName'),
        status: getValueQuery('status', FILTER_BILL.All),
        oneDate: getValueQuery('oneDate', formatDateTime(Date.now(), 'YYYY-MM-DD')),
        admin: getValueQuery('admin', false),
        dateStart: getValueQuery('dateStart'),
        dateEnd: getValueQuery('dateEnd'),
        // dateStart: dayjs(new Date(Date.now()).setDate(new Date().getDate() - 7)),
        // dateEnd: dayjs(new Date(Date.now()).setDate(new Date().getDate())),
      }
      console.log('====================================')
      setFormData(initData)
      form.setFieldsValue(initData)
    }

    return () => setFormData(null)
  }, [categoryMenu, lang, queries, isClient, form])

  useEffect(() => {
    console.log('====================================')
    console.log({ defaultValue })
    console.log('====================================')
  }, [defaultValue])

  const clearSearch = () => {
    const initData = {
      category: {
        label: 'All',
        value: 'all',
      },
      id: '',
      sdt: '',
      keyName: '',
      status: '',
      oneDate: formatDateTime(Date.now(), 'YYYY-MM-DD'),
      admin: false,
      dateStart: '',
      dateEnd: '',
      // dateStart: dayjs(new Date(Date.now()).setDate(new Date().getDate() - 7)),
      // dateEnd: dayjs(new Date(Date.now()).setDate(new Date().getDate())),
    }
    setFormData(initData)
    form.setFieldsValue(initData)
    router.push(pathPage)
  }

  const handleSubmit = () => {
    let query = ''
    console.log({ formData })

    Object.entries(param!).forEach(([key, value]: [string, any]) => {
      if (value && formData?.[key]) {
        if (query) {
          if (isObject(formData?.[key])) {
            if (key === 'dateStart' || key === 'dateEnd' || key === 'oneDate') {
              console.log('format data')

              const time = new Date(formData?.[key].toString()).getTime()
              query += `&${key}=${time}`
            } else {
              query += `&${key}=${formData?.[key]?.value}`
            }
          } else {
            query += `&${key}=${formData?.[key]}`
          }
        } else {
          if (isObject(formData?.[key])) {
            if (key === 'dateStart' || key === 'dateEnd' || key === 'oneDate') {
              const time = new Date(formData?.[key].toString()).getTime()
              query += `${key}=${time}`
            } else {
              query += `${key}=${formData?.[key]?.value}`
            }
          } else {
            if (key === 'dateStart' || key === 'dateEnd' || key === 'oneDate') {
              const time = convertDateToNumber(formData?.[key])
              query += `${key}=${time}`
            } else {
              query += `${key}=${formData?.[key]}`
            }
          }
        }
      }
    })
    router.push(`${pathPage}?${query}`)
  }

  const renderContent = () => {
    return (
      <div className='flex  flex-col gap-3 '>
        <MyForm
          onValuesChange={(_, value) => {
            setFormData({ ...formData, ...value })
            form.setFieldsValue({ ...formData, ...value })
          }}
          formData={formData}
          onFinish={handleSubmit}
          className='w-full'
          form={form}
        >
          <div className='flex justify-between flex-wrap'>
            {param?.id && (
              <div className='md:w-[48%] w-full'>
                <InputForm noPaddingBottom key={'id'} name='id' label={paramTitle?.id || 'ID'} />
              </div>
            )}
            {param?.idProduct && (
              <div className='md:w-[48%] w-full'>
                <InputForm
                  noPaddingBottom
                  key={'idProduct'}
                  name='idProduct'
                  label={paramTitle?.idProduct || 'ID Product'}
                />
              </div>
            )}
            {param?.keyName && (
              <div className='md:w-[48%] w-full'>
                <InputForm noPaddingBottom key={'KeyName'} name='keyName' label={'Key Name'} />
              </div>
            )}

            {param?.sdt && (
              <div className='md:w-[48%] w-full'>
                <InputForm
                  noPaddingBottom
                  key={'sdt'}
                  name='sdt'
                  label={translate('userDetail.sdt')}
                />
              </div>
            )}

            {param?.category && (
              <div className='md:w-[48%] w-full'>
                <CategoryForm noPaddingBottom label='category' name='category' />
              </div>
            )}
            {param?.status && (
              <div className='md:w-[48%] w-full'>
                <StatusFormBill
                  noPaddingBottom
                  label={translate('textPopular.status')}
                  name='status'
                />
              </div>
            )}
            {param?.admin && (
              <div className='md:w-[48%] w-full'>
                <CheckBoxForm noPaddingBottom label='Admin' name='admin' />
              </div>
            )}

            {param?.dateStart && (
              <div className='md:w-[48%] w-full'>
                <MyDatePickerForm
                  noPaddingBottom
                  label={translate('textPopular.dateStart')}
                  name='dateStart'
                  defaultValue={formData?.dateStart}
                />
              </div>
            )}
            {param?.dateEnd && (
              <div className='md:w-[48%] w-full'>
                <MyDatePickerForm
                  noPaddingBottom
                  label={translate('textPopular.dateEnd')}
                  name='dateEnd'
                  defaultValue={formData?.dateEnd}
                />
              </div>
            )}
          </div>
          <div className='flex justify-center items-center gap-2 w-full'>
            <ButtonForm disableClose titleSubmit={translate('common.search')} />
            <Button type='primary' className=' mt-2' onClick={() => clearSearch()}>
              {'Clean'}
            </Button>
          </div>
        </MyForm>
      </div>
    )
  }

  return {
    formData,
    renderContent,
  }
}

export default useSearchBaseAdmin
