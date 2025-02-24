import InputForm from '@/components/Form/InputForm'
import useUserData from '@/hook/useUserData'
import React from 'react'
import SelectInputEx from '../SelectInputEx'
import useLanguage from '@/hook/useLanguage'
type PropsType = {
  listAddressShip: string[]
  setListAddressShip: (param: string[]) => void
}
const OptionAddressShip = ({ listAddressShip, setListAddressShip }: PropsType) => {
  const { isLogin, refreshLogin } = useUserData()
  const { translate } = useLanguage()

  const getOptions = () => {
    if (Array.isArray(listAddressShip) && listAddressShip?.length > 0) {
      return listAddressShip.map((e) => ({ name: e, value: e }))
    }
    return []
  }

  const handleAddAddress = async (address: string) => {
    const arrNew: string[] = [...listAddressShip, address]
    const handleUpdate = async () => {
      // await ClientApi.updateAddress(userData?.id, arrNew)
      await refreshLogin()
    }
    handleUpdate()
    setListAddressShip(arrNew)
  }

  return isLogin ? (
    <SelectInputEx
      required
      callBackAdd={(e) => handleAddAddress(e)}
      name='addressShip'
      label={translate('productDetail.modalBuy.enterAddress')}
      options={getOptions()}
      configSelect={{
        showSearch: true,
      }}
    />
  ) : (
    <>
      <InputForm
        required
        name='addressShip'
        label={translate('textPopular.addressShip')}
        classFromItem='w-full'
      />
      <div className='md:mb-4' />
    </>
  )
}

export default OptionAddressShip
