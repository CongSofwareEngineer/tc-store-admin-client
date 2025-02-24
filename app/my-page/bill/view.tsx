'use client'
import useBill from '@/hook/tank-query/useBill'
import useLanguage from '@/hook/useLanguage'
import React from 'react'
import Link from 'next/link'
import Item from './Component/Item'
import useQuerySearch from '@/hook/useQuerySearch'
import MyLoadMore from '@/components/MyLoadMore'
import OptionFilter from './Component/OptionFilter'
import LoadingData from './Component/LoadingData'
import useFirstLoadPage from '@/hook/useFirstLoadPage'
// import MyDatePicker from '@/components/MyDatePicker'

const BillScreen = () => {
  useFirstLoadPage()
  const { queries } = useQuerySearch()
  const { translate } = useLanguage()

  const { data, hasNextPage, isLoading, loadMore, isFetchingNextPage } = useBill(queries, '')

  return (
    <div className='flex flex-col gap-3 w-full '>
      <h2 className='text-medium font-bold'>{translate('myBill.title')}</h2>
      <div>{translate('myBill.des')}</div>
      <div className='relative w-full border-[1px]   border-gray-300' />

      <OptionFilter />

      <div className='flex flex-col'>
        {data.length > 0 && (
          <div className='flex gap-3 w-full flex-col mb-10'>
            {data.map((e, index) => {
              return <Item indexData={index} data={e} key={e?._id} />
            })}
          </div>
        )}

        <LoadingData loading={isLoading} />

        {!isLoading && data?.length === 0 && (
          <div className='flex gap-3 w-full  mt-3 text-medium'>
            <span>{translate('cart.empty')}</span>
            <Link href={'/shop'}>{translate('textPopular.buyNow')}</Link>
          </div>
        )}
        <MyLoadMore
          callback={loadMore}
          hasLoadMore={hasNextPage}
          loading={isLoading}
          isFetchingNextPage={isFetchingNextPage}
        />
      </div>
    </div>
  )
}

export default BillScreen
