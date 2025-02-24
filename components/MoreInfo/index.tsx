import React from 'react'
import { Tabs, TabsProps } from 'antd'
import useLanguage from '@/hook/useLanguage'
import dynamic from 'next/dynamic'
import MyLoading from '../MyLoading'
const MyBlog = dynamic(() => import('@/components/MyBlog'), {
  ssr: true,
  loading: () => {
    return <MyLoading />
  },
})

const Comment = dynamic(() => import('@/components/Comment'), {
  ssr: true,
  loading: () => {
    return <MyLoading />
  },
})

const MoreInfo = ({ data }: { data: any }) => {
  const { translate } = useLanguage()

  const items: TabsProps['items'] = [
    {
      key: 'info',
      label: translate('textPopular.infor'),
      children: <MyBlog className='!p-0' value={JSON.parse(data?.des2 || '{}')} disabled />,
    },
    {
      key: 'Comment',
      label: translate('textPopular.comment'),
      children: <Comment dataItem={data} />,
    },
  ]

  return <Tabs className='p-0' items={items} />
}

export default MoreInfo
