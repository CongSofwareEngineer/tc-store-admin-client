import MyTable, { ColumnsType } from '@/components/MyTable'
import TextCopy from '@/components/TextCopy'
import { DEFAULT_FEE_SHIP, FILTER_BILL, PAGE_SIZE_LIMIT } from '@/constant/app'
import useBillAdmin from '@/hook/tank-query/Admin/useBillAdmin'
import useModalDrawer from '@/hook/useModalDrawer'
import useSearchBaseAdmin from '@/hook/useSearchBaseAdmin'
import {
  ellipsisText,
  formatPrice,
  getColorStatus,
  getTotalBill,
  numberWithCommas,
} from '@/utils/functions'
import React from 'react'
import ItemDetail from './Components/Itemdetail'
import ModalDelete from '@/components/ModalDelete'
import useLanguage from '@/hook/useLanguage'
import useRefreshQuery from '@/hook/tank-query/useRefreshQuery'
import { QUERY_KEY } from '@/constant/reactQuery'
import useQuerySearch from '@/hook/useQuerySearch'
import { formatDateTime } from '@/utils/momentFunc'
import { Button } from 'antd'
import useMedia from '@/hook/useMedia'
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'
import { DEFAULT_RATE_EXP_USER } from '../../../constant/app'
import AdminApi from '@/services/adminApi'
import useCallbackToast from '@/hook/useCallbackToast'
import useFirstLoadPage from '@/hook/useFirstLoadPage'
import { IBill } from '@/type'

