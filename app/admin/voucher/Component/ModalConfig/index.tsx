import React, { useEffect, useMemo, useState } from 'react'
import { VoucherProps } from '../../type'
import useRefreshQuery from '@/hook/tank-query/useRefreshQuery'
import useModalDrawer from '@/hook/useModalDrawer'
import useCallbackToast from '@/hook/useCallbackToast'
import { convertDateToNumber, diffTime, plusDay } from '@/utils/momentFunc'
import MyForm from '@/components/Form/MyForm'
import ButtonForm from '@/components/Form/ButtonForm'
import InputForm from '@/components/Form/InputForm'
import useLanguage from '@/hook/useLanguage'
import { useCategoryMenu } from '@/zustand/useCategoryMenu'
import { PropsSelectItem } from '@/components/MySelect'
import SelectForm from '@/components/Form/SelectForm'
import { MODE_SELECT } from '@/constant/app'
import MyDatePickerForm from '@/components/Form/MyDatePickerForm'
import { TYPE_VOUCHER } from '@/constant/admin'
import { isEqual } from 'lodash'
import AdminApi from '@/services/adminApi'
import { QUERY_KEY } from '@/constant/reactQuery'
import { isObject } from '@/utils/functions'

const ModalConfig = ({ data }: { data?: VoucherProps }) => {
  const { translate, lang } = useLanguage()
  const { refreshQuery } = useRefreshQuery()
  const { closeModalDrawer } = useModalDrawer()
  const { categoryMenu } = useCategoryMenu()
  const { updateError, createSuccess, updateSuccess, createError } = useCallbackToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<VoucherProps | null>(null)

  const optionMenuCategories = useMemo(() => {
    if (categoryMenu) {
      return categoryMenu.map((e) => {
        const itemTemp: PropsSelectItem = {
          label: e.lang![lang],
          value: e.keyName,
        }
        return itemTemp
      })
    }
    return []
  }, [categoryMenu, lang])

  const optionVouchers = useMemo(() => {
    return Object.values(TYPE_VOUCHER).map((e) => {
      const keyLang: any = `textPopular.${e}`
      const itemTemp: PropsSelectItem = {
        label: translate(keyLang) || e,
        value: e,
      }
      return itemTemp
    })
  }, [translate])

  useEffect(() => {
    const initData: VoucherProps = {
      type: data?.type || TYPE_VOUCHER.freeShip,
      amount: data?.amount || 10,
      note: data?.note || 'Fee ship 10k',
      name: data?.name || 'Fee ship 10k',
      disCount: data?.disCount || 10000,
      categoriesProduct: data?.categoriesProduct || [],
      expired: data?.expired || plusDay(Date.now(), 7).valueOf(),
    }

    setFormData(initData)
  }, [data])

  const handleSubmit = async () => {
    setLoading(true)

    if (data) {
      const dataTemp: any = { ...data }
      const body: any = {}

      Object.entries(formData!).forEach(([key, value]: [any, any]) => {
        if (!isEqual(value, dataTemp[key])) {
          body[key] = value
        }
      })
      if (body?.expired && isObject(body?.expired)) {
        body.expired = convertDateToNumber(body?.expired?.toString())
      }

      const res = await AdminApi.updateVoucher(data?._id!, formData)

      if (res.data) {
        await refreshQuery(QUERY_KEY.VoucherAdmin)
        updateSuccess()
        closeModalDrawer()
      } else {
        updateError()
      }
    } else {
      const body = {
        ...formData,
      }
      if (body?.expired && isObject(body?.expired)) {
        body.expired = convertDateToNumber(body?.expired?.toString())
      }

      const res = await AdminApi.createVoucher(body)

      if (res.data) {
        await refreshQuery(QUERY_KEY.VoucherAdmin)
        createSuccess()
        closeModalDrawer()
      } else {
        createError()
      }
    }
    setLoading(false)
  }
  console.log({ formData })

  return (
    <MyForm
      onValuesChange={(_, value) => setFormData({ ...formData, ...value })}
      formData={formData}
      onFinish={handleSubmit}
      className='!overflow-auto !w-full gap-2 md:max-h-[85vh]'
    >
      <div className='flex flex-col  w-full flex-1 overflow-y-auto '>
        <InputForm classFromItem='w-full' name='name' label={translate('header.name')} required />
        <MyDatePickerForm
          name='expired'
          label={`${translate('textPopular.dateEnd')} (${diffTime(formData?.expired) + 1} day)`}
          defaultValue={formData?.expired}
        />

        <SelectForm
          options={optionVouchers}
          showSearch
          name='type'
          label={translate('menuProduct.category')}
          required
        />

        <SelectForm
          options={optionMenuCategories}
          showSearch
          mode={MODE_SELECT.multiple}
          name='categoriesProduct'
          label={translate('category')}
          required
        />

        <InputForm
          typeBtn='number'
          classFromItem='w-full'
          name='amount'
          label={translate('textPopular.amount')}
          required
        />

        <InputForm
          typeBtn='number'
          classFromItem='w-full'
          name='disCount'
          label={`${translate('textPopular.disCount')} (VNĐ)`}
          required
        />
        <InputForm
          typeBtn='area'
          rows={4}
          classFromItem='w-full'
          name='note'
          label={translate('textPopular.note')}
          required
        />
        <div className='w-full mb-2' />
      </div>
      <div className='flex flex-1 w-full'>
        <ButtonForm
          titleSubmit={translate(data ? 'common.update' : 'common.create')}
          loading={loading}
        />
      </div>
    </MyForm>
  )
}

export default ModalConfig
