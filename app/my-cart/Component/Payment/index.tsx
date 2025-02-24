import React, { useEffect, useMemo, useState } from 'react'
import { PaymentPageType } from '../../type'
import useLanguage from '@/hook/useLanguage'
import useUserData from '@/hook/useUserData'
import useRefreshQuery from '@/hook/tank-query/useRefreshQuery'
import { numberWithCommas } from '@/utils/functions'
import { QUERY_KEY } from '@/constant/reactQuery'
import { BodyAddBill } from '@/constant/firebase'
import MyForm from '@/components/Form/MyForm'
import BtnBack from './Component/BtnBack'
import BillFinal from './Component/BillFinal'
import ContentForm from './Component/ContentForm'
import useOptionPayment from '@/hook/useOptionPayment'
import ViewListOrder from './Component/ViewListOrder'
import {
  DEFAULT_FEE_SHIP,
  DEFAULT_RATE_EXP_USER,
  FILTER_BILL,
  OPTIONS_PAYMENT,
} from '@/constant/app'
import ModalProcess from '@/components/ModalProcess'
import useModalDrawer from '@/hook/useModalDrawer'
import ModalSuccess from '@/components/ModalSuccess'
import ClientApi from '@/services/clientApi'
import OptionsPayment from './Component/OptionsPayment'
import { showNotificationError } from '@/utils/notification'
import ModalDelete from '@/components/ModalDelete'
import useRoutePage from '@/hook/useRoutePage'
import InfoBanking from '@/components/InfoBanking'

