import React from 'react'
import { ListProductType } from './type'
import ItemProduct from '@/components/ItemProduct'
import useLanguage from '@/hook/useLanguage'
import Link from 'next/link'
import { FilterAPI } from '@/constant/app'
import { AlignLeftOutlined, CaretRightOutlined, RightOutlined } from '@ant-design/icons'
import { CollapseCustom } from './styled'
import useProductByLimit from '@/hook/tank-query/useProductByLimit'
import { TYPE_PRODUCT } from '@/constant/admin'
import LoadingGetData from '@/components/LoadingGetData'
import { getUrlProduct } from '@/utils/functions'

const ListProduct = ({ title, type = 'all' }: ListProductType) => {
  const { data, isLoading } = useProductByLimit(type, 5)
  const { translate } = useLanguage()

  const getUrl = () => {
    if (type === TYPE_PRODUCT.shoes) {
      return 'shoes'
    }
    return `shop?${FilterAPI.Category}=${type || 'all'}`
  }

  const renderListItem = () => {
    return (
      <div className='pb-3 flex gap-3 md:gap-5 overflow-x-auto w-full'>
        <LoadingGetData loading={isLoading} colDesktop={5} />

        {Array.isArray(data?.data) &&
          data?.data?.map((item) => {
            return (
              <ItemProduct
                showFeedback
                showSold
                key={item.keyName}
                item={item}
                href={getUrlProduct(item)}
                className={'w-[180px] md:w-[230px]   md:h-[350px]'}
              />
            )
          })}

        {Array.isArray(data?.data) && data?.data?.length === 0 && (
          <div>{translate('warning.noData')}</div>
        )}
      </div>
    )
  }

  const items = [
    {
      key: type,
      expandIcon: <AlignLeftOutlined style={{ fontSize: 20 }} />,
      label: (
        <div className='flex justify-between items-center'>
          <div className='flex text-medium w-full '>{title}</div>
        </div>
      ),
      children: renderListItem(),
      extra: (
        <Link
          onClick={(event) => event.stopPropagation()}
          href={getUrl()}
          className='text-medium cursor-pointer hover:font-semibold hover:text-green-600'
        >
          <span> {translate('textPopular.viewMore')}</span>
          <RightOutlined className='text-sm ml-2' />
        </Link>
      ),
    },
  ]

  return (
    <CollapseCustom
      expandIcon={({ isActive }: any) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
      defaultActiveKey={[type]}
      items={items}
      style={{ background: 'transparent' }}
    />
  )
}

export default ListProduct
