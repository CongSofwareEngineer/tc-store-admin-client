import MyInput from '@/components/MyInput'
import useLanguage from '@/hook/useLanguage'
import useUserData from '@/hook/useUserData'
import { encryptData } from '@/utils/crypto'
import { Button } from 'antd'
import React, { useEffect, useState } from 'react'

const ModalEnterPassAgain = ({ callBack }: { callBack: () => void }) => {
  const { translate } = useLanguage()
  const { userData } = useUserData()

  const [passAgain, setPassAgain] = useState('')
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    setIsError(false)
  }, [passAgain])

  const handleSubmit = () => {
    if (userData?.pass === encryptData(passAgain)) {
      callBack()
    } else {
      setIsError(true)
    }
  }

  return (
    <div className='flex flex-col gap-2 justify-between'>
      <p className='text-medium text-center font-bold'>
        {translate('textPopular.enterPassToContinue')}
      </p>
      <div className='flex flex-col gap-2 w-full'>
        <div>{translate('userDetail.pass')} :</div>
        <MyInput
          type='password'
          maxLength={15}
          value={passAgain}
          onChangeText={(e) => setPassAgain(e?.toString() || '')}
        />
        <span className='text-xs text-red-600 h-4'>
          {isError && translate('warning.inValidPassWordAgain')}
        </span>
        <div className='flex justify-center w-full mt-2'>
          <Button onClick={handleSubmit} className='w-full'>
            {translate('common.ok')}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ModalEnterPassAgain
