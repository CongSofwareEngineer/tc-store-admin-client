'use client'
import ImageAdmin from '@/components/ImageAdmin'
import MyTable, { ColumnsType } from '@/components/MyTable'
import TextCopy from '@/components/TextCopy'
import { PAGE_SIZE_LIMIT } from '@/constant/app'
import useMedia from '@/hook/useMedia'
import useModalDrawer from '@/hook/useModalDrawer'
import useQuerySearch from '@/hook/useQuerySearch'
import useSearchBaseAdmin from '@/hook/useSearchBaseAdmin'
import { detectImg, ellipsisText, numberWithCommas } from '@/utils/functions'
import { Button } from 'antd'
import React, { useState } from 'react'
import ProductConfig from './Component/ModalConfig'
import useLanguage from '@/hook/useLanguage'
import Link from 'next/link'
import useListProductAdmin from '@/hook/tank-query/Admin/useListProductAdmin'
import ModalDelete from '@/components/ModalDelete'
import useRefreshQuery from '@/hook/tank-query/useRefreshQuery'
import { QUERY_KEY } from '@/constant/reactQuery'
import { showNotificationError, showNotificationSuccess } from '@/utils/notification'
import AdminApi from '@/services/adminApi'
import useFirstLoadPage from '@/hook/useFirstLoadPage'

