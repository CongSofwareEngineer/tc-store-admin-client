'use client'
import CaptchaOtp from '@/components/CaptchaOtp'
import useModalDrawer from '@/hook/useModalDrawer'
import { FirebaseServices } from '@/services/firebaseService'
import { Button } from 'antd'
import { RecaptchaVerifier } from 'firebase/auth'
import React, { useEffect, useState } from 'react'

const AptCha = () => {
  const [numberPhone] = useState('+84392225405')
  const { openModalDrawer } = useModalDrawer()

  const handleVerify = () => {
    openModalDrawer({
      content: <CaptchaOtp numberPhone={numberPhone} />,
      title: 'Verify number phone',
      configModal: {
        overClickClose: false,
        showBtnClose: false,
      },
    })
  }
  return (
    <div>
      <Button onClick={handleVerify}>handleVerify</Button>
    </div>
  )
}

export default AptCha
