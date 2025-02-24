import MyInput from '@/components/MyInput'
import MyLoading from '@/components/MyLoading'
import UploadImage from '@/components/UploadImg'
import { DataAddComment } from '@/constant/mongoDB'
import { QUERY_KEY } from '@/constant/reactQuery'
import useCommentDetail from '@/hook/tank-query/useCommentDetail'
import useRefreshQuery from '@/hook/tank-query/useRefreshQuery'
import useLanguage from '@/hook/useLanguage'
import useModalDrawer from '@/hook/useModalDrawer'
import useUserData from '@/hook/useUserData'
import ClientApi from '@/services/clientApi'
import { detectImg } from '@/utils/functions'
import { showNotificationError, showNotificationSuccess } from '@/utils/notification'
import { ArrowLeftOutlined, CameraOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { Button, Image, Rate } from 'antd'
import ImageNext from 'next/image'
import React, { useEffect, useState } from 'react'
import ViewDetailBill from '../ViewDetailBill'

const ModalFeedBack = ({ data, item }: { data: any; item: any }) => {
  const { translate } = useLanguage()
  const { userData } = useUserData()
  const { closeModalDrawer, openModalDrawer } = useModalDrawer()
  const { refreshQuery } = useRefreshQuery()
  const { data: dataGetApi, isLoading: loadingAPI } = useCommentDetail(data._id)

  const [listImgFeeBack, setListImgFeeBack] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [rate, setRate] = useState(5)
  const [des, setDes] = useState('')

  useEffect(() => {
    const getData = async () => {
      setListImgFeeBack(dataGetApi.listImg || [])
      setDes(dataGetApi.note || '')
      setRate(Number(dataGetApi.rate || 5))
    }
    dataGetApi && getData()
  }, [dataGetApi])

  const handleUpload = async (file: any) => {
    setListImgFeeBack([...listImgFeeBack, file])
  }

  const deleteImg = (index: number) => {
    const data = listImgFeeBack.filter((_: any, indexFilter: number) => indexFilter !== index)
    setListImgFeeBack(data)
  }

  const getDataToUpdate = () => {
    const dataFile: { [key: string]: any } = {}

    if (des !== dataGetApi?.note) {
      dataFile.note = des
    }
    if (rate !== Number(dataGetApi?.rate)) {
      dataFile.rate = rate
    }

    dataFile.listImg = listImgFeeBack

    dataFile.imagesDelete = dataGetApi?.listImg.filter((e: any) => {
      const isExited = listImgFeeBack.find((eApi) => {
        return eApi === e
      })

      return !isExited
    })

    return dataFile
  }

  const handleSubmit = async () => {
    try {
      setLoading(true)
      let res
      const body: DataAddComment = {
        idProduct: data._id,
        listImg: listImgFeeBack,
        note: des,
        name: userData?.name,
        rate: Number(rate),
        sdt: userData?.sdt,
      }

      if (dataGetApi?.note) {
        res = await ClientApi.updateComment(dataGetApi._id, getDataToUpdate())
      } else {
        res = await ClientApi.createComment(body)
      }

      if (res?.data) {
        await refreshQuery(QUERY_KEY.MyBillUser)
        showNotificationSuccess(translate('success.feedback'))
        closeModalDrawer()
      } else {
        showNotificationError(translate('error.feedback'))
      }
    } catch {
      showNotificationError(translate('error.feedback'))
    } finally {
      setLoading(false)
    }
  }

  const handleBack = () => {
    openModalDrawer({
      content: <ViewDetailBill data={item} />,
      useDrawer: true,
      title: translate('textPopular.viewDetail'),
    })
  }

  const getQuality = () => {
    if (rate >= 4) {
      return translate('comment.veryGood')
    }
    if (rate >= 3) {
      return translate('comment.good')
    }

    if (rate >= 2) {
      return translate('comment.wellwell')
    }
    return translate('comment.normal')
  }

  const renderListImg = () => {
    return (
      <div className='flex gap-3'>
        {listImgFeeBack.map((item: any, index: number) => (
          <div key={`img-${index}`} className='relative w-[70px] '>
            <Image alt='img' className='w-[70px]' src={detectImg(item?.base64 || item)} />
            <CloseCircleOutlined
              onClick={() => deleteImg(index)}
              className='absolute text-[20px] z-10 cursor-pointer right-0 top-0'
            />
          </div>
        ))}
      </div>
    )
  }

  if (loadingAPI) {
    return (
      <div className='flex flex-col justify-center items-center min-h-[350px]'>
        <div>
          <MyLoading />
        </div>
      </div>
    )
  }

  return (
    <div className='fex flex-col gap-3 '>
      <div
        onClick={handleBack}
        className='w-max mb-4 flex items-center gap-2 cursor-pointer font-bold'
      >
        <ArrowLeftOutlined />
        <div>{translate('common.back')}</div>
      </div>
      <div className='flex gap-2'>
        <div className='md:w-[100px] w-[80px] aspect-square'>
          <ImageNext
            src={detectImg(data?.more_data?.imageMain)}
            alt={data.keyName}
            fill
            className='!relative '
          />
        </div>
        <div className='flex flex-col gap-2'>
          <div className='font-bold text-lg'>{data?.more_data?.name}</div>
          <div>{getQuality()}</div>
          <Rate value={rate} onChange={(e) => setRate(e)} />
        </div>
      </div>
      <div className='mt-2 mb-1'>{`${translate('textPopular.note')} :`}</div>
      <MyInput
        onChangeText={(e) => setDes(e.toString())}
        type='area'
        rows={3}
        showCount
        value={des}
        maxLength={150}
      />
      <div className='mb-3' />
      <UploadImage
        handleUpload={handleUpload}
        disabled={listImgFeeBack.length >= 2}
        listData={listImgFeeBack}
        maxSizeOutputKB={200}
        maxPixelReduce={400}
      >
        <div className='flex gap-2 item-center w-full mb-2'>
          <CameraOutlined className='cursor-pointer' style={{ fontSize: 25, color: 'blue' }} />
          <span>{translate('comment.uploadImg_des')}</span>
        </div>
      </UploadImage>
      {renderListImg()}
      <Button
        onClick={handleSubmit}
        loading={loading}
        disabled={!des}
        className='mt-4 md:mb-0 mb-2 w-full'
      >
        {dataGetApi?.note ? translate('common.update') : translate('common.save')}
      </Button>
    </div>
  )
}

export default ModalFeedBack
