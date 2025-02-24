import ItemProduct from '@/components/ItemProduct'
import MyLoadMore from '@/components/MyLoadMore'
import { PAGE_SIZE_LIMIT } from '@/constant/app'
import useAllProduct from '@/hook/tank-query/useAllProduct'
import useQuerySearch from '@/hook/useQuerySearch'
import React from 'react'
import { TYPE_PRODUCT } from '@/constant/admin'
import useLanguage from '@/hook/useLanguage'
import LoadingGetData from '@/components/LoadingGetData'

const Content = () => {
  const { queries } = useQuerySearch()
  const { translate } = useLanguage()
  const { data, isLoading, loadMore, hasNextPage, isFetchingNextPage } = useAllProduct(
    PAGE_SIZE_LIMIT,
    queries
  )

  const getUrl = (item: any) => {
    if (item.category === TYPE_PRODUCT.shoes) {
      return `/shoes/${item.keyName}`
    }
    return `/shop/${item.keyName}`
  }
  return (
    <>
      {data.length > 0 && (
        <div className='mt-2  w-full grid grid-cols-2 sm:grid-cols-3  lg:grid-cols-4   gap-3 xl:gap-6 md:gap-4'>
          {data.map((item: any) => {
            return (
              <ItemProduct
                showFeedback
                showSold
                key={`shop-${item.id}`}
                item={item}
                href={getUrl(item)}
              />
            )
          })}
        </div>
      )}

      {data.length === 0 && !isLoading && <div className='mt-3'>{translate('warning.noData')}</div>}

      <MyLoadMore
        callback={loadMore}
        hasLoadMore={hasNextPage}
        loading={isLoading}
        isFetchingNextPage={isFetchingNextPage}
      />

      <LoadingGetData colSurface={3} rows={2} loading={isLoading} />
    </>
  )
}

export default Content
