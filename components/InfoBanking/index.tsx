import VietcomBankService from '@/services/vietcombank'
import React, { useEffect, useState } from 'react'
import MyImage from '../MyImage'
import useLanguage from '@/hook/useLanguage'
import TextCopy from '../TextCopy'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { Button, Image } from 'antd'
import { images } from '@/configs/images'
import useMedia from '@/hook/useMedia'

const InfoBanking = ({
  amount,
  callback = () => {},
}: {
  amount: number
  callback?: (id?: string, mess?: string) => any
}) => {
  const { translate } = useLanguage()
  const { isMobile } = useMedia()

  const [qrCode, setQrCode] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [loadingCheck, setLoadingCheck] = useState(false)
  const [isBanking] = useState(false)
  const [idBanking, setIdBanking] = useState('')

  useEffect(() => {
    ;(async () => {
      const infoBanking = new VietcomBankService(amount)

      setQrCode(infoBanking.qrCode)
      setMessage(infoBanking.message)
      setIdBanking(infoBanking.idBanking)
    })()
  }, [])

  const checkBanking = async () => {
    if (isMobile) {
      VietcomBankService.openDeepLink(amount, message)
    } else {
      setLoadingCheck(true)
      setLoadingCheck(false)
    }
  }

  const handleCallBack = () => {
    callback(idBanking, message)
  }

  return (
    <div className='flex md:flex-row md:py-1 mt-2 overflow-y-auto flex-col md:gap-5 gap-2 md:justify-center w-full'>
      {isMobile ? (
        <div className='relative w-[90%] flex-1  m-auto  flex md:pb-0  aspect-square overflow-hidden'>
          {/* <Image preview={false} src={qrCode} alt='QR' className='!relative !w-full !h-auto' /> */}
          <MyImage src={qrCode} alt='QR' className='!relative !w-full !h-auto' />
        </div>
      ) : (
        <div className='relative w-full flex-1 flex md:pb-0  aspect-square overflow-hidden'>
          <div className='absolute w-full aspect-square flex justify-center items-center'>
            <div className='relative md:w-full   aspect-square '>
              <Image preview={false} src={qrCode} alt='QR' className='!relative !w-full !h-auto ' />
            </div>
          </div>
        </div>
      )}

      <div className='flex flex-col flex-1 gap-2  '>
        <div className='flex gap-2'>
          <div className='font-bold'>NH : VietCombank</div>

          <div className='relative w-6 rounded-lg aspect-square overflow-auto'>
            <MyImage src={images.logoVCB} alt='logo VCB' className='!relative !w-full !h-auto ' />
          </div>
        </div>
        <div className='flex  md:gap-2 gap-1'>
          <span className='font-bold'>{`STK : `}</span>
          <TextCopy
            value={process.env.NEXT_PUBLIC_VCB_STK}
            textView={process.env.NEXT_PUBLIC_VCB_STK}
          />
        </div>
        <div className='flex  flex-col  gap-1'>
          <span className='font-bold'>{translate('textPopular.content')} :</span>
          <TextCopy value={message} textView={message} />
        </div>
        <div className='rounded-lg mt-1 flex p-3 w-full bg-[#f6cf83]'>
          <span className='mr-1'>
            <ExclamationCircleOutlined />
          </span>
          <span>Nội dung chuyển khoản phải ghi đúng để bạn khiếu nãi và kiểm tra hoá đơn.</span>
        </div>
        <div className='flex gap-3 mt-3'>
          {isMobile ? (
            <>
              <Button onClick={checkBanking} loading={loadingCheck} className='flex-1'>
                {translate('banking.openApp')}
              </Button>
              <Button
                onClick={handleCallBack}
                disabled={isBanking}
                type='primary'
                className='flex-1'
              >
                {translate('textPopular.sended')}
              </Button>
            </>
          ) : (
            <Button onClick={handleCallBack} disabled={isBanking} className='flex-1'>
              {translate('textPopular.sended')}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default InfoBanking