const Payment = ({ dataCart, clickBack, showBack = true }: PaymentPageType) => {
  const { translate } = useLanguage()
  const { userData, isLogin } = useUserData()
  const { refreshListQuery } = useRefreshQuery()
  const { openModalDrawer, closeModalDrawer } = useModalDrawer()
  const route = useRoutePage()

  const [formData, setFormData] = useState<Record<string, any> | null>(null)
  const [loading, setLoading] = useState(false)
  const { onChangeOptions, listOptions, optionSelected } = useOptionPayment(null, { banking: true })

  useEffect(() => {
    const initData = {
      sdt: userData?.sdt || '',
      name: userData?.name,
      addressShip: userData?.addressShipper[0] || '',
      linkContact: userData?.linkContact || '',
      gmail: userData?.gmail || '',
      noteBil: '',
    }
    setFormData(initData)
  }, [userData, dataCart])

  const isValidSubmit = useMemo(() => {
    if (!formData?.addressShip) {
      return false
    }
    return !!formData?.addressShip.addressDetail
  }, [formData])

  const onChangeAddressShip = (item: any) => {
    setFormData({
      ...formData,
      addressShip: {
        ...item,
      },
    })
  }

  const getTotalPayBill = (plusFee = false) => {
    let total = 0
    dataCart.forEach((e) => {
      if (e.selected) {
        if (e?.selected) {
          total = Number(e.amount) * Number(e.more_data.price) + total
        }
      }
    })
    return numberWithCommas(total + (plusFee ? DEFAULT_FEE_SHIP : 0))
  }

  const getItemForShow = (e: any) => {
    if (e?.moreConfig) {
      return e?.moreConfig
    }
    return e.more_data || {}
  }

  const callbackProcessing = () => {
    openModalDrawer({
      content: (
        <ModalProcess
          title={translate('confirm.bill.createBill')}
          des={translate('confirm.bill.createBill_Des')}
        />
      ),
      configModal: {
        overClickClose: false,
      },
    })
  }

  const callbackSuccess = async () => {
    await refreshListQuery([
      QUERY_KEY.LengthCartUser,
      QUERY_KEY.MyCartUser,
      QUERY_KEY.GetAllNests,
      QUERY_KEY.GetAllProduct,
      QUERY_KEY.GetShoesShop,
    ])
    openModalDrawer({
      content: (
        <ModalSuccess
          showClose
          title={translate('productDetail.modalBuy.success')}
          des={translate('productDetail.modalBuy.successDes')}
          titleSubmit={translate('common.viewBill')}
          titleClose={translate('common.ok')}
          callback={() => {
            route.push('/my-page/bill')
            closeModalDrawer()
          }}
        />
      ),
      configModal: {
        width: '500px',
      },
    })
  }

  const handleSubmitBuy = async (idBanking?: string, mess?: string, bodyAPI?: BodyAddBill) => {
    let res: any = null

    if (idBanking) {
      bodyAPI!.infoBanking = {
        id: idBanking,
        messages: mess,
      }
    }

    if (isLogin) {
      res = await ClientApi.buy(bodyAPI!)
    } else {
      res = await ClientApi.buyNoLogin(bodyAPI!)
    }
    console.log({ res })

    if (res?.data) {
      await callbackSuccess()
      clickBack()
    } else {
      showNotificationError(translate('productDetail.modalBuy.error'))
    }
  }

  const handleSubmit = async () => {
    const callBack = async () => {
      setLoading(true)
      callbackProcessing()

      let totalBill = 0
      const listBill: any[] = []
      const listNewSoldProduct: any[] = []

      dataCart.forEach((e) => {
        if (e.selected) {
          totalBill += e.amount * getItemForShow(e).price
          const itemBill = {
            _id: getItemForShow(e)._id,
            keyName: getItemForShow(e).keyName,
            amount: e.amount,
            idCart: e._id,
            configBill: e?.configBill || {},
          }
          const itemNewSold = {
            idProduct: getItemForShow(e)._id,
            sold: Number(e.amount) + Number(getItemForShow(e).sold),
          }

          listNewSoldProduct.push(itemNewSold)
          listBill.push(itemBill)
        }
      })

      const bodyAPI: BodyAddBill = {
        addressShip: formData?.addressShip,
        discount: 0,
        idUser: userData?._id || undefined,
        listBill,
        name: userData?.name || 'no-name',
        totalBill: totalBill,
        sdt: formData?.sdt,
        status: FILTER_BILL.Processing,
        listNewSoldProduct,
      }

      if (isLogin) {
        const expUser = totalBill * DEFAULT_RATE_EXP_USER + (userData?.exp || 0)
        bodyAPI.expUser = expUser
      }
      if (optionSelected.value === OPTIONS_PAYMENT.banking) {
        openModalDrawer({
          content: (
            <InfoBanking
              callback={(id, mess) => handleSubmitBuy(id, mess, bodyAPI)}
              amount={totalBill + DEFAULT_FEE_SHIP}
            />
          ),
          useDrawer: true,
          configModal: {
            className: '!w-[700px]',
          },
          title: translate('banking.title'),
        })
      } else {
        handleSubmitBuy('', '', bodyAPI)
      }
    }

    openModalDrawer({
      content: (
        <ModalDelete
          autoClose={false}
          callback={callBack}
          title={translate('confirm.bill.confirm')}
          des={translate('confirm.bill.confirm_des')}
          titleConfirm={translate('common.submit')}
        />
      ),
    })
  }

  return (
    <div className='w-full mb-7 mt-1'>
      {showBack && <BtnBack clickBack={clickBack} />}
      <div className='flex flex-col gap-3 w-full mt-1'>
        <MyForm
          onFinish={handleSubmit}
          formData={formData}
          onValuesChange={(_, value) => setFormData({ ...formData, ...value })}
        >
          <div className='flex lg:flex-row flex-col lg:gap-6 gap-5'>
            <div className='flex flex-1 flex-col lg:max-w-[calc(100%-300px)]'>
              <ContentForm onChange={onChangeAddressShip} />
              <ViewListOrder dataCart={dataCart} />
            </div>

            <div className='lg:w-[300px] flex flex-col md:gap-6 gap-5'>
              <OptionsPayment
                onChangeOptions={onChangeOptions}
                listOptions={listOptions}
                optionSelected={optionSelected}
              />
              <BillFinal
                disabledSubmit={!isValidSubmit}
                loading={loading}
                totalBill={getTotalPayBill()}
                totalBillFeeShip={getTotalPayBill(true)}
              />
            </div>
          </div>
        </MyForm>
      </div>
    </div>
  )
}

export default Payment
