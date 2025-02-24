'use client'
import MyTable, { ColumnsType } from '@/components/MyTable'
import TextCopy from '@/components/TextCopy'
import { PAGE_SIZE_LIMIT } from '@/constant/app'
import useVoucher from '@/hook/tank-query/Admin/useVoucher'
import useLanguage from '@/hook/useLanguage'
import useMedia from '@/hook/useMedia'
import useModalDrawer from '@/hook/useModalDrawer'
import useQuerySearch from '@/hook/useQuerySearch'
import useSearchBaseAdmin from '@/hook/useSearchBaseAdmin'
import { Button } from 'antd'
import { NextPage } from 'next'
import React from 'react'
import { VoucherProps } from './type'
import ModalConfig from './Component/ModalConfig'
import { numberWithCommas } from '@/utils/functions'
import { useCategoryMenu } from '@/zustand/useCategoryMenu'
import { formatDateTime } from '@/utils/momentFunc'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import ModalDelete from '@/components/ModalDelete'
import AdminApi from '@/services/adminApi'
import useCallbackToast from '@/hook/useCallbackToast'
import useRefreshQuery from '@/hook/tank-query/useRefreshQuery'
import { QUERY_KEY } from '@/constant/reactQuery'
import TextWithToggle from '@/components/TextWithToggle'

const VoucherScreen: NextPage = () => {
  const { queries } = useQuerySearch()
  const { isMobile } = useMedia()
  const { translate, lang } = useLanguage()
  const { categoryMenu } = useCategoryMenu()
  const { refreshQuery } = useRefreshQuery()
  const { data, isLoading, loadMore, hasNextPage, isFetchingNextPage } = useVoucher(queries)
  const { openModalDrawer, closeModalDrawer } = useModalDrawer()
  const { deleteError, deleteSuccess } = useCallbackToast()
  const { renderContent } = useSearchBaseAdmin({
    id: true,
  })

  const getNameCategories = (listType: string[]) => {
    const listTemp: string[] = []

    categoryMenu.forEach((e) => {
      if (listType.includes(e.keyName)) {
        listTemp.push(e.lang![lang])
      }
    })

    return <div>{listTemp.join(', ')}</div>
  }

  const getColumns = (): ColumnsType[] => {
    if (isMobile) {
      const columns: ColumnsType[] = [
        {
          title: translate('textPopular.infor'),
          dataIndex: 'type',
          render: (type: string, record: VoucherProps) => {
            return (
              <div className='flex flex-col gap-1'>
                <div className='flex justify-between text-xs'>
                  <div>{formatDateTime(record.date)}</div>
                  <div>{formatDateTime(record.expired)}</div>
                </div>

                <div className='flex gap-1'>
                  <span className='font-bold'>{`${translate('header.name')} :`}</span>
                  <TextCopy value={type} textView={record.name} />
                </div>
                <div className='flex gap-1 flex-wrap'>
                  <span className='font-bold'>{`${translate('textPopular.menuCategory')} :`}</span>
                  <div>{getNameCategories(record.categoriesProduct || [])}</div>
                </div>
                <div className='flex gap-1 flex-wrap'>
                  <span className='font-bold'>{`${translate('textPopular.disCount')} :`}</span>
                  <span>{numberWithCommas(record.disCount || '0')}</span>
                </div>
                <div className='flex gap-1 flex-wrap'>
                  <span className='font-bold'>{`${translate('textPopular.amount')} :`}</span>
                  <span>{numberWithCommas(record.amount || '0')}</span>
                </div>
                <div className='flex gap-1 flex-wrap'>
                  <span className='font-bold'>{`${translate('voucher.amountApplied')} :`}</span>
                  <span>{numberWithCommas(record.amountApplied || '0')}</span>
                </div>
                <div className='flex gap-1 flex-col w-full justify-start'>
                  <div className='font-bold w-full text-left'>{`${translate(
                    'textPopular.note'
                  )} :`}</div>
                  <TextWithToggle limit={50} text={record.note} />
                </div>
                <div className='flex gap-3 mt-1'>
                  <Button onClick={() => handleConfig(record)}>{translate('common.update')}</Button>
                  <Button type='primary' onClick={() => handleDelete(record)}>
                    {translate('common.delete')}
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
        title: translate('textPopular.menuCategory'),
        dataIndex: 'type',
        render: (type: string) => {
          const textView: any = `textPopular.${type}`
          return <TextCopy value={type} textView={translate(textView)} />
        },
      },

      {
        title: translate('header.name'),
        dataIndex: 'name',
        render: (name: string) => {
          return <span>{name}</span>
        },
      },
      {
        title: translate('textPopular.disCount'),
        dataIndex: 'disCount',
        render: (disCount: string) => {
          return <span>{numberWithCommas(disCount)}</span>
        },
      },
      {
        title: translate('textPopular.menuCategory'),
        dataIndex: 'categoriesProduct',
        render: (categoriesProduct: string[]) => {
          return getNameCategories(categoriesProduct)
        },
      },
      {
        title: translate('textPopular.dateStart'),
        dataIndex: 'date',
        render: (date: number) => {
          return <div className='whitespace-nowrap'>{formatDateTime(date)}</div>
        },
      },
      {
        title: translate('textPopular.dateEnd'),
        dataIndex: 'expired',
        render: (expired: number) => {
          return <div className='whitespace-nowrap'>{formatDateTime(expired)}</div>
        },
      },
      {
        title: translate('textPopular.amount'),
        dataIndex: 'amount',
        render: (amount: number) => {
          return <div className='whitespace-nowrap'>{numberWithCommas(amount)}</div>
        },
      },
      {
        title: translate('voucher.amountApplied'),
        dataIndex: 'amountApplied',
        render: (amountApplied: number) => {
          return <div className='whitespace-nowrap'>{numberWithCommas(amountApplied)}</div>
        },
      },
      {
        title: '',
        dataIndex: 'expired',
        fixed: 'right',
        render: (_: number, record: VoucherProps) => {
          return (
            <div className='flex gap-2 items-center'>
              <div className='text-2xl text-green-500'>
                <EditOutlined
                  className='hover:scale-105 cursor-pointer'
                  style={{ fontSize: 24 }}
                  onClick={() => handleConfig(record)}
                />
              </div>
              <div className='text-red-500'>
                <DeleteOutlined
                  onClick={() => handleDelete(record)}
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

  const handleConfig = (item?: VoucherProps) => {
    openModalDrawer({
      content: <ModalConfig data={item} />,
      useDrawer: true,
      title: item ? `${translate('common.update')} ${item.name}` : translate('common.create'),
    })
  }

  const handleDelete = (item: VoucherProps) => {
    const callback = async () => {
      const res = await AdminApi.deleteVoucher(item._id!, [])
      if (res.data) {
        await refreshQuery(QUERY_KEY.VoucherAdmin)
        deleteSuccess()
      } else {
        closeModalDrawer()
        deleteError()
      }
    }
    openModalDrawer({
      content: <ModalDelete callback={callback} />,
    })
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
        loadMore={loadMore}
        hasMoreData={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        extra={<Button onClick={() => handleConfig()}>{translate('common.addNew')}</Button>}
      />
    </div>
  )
}

export default VoucherScreen
