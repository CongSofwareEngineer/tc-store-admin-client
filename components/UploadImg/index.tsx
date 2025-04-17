import { MAX_PIXEL_REDUCE } from '@/constant/app'
import useBase64Img from '@/hook/useBase64Img'
import useLanguage from '@/hook/useLanguage'
import useTypeFile from '@/hook/useTypeFile'
import { showNotificationError } from '@/utils/notification'
import { Upload } from 'antd'
import ImgCrop from 'antd-img-crop'
import { isEqual } from 'lodash'
import React from 'react'
import { isIOS, isMacOs } from 'react-device-detect'

export type IImgUpload = {
  base64: string
  name: string
}
type Props = {
  typeFile?: string
  children?: React.ReactNode
  disabled?: boolean
  handleUpload: (file: IImgUpload) => Promise<void> | void
  maxSizeOutputKB?: number
  listData?: any[]
  fullQuality?: boolean
  maxPixelReduce?: number
}
const UploadImage = ({
  children = <></>,
  disabled = false,
  typeFile = '',
  handleUpload,
  maxSizeOutputKB = 15,
  listData = [],
  fullQuality = false,
  maxPixelReduce = MAX_PIXEL_REDUCE,
}: Props) => {
  const { translate } = useLanguage()
  const { getBase64, getBase64Full } = useBase64Img(maxSizeOutputKB, maxPixelReduce)
  const { typeFile: typeFileBase } = useTypeFile()

  const isValidFile = (typeFile?: string) => {
    if (isIOS && isMacOs) {
      return true
    }
    const typeFileDefault = typeFileBase.replaceAll('.', '')
    const listTypeFile = typeFileDefault?.split(',')

    let isValid = false
    listTypeFile?.forEach((e) => {
      if (typeFile!.includes(e)) {
        isValid = true
      }
    })
    return isValid
  }

  const handleLoadFile = (file: any) => {
    if (!isValidFile(file.type)) {
      const text = `${translate('error.supportTypeFile')} ${typeFileBase}`
      showNotificationError(text)
      return
    }

    const callBack = (data: any) => {
      if (listData.some((e) => isEqual(e, data))) {
        showNotificationError(translate('errors.existFile'))
      } else {
        handleUpload(data)
      }
    }
    if (fullQuality) {
      getBase64Full(file, callBack)
    } else {
      getBase64(file, callBack)
    }
  }

  return (
    <ImgCrop
      aspect={1}
      quality={1}
      modalOk={translate('common.ok')}
      modalCancel={translate('common.close')}
      onModalOk={(file) => handleLoadFile(file)}
    >
      <Upload
        className='w-full flex justify-center items-center'
        disabled={disabled}
        showUploadList={false}
        accept={typeFile || typeFileBase}
      >
        <label
          className='   edit-avatar flex w-full items-center justify-center gap-2 w-ful '
          htmlFor='avatar'
          style={{
            opacity: disabled ? 0.5 : 1,
            cursor: disabled ? 'not-allowed' : 'pointer',
          }}
        >
          {children}
        </label>
      </Upload>
    </ImgCrop>
  )
}

export default UploadImage