const BillAdminScreen = () => {
  useFirstLoadPage()
  const { queries } = useQuerySearch()
  const { data, isLoading } = useBillAdmin(queries)
  const { openModalDrawer, closeModalDrawer } = useModalDrawer()
  const { translate } = useLanguage()
  const { refreshQuery } = useRefreshQuery()
  const { isMobile } = useMedia()
  const { deleteSuccess, deleteError, updateError, updateSuccess } = useCallbackToast()

  const { renderContent } = useSearchBaseAdmin(
    {
      status: true,
      dateEnd: true,
      dateStart: true,
      id: true,
    },
    {
      id: translate('bill.id'),
    }
  )

  const getAmountBuy = (item: IBill) => {
    let amount = 0
    item.listBill.forEach((e) => {
      amount += e.amountBuy
    })
    return amount
  }

  const handleSubmit = (item: any) => {
    let title = translate('admin.bill.doYouWantChangeDelivering')
    let status = FILTER_BILL.Delivering

    if (item.status === FILTER_BILL.Delivering) {
      status = FILTER_BILL.DeliverySuccess
      title = translate('admin.bill.doYouWantChangeDeliverySuccess')
    }

    const callBackUpdate = async () => {
      const body: any = {
        status,
        idUser: item.idUser,
        exp: item.totalBill * DEFAULT_RATE_EXP_USER,
      }

      if (status === FILTER_BILL.DeliverySuccess) {
        const listNewSoldProduct: any[] = []
        item.listBill.forEach((e: any) => {
          const item = {
            sold: e.amount + e.more_data.sold,
            idProduct: e._id,
            configBill: e.configBill || {},
            category: e.more_data.category,
          }
          listNewSoldProduct.push(item)
        })

        body.listNewSoldProduct = listNewSoldProduct
      }

      const res = await AdminApi.updateBill(item._id, body)

      if (res?.data) {
        updateSuccess()
        refreshQuery(QUERY_KEY.BillAdmin)
      } else {
        updateError()
      }
      closeModalDrawer()
    }

    const abortBill = async () => {
      status = FILTER_BILL.DeliveryFail

      const body: any = {
        status,
        idUser: item.idUser,
        exp: item.totalBill * DEFAULT_RATE_EXP_USER,
      }

      const res = await AdminApi.updateBill(item._id, body)

      if (res?.data) {
        updateSuccess()
        refreshQuery(QUERY_KEY.BillAdmin)
      } else {
        updateError()
      }
    }

    if (item.status === FILTER_BILL.Processing) {
      openModalDrawer({
        content: <ModalDelete title={title} callback={callBackUpdate} />,
      })
    }

    if (item.status === FILTER_BILL.Delivering) {
      openModalDrawer({
        content: (
          <ModalDelete
            titleReject={translate('common.cancelBill')}
            reject={abortBill}
            title={title}
            callback={callBackUpdate}
          />
        ),
      })
    }
  }

  const handleDelete = async (id: string) => {
    const callback = async () => {
      const data = await AdminApi.deleteBill(id)
      if (data?.data) {
        deleteSuccess()
        refreshQuery(QUERY_KEY.BillAdmin)
      } else {
        deleteError()
      }
      closeModalDrawer()
    }

    openModalDrawer({
      content: <ModalDelete title='Do you delete Bill' callback={callback} />,
    })
  }

  const handleViewDetail = (item: any) => {
    openModalDrawer({
      content: <ItemDetail data={item} />,
      useDrawer: true,
      title: translate('bill.infoBill'),
      configDrawer: {
        placement: 'bottom',

        height: 'auto',
      },
    })
  }

  const getStatus = (key: string) => {
    switch (key) {
      case FILTER_BILL.Processing:
        return translate('myBill.processing')

      case FILTER_BILL.Canceled:
        return translate('common.cancelOrder')

      case FILTER_BILL.Delivering:
        return translate('myBill.delivering')

      default:
        return translate('myBill.deliverySuccess')
    }
  }

  const renderStatus = (status: string) => {
    switch (status) {
      case FILTER_BILL.Processing:
        return <span className='text-blue-700 font-bold'>{translate('myBill.processing')}</span>
      case FILTER_BILL.Delivering:
        return <span className='text-green-500 font-bold'>{translate('myBill.delivering')}</span>

      case FILTER_BILL.Canceled:
        return <span className='text-red-500 font-bold'>{translate('common.cancelBill')}</span>

      default:
        return (
          <span className='text-green-500 font-bold'>{translate('myBill.deliverySuccess')}</span>
        )
    }
  }

  const getColumns = () => {
    if (isMobile) {
      const columns: ColumnsType[] = [
        {
          title: translate('textPopular.infor'),
          key: 'status',
          dataIndex: 'status',
          filters: [
            {
              text: getStatus(FILTER_BILL.DeliverySuccess),
              value: FILTER_BILL.DeliverySuccess,
            },
            {
              text: getStatus(FILTER_BILL.Delivering),
              value: FILTER_BILL.Delivering,
            },
            {
              text: getStatus(FILTER_BILL.Processing),
              value: FILTER_BILL.Processing,
            },
            {
              text: getStatus(FILTER_BILL.Canceled),
              value: FILTER_BILL.Canceled,
            },
          ],
          onFilter: (value: any, record: any) => record.status === value,
          render: (_: any, record: any) => {
            return (
              <div className='flex flex-col gap-2'>
                <div className='flex gap-2'>
                  <span className='font-bold'>{`${translate('bill.dateBuy')} :`}</span>
                  <span className='text-nowrap'>{formatDateTime(parseInt(record?.date))}</span>{' '}
                </div>
                <div className='flex gap-2'>
                  <span className='font-bold'>ID: </span>
                  <TextCopy textView={record._id} />
                </div>
                <div className='flex gap-2'>
                  <span className='font-bold'>SĐT :</span>
                  <TextCopy textView={record.sdt} />
                </div>
                <div className='flex gap-2'>
                  <span className='font-bold'>{`${translate('textPopular.amount')} :`}</span>
                  <span>{getAmountBuy(record)}</span>
                </div>
                <div className='flex gap-2'>
                  <span className='font-bold'>{`${translate('textPopular.status')} :`}</span>
                  {renderStatus(record.status)}
                </div>
                <div className='flex gap-2'>
                  <span className='font-bold'>{`${translate('textPopular.totalMoney')} :`}</span>
                  <span className='text-green-500 font-bold'>
                    {numberWithCommas(getTotalBill(record))}
                  </span>
                </div>

                <div className='flex gap-5 md:flex-row'>
                  {record?.status !== FILTER_BILL.DeliverySuccess && (
                    <Button className='md:w-[150px] w-full' onClick={() => handleSubmit(record)}>
                      {translate('common.update')}
                    </Button>
                  )}
                  <Button onClick={() => handleViewDetail(record)} type='primary'>
                    {translate('common.view')}
                  </Button>
                </div>
              </div>
            )
          },
        },
      ]
      return columns
    }
    const columns: ColumnsType[] = [
      {
        title: translate('bill.id'),
        key: '_id',
        dataIndex: '_id',
        render: (id: any) => {
          return <TextCopy value={id} textView={ellipsisText(id, 2, 2)} />
        },
      },
      {
        title: 'SDT',
        key: 'sdt',
        dataIndex: 'sdt',
        render: (sdt: any) => {
          return <TextCopy value={sdt} textView={ellipsisText(sdt, 4, 4)} />
        },
      },

      {
        title: translate('bill.totalBill'),
        key: 'totalBill',
        dataIndex: 'totalBill',
        render: (_: any, record: IBill) => {
          return <div className='text-green-500'>{numberWithCommas(getTotalBill(record))}</div>
        },
      },
      {
        title: translate('textPopular.disCount'),
        key: 'discount',
        dataIndex: 'discount',
        render: (discount: any) => {
          return (
            <div className='text-green-500 whitespace-nowrap'>{numberWithCommas(discount)}</div>
          )
        },
      },
      {
        title: translate('bill.dateBuy'),
        key: 'date',
        dataIndex: 'date',
        render: (date: any) => {
          return <div className='whitespace-nowrap'>{formatDateTime(parseInt(date))}</div>
        },
      },
      {
        title: translate('textPopular.addressShip'),
        key: 'addressShip',
        dataIndex: 'addressShip',
        render: (addressShip: any) => {
          return (
            <div className='flex gap-1'>
              <div>{`${addressShip.addressDetail} (${addressShip.address.replaceAll('---', ', ')})`}</div>
            </div>
          )
        },
      },

      {
        title: translate('textPopular.status'),
        key: 'status',
        dataIndex: 'status',
        filters: [
          {
            text: getStatus(FILTER_BILL.DeliverySuccess),
            value: FILTER_BILL.DeliverySuccess,
          },
          {
            text: getStatus(FILTER_BILL.Delivering),
            value: FILTER_BILL.Delivering,
          },
          {
            text: getStatus(FILTER_BILL.Processing),
            value: FILTER_BILL.Processing,
          },
          {
            text: getStatus(FILTER_BILL.Canceled),
            value: FILTER_BILL.Canceled,
          },
        ],
        onFilter: (value, record) => record.status === value,
        render: (status: any) => {
          return (
            <div className='font-bold whitespace-nowrap' style={{ color: getColorStatus(status) }}>
              {getStatus(status)}
            </div>
          )
        },
      },
      {
        title: 'Action',
        key: 'addressShip',
        dataIndex: 'addressShip',
        fixed: 'right',
        render: (_: any, record: any) => {
          return (
            <div className='flex gap-2  items-center justify-end'>
              {record?.status !== FILTER_BILL.DeliverySuccess && (
                <div className='text-2xl text-green-500'>
                  <EditOutlined
                    className='hover:scale-105 cursor-pointer'
                    style={{ fontSize: 24 }}
                    onClick={() => handleSubmit(record)}
                  />
                </div>
              )}
              <EyeOutlined
                className='hover:scale-105 cursor-pointer'
                onClick={() => handleViewDetail(record)}
                style={{ fontSize: 24 }}
              />

              <div className='text-red-500'>
                <DeleteOutlined
                  onClick={() => handleDelete(record._id)}
                  className='hover:scale-105 cursor-pointer'
                  style={{ fontSize: 24 }}
                />
              </div>
            </div>
          )
        },
      },
    ]

    return columns
  }
  return (
    <div className='flex flex-col gap-3 w-full'>
      {renderContent()}
      <MyTable
        columns={getColumns()}
        loading={isLoading}
        data={data || []}
        limit={PAGE_SIZE_LIMIT}
        total={20}
      />
    </div>
  )
}

export default BillAdminScreen
