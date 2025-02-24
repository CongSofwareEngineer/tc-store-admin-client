import useCheckForm from '@/hook/useCheckForm'
import React from 'react'
import useLanguage from '@/hook/useLanguage'
import { images } from '@/configs/images'
// import OptionVnLocation from '../OptionVnLocation'
import InputForm from '../Form/InputForm'
import Image from 'next/image'
import dynamic from 'next/dynamic'
const OptionVnLocation = dynamic(() => import('../OptionVnLocation'), { ssr: false })

const ContentFormPayment = ({ onChange }: { onChange: (param: any) => void }) => {
  const { checkNumberPhone } = useCheckForm()
  const { translate } = useLanguage()

  return (
    <div className='bg-white flex flex-col w-full border-[1px] shadow-gray1 border-gray-300  px-4 pt-4 lg:pb-0 pb-3'>
      <div className='flex w-full gap-2'>
        <div>
          <Image
            src={images.userDetail.iconUserDetail}
            alt='my-cart-infoReceived'
            fill
            className='!relative !w-[25px] !h-[25px]'
          />
        </div>
        <div className='text-medium font-semibold'>{translate('bill.infoReceived')}</div>
      </div>

      <div className='relative w-full border-[1px] my-3 border-gray-300' />

      <div className='flex md:gap-6   flex-col md:grid md:grid-cols-2  '>
        <InputForm
          validator={checkNumberPhone}
          required
          name='sdt'
          label={translate('userDetail.sdt')}
          classFromItem='w-full'
        />
        <InputForm
          required
          name='name'
          label={translate('userDetail.name')}
          classFromItem='w-full'
          maxLength={24}
          showCount
        />
      </div>

      <OptionVnLocation isNew={false} callback={onChange} />

      <div className='md:mt-2 mt-1' />

      <InputForm
        typeBtn='area'
        maxLength={200}
        showCount
        rows={2}
        name='noteBil'
        label={translate('bill.noteBill')}
      />
      <div className='md:mb-5 w-full' />
    </div>
  )
}

export default ContentFormPayment
