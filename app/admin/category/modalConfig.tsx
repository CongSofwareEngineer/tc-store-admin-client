import ButtonForm from '@/components/Form/ButtonForm'
import CheckBoxForm from '@/components/Form/CheckBoxForm'
import InputForm from '@/components/Form/InputForm'
import MyForm from '@/components/Form/MyForm'
import MyInput from '@/components/MyInput'
import UploadImage from '@/components/UploadImg'
import { LANGUAGE_SUPPORT } from '@/constant/app'
import { QUERY_KEY } from '@/constant/reactQuery'
import useRefreshQuery from '@/hook/tank-query/useRefreshQuery'
import useCallbackToast from '@/hook/useCallbackToast'
import useLanguage from '@/hook/useLanguage'
import useModalDrawer from '@/hook/useModalDrawer'
import useTypeFile from '@/hook/useTypeFile'
import AdminApi from '@/services/adminApi'
import { detectImg, uppercase } from '@/utils/functions'
import { CameraOutlined, DeleteOutlined } from '@ant-design/icons'
import { Button, Form, Image } from 'antd'
import React, { useEffect, useState } from 'react'

const ModalConfigCategory = ({ data }: { data: any }) => {
  const { translate } = useLanguage()
  const { typeFile } = useTypeFile({ typeAndroid: '.png,.jpg,.jpeg' })
  const { refreshQuery } = useRefreshQuery()
  const { closeModalDrawer } = useModalDrawer()
  const { createError, updateError, createSuccess, updateSuccess } = useCallbackToast()

  const [formData, setFormData] = useState<{ [key: string]: any } | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const initData = {
      icon: data?.icon || '',
      lang: data?.lang || {
        vn: '',
        en: '',
      },
      keyName: data?.keyName || '',
      subCategories: data?.subCategories || [],
      isShow: typeof data?.isShow === 'undefined' ? true : !!data?.isShow,
    }
    setFormData(initData)
  }, [data])

  const onChangeName = (key: string, value?: string) => {
    setFormData({
      ...formData,
      lang: {
        ...formData?.lang,
        [key]: value,
      },
    })
  }

  const handleSubmit = async () => {
    try {
      setLoading(true)
      let res: any = null
      const dataBody = { ...formData }
      dataBody.subCategories = dataBody.subCategories.filter((e: any) => !!e)

      if (data) {
        if (dataBody?.icon !== data.icon) {
          dataBody.imgOld = data.icon
        }

        res = await AdminApi.updateCategories(data._id, dataBody)
      } else {
        res = await AdminApi.createCategories(dataBody)
      }

      if (res?.data) {
        if (data) {
          updateSuccess()
        } else {
          createSuccess()
        }
        await refreshQuery(QUERY_KEY.GetCategoryAdmin)
        closeModalDrawer()
      } else {
        if (data) {
          updateError()
        } else {
          createError()
        }
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <MyForm
      onValuesChange={(_, value) => setFormData({ ...formData, ...value })}
      formData={formData}
      onFinish={handleSubmit}
      className='!overflow-auto gap-2'
    >
      <div className='flex flex-col gap-2 w-full flex-1 overflow-y-auto '>
        <InputForm
          classFromItem='w-full '
          name='keyName'
          label={'keyName'}
          required
          disable={!!data}
        />
        <Form.List name='subCategories'>
          {(fields, { add, remove }) => (
            <div className='w-full'>
              <div className='grid w-full md:grid-cols-2 grid-cols-1 gap-3'>
                {fields.map((e, index) => {
                  return (
                    <div key={e.name} className='flex gap-2 items-end '>
                      <div className='flex flex-1'>
                        <InputForm
                          classFromItem='w-full'
                          label={`Sub Category ${index + 1}`}
                          name={e.name}
                        />
                      </div>

                      <div className='text-red-500 text-medium relative top-1'>
                        <DeleteOutlined
                          onClick={() => {
                            remove(e.name)
                          }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
              <Button type='dashed' className='mt-5' onClick={() => add()} block>
                + Add Item
              </Button>
            </div>
          )}
        </Form.List>
        {Object.values(LANGUAGE_SUPPORT).map((value) => {
          return (
            <div key={value} className='flex flex-col  w-full gap-2 mt-2'>
              <div>{`${translate('language')} : ${uppercase(value)}`}</div>
              <MyInput
                value={formData?.lang[value] || ''}
                onChangeText={(e) => onChangeName(value, e?.toString())}
              />
            </div>
          )
        })}

        <CheckBoxForm
          classFromItem='w-full'
          name='isShow'
          label={translate('textPopular.showScreen')}
        />
        <div className='flex justify-center'>
          <div className='flex flex-col  w-[150px] h-[150px]   justify-between items-center'>
            <UploadImage
              maxSizeOutputKB={200}
              typeFile={typeFile}
              handleUpload={(e) => setFormData({ ...formData, icon: e })}
            >
              <div className='flex gap-2'>
                <CameraOutlined />
                <span>Icon</span>
              </div>
            </UploadImage>
            <Image
              className='mt-3'
              alt='img-main'
              src={detectImg(formData?.icon?.base64 || formData?.icon)}
            />
          </div>
        </div>

        <div className='flex flex-1 w-full mt-10'>
          <ButtonForm
            titleSubmit={translate(data ? 'common.update' : 'common.create')}
            loading={loading}
          />
        </div>
      </div>
    </MyForm>
  )
}

export default ModalConfigCategory
