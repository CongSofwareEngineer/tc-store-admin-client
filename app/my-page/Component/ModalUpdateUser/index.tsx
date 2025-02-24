import useCheckForm from '@/hook/useCheckForm'
import useLanguage from '@/hook/useLanguage'
import useModalDrawer from '@/hook/useModalDrawer'
import { useUserData as useUserDataZustand } from '@/zustand/useUserData'
import ClientApi from '@/services/clientApi'
import { decryptData, encryptData } from '@/utils/crypto'
import { showNotificationError, showNotificationSuccess } from '@/utils/notification'

import { Button, Checkbox, Input } from 'antd'
import { isEmpty } from 'lodash'
import React, { useEffect, useState } from 'react'
import { ZUSTAND } from '@/constant/zustand'
import secureLocalStorage from 'react-secure-storage'
import ObserverService from '@/services/observer'
import { OBSERVER_KEY } from '@/constant/app'

type PropsType = {
  keyType: string
  callBack?: (param?: string) => Promise<void>
  initValue?: string
  maxLength?: number
}

const ModalUpdateUser = ({ keyType, callBack, initValue, maxLength = 20 }: PropsType) => {
  const { setUserData, userData } = useUserDataZustand()
  const { closeModalDrawer } = useModalDrawer()
  const { translate } = useLanguage()
  const { checkNumberPhone } = useCheckForm()

  const [loading, setLoading] = useState(false)
  const [valueNew, setValueNew] = useState<string | boolean | undefined>('')

  useEffect(() => {
    setValueNew(() => getOldValue())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getOldValue = () => {
    switch (keyType) {
      case 'pass':
        return decryptData(userData?.pass?.toString())
      case 'sdt':
        return userData?.sdt?.toString()
      case 'sex':
        return !!userData?.sex
      case 'name':
        return userData?.name?.toString()
      default:
        return initValue?.toString()
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    let error = false
    let valueTemp = valueNew?.toString() || ''
    if (isEmpty(valueTemp)) {
      showNotificationError(translate('errors.empty'))
      error = true
    }

    switch (keyType) {
      case 'sdt':
        if (checkNumberPhone(valueTemp)) {
          showNotificationError(checkNumberPhone(valueTemp))
          error = true
        }
        break

      case 'pass':
        if (valueTemp.length < 4) {
          showNotificationError(translate('errors.minimumText'))
          error = true
        }
        valueTemp = encryptData(valueTemp)
        break
    }

    if (error) {
      setLoading(false)
      return
    }
    if (callBack) {
      await callBack(valueTemp)
    } else {
      const body = {
        [keyType]: valueTemp,
      }

      const res = await ClientApi.updateUser(userData?._id, body)

      if (!res?.error) {
        const userTemp: any = {
          ...userData,
          ...body,
        }

        setUserData(userTemp)
        if (secureLocalStorage.getItem(ZUSTAND.UserData)) {
          const userEncode = encryptData(JSON.stringify(userTemp))
          secureLocalStorage.setItem(ZUSTAND.UserData, userEncode)
        }

        showNotificationSuccess(translate('myPage.updateSuccess'))
      } else {
        showNotificationError(translate('error.expiredLogin'))
        ObserverService.emit(OBSERVER_KEY.LogOut)
      }
    }
    closeModalDrawer()
    setLoading(false)
  }

  return (
    <div>
      <div className='flex flex-col gap-1'>
        <div className='md:text-[14px] text-medium font-bold'>{translate('textPopular.now')} :</div>
        <div className=''>
          {keyType === 'sex' ? (
            <div className='flex gap-2'>
              <Checkbox checked={!!getOldValue()} disabled>
                {translate('textPopular.female')}
              </Checkbox>
              <Checkbox checked={!getOldValue()} disabled>
                {translate('textPopular.male')}
              </Checkbox>
            </div>
          ) : (
            <Input value={getOldValue()?.toString()} disabled />
          )}
        </div>

        <div className='md:text-[14px] text-medium font-bold mt-2'>
          {translate('textPopular.newValue')} :
        </div>
        <div className='w-full mt-1'>
          {keyType === 'sex' ? (
            <div className='flex gap-2'>
              <Checkbox checked={!!valueNew} onClick={() => setValueNew(true)}>
                {translate('textPopular.female')}
              </Checkbox>
              <Checkbox checked={!valueNew} onClick={() => setValueNew(false)}>
                {translate('textPopular.male')}
              </Checkbox>
            </div>
          ) : (
            <Input.TextArea
              rows={2}
              value={valueNew?.toString()}
              onChange={(e) => setValueNew(e.target.value)}
              maxLength={maxLength}
              showCount
            />
          )}
        </div>
        <div className='w-full mt-6'>
          <Button className='w-full' loading={loading} onClick={handleSubmit}>
            {translate('common.save')}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ModalUpdateUser
