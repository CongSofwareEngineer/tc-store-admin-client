import MyForm from '@/components/Form/MyForm'
import { cloneData, detectImg } from '@/utils/functions'
import React, { useEffect, useState } from 'react'

import CategoryForm from '@/components/CategoryForm'
import useLanguage from '@/hook/useLanguage'
import { CameraOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { Form, Image } from 'antd'
import useCheckForm from '@/hook/useCheckForm'
import useRefreshQuery from '@/hook/tank-query/useRefreshQuery'
import { QUERY_KEY } from '@/constant/reactQuery'
import { isEqual } from 'lodash'
import UploadImage from '@/components/UploadImg'
import InputForm from '@/components/Form/InputForm'
import ButtonForm from '@/components/Form/ButtonForm'
import AdminApi from '@/services/adminApi'
import MyBlog from '@/components/MyBlog'
import { PATH_IMG } from '@/constant/mongoDB'
import AttributeAdmin from '@/components/AttributeAdmin'
import { SEX, TYPE_PRODUCT, VALUE_KEY_DEFAULT } from '@/constant/admin'
import { INIT_DATA_MY_BLOG } from '@/constant/app'
import useCallbackToast from '@/hook/useCallbackToast'
import { INewProduct } from '../../type'
import ModelConfig from '../ModelConfig'
import ImageConfig from '../ImageConfig'

const ProductConfig = ({ item, closeConfig }: { item: INewProduct; closeConfig: () => void }) => {
  const { translate } = useLanguage()
  const { checkIsNumber } = useCheckForm()
  const { refreshQuery } = useRefreshQuery()
  const { updateError, createSuccess, updateSuccess, createError } = useCallbackToast()

  const [formData, setFormData] = useState<INewProduct | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const initData: INewProduct = {
      cost: item?.cost || 0,
      amount: item?.amount || 100,
      disCount: item?.disCount || 0,
      dateEndSale: item?.dateEndSale || new Date().getTime(),
      dateSale: item?.dateSale || new Date().getTime(),
      images: item?.images || '',
      des: item?.des || '',
      des2: item?.des2 ? JSON.parse(item?.des2) : INIT_DATA_MY_BLOG,
      name: item?.name || '',
      keyName: item?.keyName || '',
      linkShoppe: item?.linkShoppe || '',
      linkFacebook: item?.linkFacebook || '',
      numberLike: item?.numberLike || 1,
      price: item?.price || 1,
      category: item?.category || 'water',
      desSeo: item?.desSeo || '',
      titleSeo: item?.titleSeo || '',
      attributes: item?.attributes || {},
      hsd: item?.hsd || '',
      models: item?.models || [],
      nsx: item?.nsx || '',
    }
    setFormData(initData)
  }, [item])

  const onChangeBlog = (value: any) => {
    // setFormData((pre) => ({
    //   ...pre,
    //   des2: value,
    // }))
  }

  const handleDeleteMoreImg = (index: number) => {
    // const newList = formData?.images?.filter(
    //   (_: any, indexFilter: number) => indexFilter !== index
    // )
    // setFormData({ ...formData, images: newList })
  }

  const getImgDelete = (): string[] => {
    // const list = []
    // if (item?.images !== formData?.images) {
    //   list.push(item?.images)
    // }
    // item?.images.forEach((e: string) => {
    //   const isExited = formData?.images?.find((eForm: any) => eForm === e)
    //   if (!isExited) {
    //     list.push(e)
    //   }
    // })
    // return list
    return []
  }

  const handleSubmit = async () => {
    setLoading(true)
    let data
    if (item) {
      const dataEdit: Record<string, any> = {}
      Object.keys(item).forEach((key) => {
        const keyName = key as keyof INewProduct
        if (formData![keyName] && !isEqual(formData![keyName], item[keyName])) {
          dataEdit[keyName] = formData![keyName]
        }
      })
      dataEdit.titleSeo = formData?.titleSeo
      dataEdit.desSeo = formData?.desSeo

      if (Object.keys(dataEdit).length > 0) {
        dataEdit.imagesDelete = getImgDelete()
        dataEdit.des2 = JSON.stringify(dataEdit.des2)

        data = await AdminApi.updateProduct(item._id!, dataEdit)
      }
      console.log({ dataEdit, formData })
    } else {
      const body = {
        ...formData,
        des2: JSON.stringify(formData?.des2),
      }
      data = await AdminApi.createProduct(body)
    }

    if (data?.data) {
      await refreshQuery(QUERY_KEY.GetListProductAdmin)
      if (item) {
        updateSuccess()
      } else {
        createSuccess()
      }
      closeConfig()
    } else {
      if (item) {
        createError()
      } else {
        updateError()
      }
    }
    setLoading(false)
  }

  const onChangeForm = (_: any, value: INewProduct) => {
    setFormData({ ...formData, ...value })
  }

  const onChangeImg = (file: any) => {}

  return (
    <MyForm
      onValuesChange={onChangeForm}
      formData={formData}
      onFinish={handleSubmit}
      className='  !w-full gap-2 '
    >
      <div className='flex flex-col  w-full flex-1 overflow-y-auto '>
        <div className='flex md:gap-4 w-full md:flex-row flex-col'>
          <InputForm classFromItem='w-full' name='name' label={translate('header.name')} required />
          <CategoryForm label={translate('menuProduct.category')} name='category' />
        </div>

        <div className='flex md:gap-4 w-full md:flex-row flex-col '>
          <InputForm
            classFromItem='w-full'
            name='keyName'
            label={translate('header.name')}
            required
          />
          <InputForm
            classFromItem='w-full'
            name='titleSeo'
            label={translate('admin.titleSeo')}
            required
          />
        </div>

        <div className='flex md:gap-4 w-full md:flex-row flex-col '>
          <InputForm classFromItem='w-full' name='linkFacebook' label='linkFacebook' />

          <InputForm classFromItem='w-full' name='linkShoppe' label='linkShoppe' />
        </div>

        <div className='flex gap-4 w-full'>
          <InputForm
            classFromItem='w-full'
            name='cost'
            label={translate('textPopular.cost')}
            required
            typeBtn='number'
            validator={checkIsNumber}
          />

          <InputForm
            classFromItem='w-full'
            name='price'
            label={translate('productDetail.price')}
            required
            typeBtn='number'
            validator={checkIsNumber}
          />
        </div>
        <div className='flex gap-4 w-full'>
          <InputForm
            classFromItem='w-full'
            name='disCount'
            label={translate('textPopular.disCount')}
            required
            typeBtn='number'
            validator={checkIsNumber}
          />

          <InputForm
            classFromItem='w-full'
            name='weight'
            label={translate('productDetail.weight')}
            required
            disable={!!item}
          />
        </div>
        <div className='w-full'>
          <UploadImage
            listData={formData?.images || []}
            handleUpload={(e) => {
              // setFormData({
              //   ...formData,
              //   images: [...formData?.images, e],
              // })
            }}
            maxSizeOutputKB={300}
            maxPixelReduce={500}
          >
            <div className='flex w-full gap-2 justify-center items-center'>
              <CameraOutlined />
              <span>{translate('textPopular.image')}</span>
            </div>
          </UploadImage>
        </div>

        <ImageConfig
          data={formData!}
          onChange={(e) => {
            if (formData) {
              setFormData({ ...formData, images: e })
            }
          }}
        />
        <div className='flex gap-3 justify-between  mt-2'>
          <div className='w-[calc(100%-200px)] h-full flex flex-col  gap-3 justify-between items-center'>
            <div className='flex flex-nowrap gap-3 overflow-scroll w-full '>
              {/* {formData?.imageMore &&
                formData?.imageMore.map((e: any, index: number) => {
                  return (
                    <div className='w-[100px]' key={detectImg(e?.base64 || e)}>
                      <div className='w-[100px] relative'>
                        <Image
                          className='w-[100px]'
                          alt={`img-moew-${e?.name}`}
                          src={detectImg(e?.base64 || e)}
                        />
                        <CloseCircleOutlined
                          onClick={() => handleDeleteMoreImg(index)}
                          className='absolute right-0 top-0 text-[18px] cursor-pointer '
                        />
                      </div>
                    </div>
                  )
                })} */}
            </div>
          </div>
        </div>

        <InputForm
          classFromItem='w-full'
          name='desSeo'
          label={translate('admin.desSeo')}
          required
          typeBtn='area'
        />
        <ModelConfig
          data={formData?.models!}
          onChange={(e) => {
            if (formData) {
              setFormData({ ...formData, models: e })
            }
          }}
        />
        <AttributeAdmin
          typeProduct={formData?.category}
          data={formData?.models}
          onChange={(e) => {
            // setFormData({ ...formData, models: e })
          }}
        />

        <InputForm classFromItem='w-full' name='des' label='des' required typeBtn='area' />
        <div className='w-full flex flex-col gap-2  min-h-[300px]'>
          <div className='font-bold  '>{`${translate('admin.infoDetail')} :`} </div>
          <div className='w-full flex flex-1 bg-slate-50'>
            <MyBlog pathFile={PATH_IMG.Products} value={formData?.des2} setValue={onChangeBlog} />
          </div>
        </div>
      </div>

      <div className='flex flex-1 w-full'>
        <ButtonForm
          titleSubmit={translate(item ? 'common.update' : 'common.create')}
          loading={loading}
          onClickBtnCancel={closeConfig}
        />
      </div>
    </MyForm>
  )
}

export default ProductConfig