const ProductAdminScreen = () => {
  useFirstLoadPage()
  const { renderContent } = useSearchBaseAdmin({
    keyName: true,
    category: true,
  })
  const { queries } = useQuerySearch()
  const { data, isLoading, hasNextPage, isFetchingNextPage, loadMore } = useListProductAdmin(
    PAGE_SIZE_LIMIT,
    queries
  )

  const { isMobile } = useMedia()
  const { openModalDrawer } = useModalDrawer()
  const { translate } = useLanguage()
  const { refreshQuery } = useRefreshQuery()

  const [isConfig, setIsConfig] = useState(false)
  const [itemConfig, setItemConfig] = useState<any>()

  const handleUpdate = (item: any) => {
    setItemConfig(item)
    setIsConfig(true)
    // openModalDrawer({
    //   content: <ProductConfig item={item} />,
    //   useDrawer: true,
    //   title: item ? `${translate('common.update')} ${item.name}` : translate('common.create'),
    //   configModal: {
    //     className: '!max-w-[1200px] !w-[85dvw]',
    //   },
    //   configDrawer: {
    //     height: 'auto',
    //     placement: 'bottom',
    //   },
    // })
  }

  const handleDelete = (item: any) => {
    const callback = async () => {
      const imagesDelete = [item?.imageMain, ...item?.imageMore]
      console.log({ imagesDelete })

      const res = await AdminApi.deleteProduct(item?._id, imagesDelete)
      if (res.data) {
        await refreshQuery(QUERY_KEY.GetListProductAdmin)
        showNotificationSuccess(translate('success.delete'))
      } else {
        showNotificationError(translate('error.delete'))
      }
    }

    openModalDrawer({
      content: <ModalDelete callback={callback} />,
    })
  }

  const renderItem = (name: string, value: any) => {
    return (
      <div className='flex gap-2 w-full items-center'>
        <span className='font-bold text-blue-900 text-nowrap'>{`${name} :`}</span>
        <span>{value}</span>
      </div>
    )
  }

  const getColumns = () => {
    if (isMobile) {
      return [
        {
          title: '_id',
          key: '_id',
          dataIndex: '_id',
          render: (_: any, record: any) => {
            return (
              <div className='flex flex-col gap-2'>
                {isMobile && (
                  <div className='aspect-square md:w-[200px] w-[100px] overflow-hidden m-auto'>
                    <ImageAdmin src={detectImg(record.imageMain)} />
                  </div>
                )}

                {isMobile && (
                  <Link className='text-medium font-bold' href={`/shop/${record.keyName}`}>
                    <p className='text-medium font-bold'>{record.name}</p>
                  </Link>
                )}
                <div className='flex gap-4 w-full'>
                  {!isMobile && (
                    <div className='aspect-square md:w-[200px] w-[100px] overflow-hidden m-auto'>
                      <ImageAdmin src={detectImg(record.imageMain)} />
                    </div>
                  )}
                  <div className='flex flex-1 flex-col'>
                    {!isMobile && (
                      <Link className='text-medium font-bold' href={`/shop/${record.keyName}`}>
                        <p className='text-medium font-bold'>{record.name}</p>
                      </Link>
                    )}
                    {renderItem(
                      translate('menuProduct.category'),
                      <TextCopy value={record.category} />
                    )}
                    {renderItem(translate('productDetail.price'), numberWithCommas(record.price))}
                    {renderItem(translate('textPopular.cost'), numberWithCommas(record.cost))}
                    {renderItem(translate('textPopular.amount'), numberWithCommas(record.amount))}
                    {renderItem(translate('productDetail.sold'), numberWithCommas(record.sold))}
                  </div>
                  {!isMobile && (
                    <div className='md:w-[100px] w-full flex flex-col justify-center items-center gap-4'>
                      <Button onClick={() => handleUpdate(record)} className='w-full'>
                        {translate('common.update')}
                      </Button>
                      <Button className='w-full' type='primary'>
                        {translate('common.delete')}
                      </Button>
                    </div>
                  )}
                </div>
                {isMobile && (
                  <div className='w-full flex  justify-center items-center gap-4'>
                    <Button onClick={() => handleUpdate(record)} className='w-full'>
                      {translate('common.update')}
                    </Button>
                    <Button onClick={() => handleDelete(record)} className='w-full' type='primary'>
                      {translate('common.delete')}
                    </Button>
                  </div>
                )}
              </div>
            )
          },
        },
      ]
    }
    const columns: ColumnsType[] = [
      {
        title: 'STT',
        key: '_id',
        dataIndex: '_id',
        render: (id: string, record: any, index: number) => {
          return <span>{index + 1}</span>
        },
      },
      {
        title: 'imageMain',
        key: 'imageMain',
        dataIndex: 'imageMain',
        fixed: 'left',
        render: (src?: string) => (
          <ImageAdmin src={src || ''} className='!w-[100px] !h-[100px] overflow-hidden' />
        ),
      },
      {
        title: translate('textPopular.nameProduct'),
        key: 'name',
        dataIndex: 'name',
        render: (name: string) => <TextCopy textView={ellipsisText(name)} value='id' />,
      },

      {
        title: translate('textPopular.amount'),
        key: 'amount',
        dataIndex: 'amount',
        render: (amount: string) => <span>{numberWithCommas(amount)}</span>,
      },
      {
        title: translate('productDetail.price'),
        key: 'price',
        dataIndex: 'price',
        render: (price: string) => <span>{numberWithCommas(price)}</span>,
      },

      {
        title: 'Gía nhập',
        key: 'cost',
        dataIndex: 'cost',
        render: (cost: string) => <span>{numberWithCommas(cost)}</span>,
      },
      {
        title: translate('productDetail.sold'),
        key: 'sold',
        dataIndex: 'sold',
        render: (sold: string) => <span>{numberWithCommas(sold)}</span>,
      },
      {
        title: translate('textPopular.disCount'),
        key: 'disCount',
        dataIndex: 'disCount',
        render: (disCount: string) => <span>{numberWithCommas(disCount)}</span>,
      },
      {
        title: '',
        key: 'disCount',
        dataIndex: 'disCount',
        fixed: 'right',
        render: (_: any, record: any) => (
          <div className='w-full flex flex-col justify-center items-center gap-4'>
            <Button onClick={() => handleUpdate(record)} className='w-full'>
              {translate('common.update')}
            </Button>
            <Button onClick={() => handleDelete(record)} className='w-full' type='primary'>
              {translate('common.delete')}
            </Button>
          </div>
        ),
      },
    ]
    return columns
  }

  return (
    <div className='flex flex-col w-full gap-3 overflow-y-auto '>
      {isConfig && (
        <div className='w-full h-full '>
          <ProductConfig
            closeConfig={() => {
              setItemConfig(null)
              setIsConfig(false)
            }}
            item={itemConfig}
          />
        </div>
      )}
      {!isConfig && renderContent()}

      <div
        className='flex w-full'
        style={
          isConfig
            ? {
                display: 'none',
              }
            : {}
        }
      >
        <MyTable
          loadMore={loadMore}
          hasMoreData={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          columns={getColumns()}
          loading={isLoading}
          data={data || []}
          limit={PAGE_SIZE_LIMIT}
          total={20}
          extra={<Button onClick={() => handleUpdate(null)}>{translate('common.addNew')}</Button>}
        />
      </div>
    </div>
  )
}

export default ProductAdminScreen
