'use client'
import CaptchaOtp from '@/components/CaptchaOtp'
import ButtonForm from '@/components/Form/ButtonForm'
import InputForm from '@/components/Form/InputForm'
import MyForm from '@/components/Form/MyForm'
import { images } from '@/configs/images'
import { BodyUserData } from '@/constant/firebase'
import useAos from '@/hook/useAos'
import useCheckForm from '@/hook/useCheckForm'
import useFirstLoadPage from '@/hook/useFirstLoadPage'
import useLanguage from '@/hook/useLanguage'
import useMedia from '@/hook/useMedia'
import useModalDrawer from '@/hook/useModalDrawer'
import useRoutePage from '@/hook/useRoutePage'
import useUserData from '@/hook/useUserData'
import ClientApi from '@/services/clientApi'
import { encryptData } from '@/utils/crypto'
import { showNotificationError } from '@/utils/notification'
import { Checkbox } from 'antd'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const RegisterScreen = () => {
  useAos()
  useFirstLoadPage()
  const { translate } = useLanguage()
  const { openModalDrawer, closeModalDrawer } = useModalDrawer()
  const router = useRoutePage()
  const { checkNumberPhone, checkPassword } = useCheckForm()
  const { isMobile } = useMedia()
  const { login } = useUserData()

  const [formData, setFormData] = useState<any>(null)
  const [loadingRegister, setLoadingRegister] = useState(false)

  useEffect(() => {
    const footer = window.document.getElementsByClassName('main-content')[0]
    if (footer) {
      footer.classList.add('bg-custom-register')
    }
    const initData = {
      name: '',
      sdt: '',
      pass: '',
      passAgain: '',
      sex: true,
      saveLogin: true,
    }
    setFormData(initData)
    return () => footer.classList.remove('bg-custom-register')
  }, [])

  const handleRegister = async () => {
    const bodyUser: BodyUserData = {
      addressShipper: [],
      exp: 0,
      sdt: formData.sdt,
      sex: formData.sex,
      isAdmin: false,
      name: formData.name,
      pass: encryptData(formData.pass),
      avatar: '',
      address: '',
    }
    const newData = await ClientApi.register(bodyUser)
    if (!newData?.data) {
      showNotificationError(translate('register.exitSDT'))
    } else {
      await login(formData.sdt, formData.pass, !!formData?.saveLogin)
    }

    closeModalDrawer()
    setLoadingRegister(false)
  }

  const handleSubmit = async () => {
    setLoadingRegister(true)
    if (formData.pass !== formData.passAgain) {
      showNotificationError(translate('warning.passAgain'))
      setLoadingRegister(false)
      return
    }

    const isExitedSDT = await ClientApi.checkSDT(formData.sdt)
    setLoadingRegister(false)
    if (isExitedSDT?.data) {
      showNotificationError(translate('register.exitSDT'))
    } else {
      openModalDrawer({
        content: <CaptchaOtp numberPhone={formData.sdt} callback={handleRegister} />,
        title: translate('verifyNumberPhone.title'),
        configModal: {
          overClickClose: false,
          showBtnClose: false,
        },
      })
    }
  }

  return (
    <div className='h-full max-w-[1000px] relative flex justify-center m-auto'>
      <div className='w-full flex justify-between h-full items-center'>
        {!isMobile && (
          <div
            data-aos='fade-right'
            className='flex-1 flex flex-col justify-center items-center max-w-[450px]'
          >
            <Image
              fill
              alt={'tc-store-logo-register'}
              className='cursor-pointer !relative !w-full !h-auto'
              onClick={() => router.push('/')}
              src={images.logoStore}
            />
          </div>
        )}

        <div data-aos='fade-left' className='flex justify-start items-start md:w-fit w-full'>
          <div className='m-auto flex flex-col md:w-[450px] w-full shadow-md p-8 rounded-[16px] justify-center align-middle bg-white'>
            <h1 className='mb- uppercase font-bold text-center text-[16px]'>
              {translate('register.title')}
            </h1>
            <MyForm
              onValuesChange={(_, value) => setFormData({ ...formData, ...value })}
              formData={formData}
              onFinish={handleSubmit}
            >
              <div className='flex flex-col w-full'>
                <InputForm
                  name='sdt'
                  required
                  validator={checkNumberPhone}
                  label={translate('productDetail.modalBuy.enterNumberPhone')}
                />

                <InputForm
                  showCount
                  maxLength={24}
                  name='name'
                  required
                  label={translate('productDetail.modalBuy.enterName')}
                />

                <InputForm
                  showCount
                  name='pass'
                  maxLength={15}
                  isPass
                  required
                  validator={checkPassword}
                  label={translate('register.enterPassWord')}
                />
                <InputForm
                  name='passAgain'
                  isPass
                  maxLength={15}
                  required
                  label={translate('register.enterPassWordAgain')}
                />
                <div className='flex gap-2 mb-2 '>
                  <div>{translate('userDetail.sex')} :</div>

                  <Checkbox
                    checked={formData?.sex}
                    onChange={() => setFormData({ ...formData, sex: true })}
                  >
                    {translate('textPopular.male')}
                  </Checkbox>
                  <Checkbox
                    checked={!formData?.sex}
                    onChange={() => setFormData({ ...formData, sex: false })}
                  >
                    {translate('textPopular.female')}
                  </Checkbox>
                </div>
                <div className='flex gap-2 my-2 relative top-[-5px]'>
                  <div>{translate('register.saveRegister')} :</div>
                  <Checkbox
                    checked={formData?.saveLogin}
                    onChange={() =>
                      setFormData({
                        ...formData,
                        saveLogin: !formData?.saveLogin,
                      })
                    }
                  />
                </div>

                <ButtonForm
                  loading={loadingRegister}
                  classNameItem='w-full'
                  className='w-full'
                  disableClose
                  titleSubmit={translate('header.register')}
                />
              </div>
            </MyForm>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterScreen
