import useModalDrawer from '@/hook/useModalDrawer'
import { Button, Rate } from 'antd'
import React from 'react'
import ModalWrite from './ModalWrite'
import { ItemDetailType } from '@/components/InfoItemDetail/type'
import useMedia from '@/hook/useMedia'
import useLanguage from '@/hook/useLanguage'
import useComment from '@/hook/tank-query/useComment'

const WriteComment = ({ dataItem }: { dataItem: ItemDetailType }) => {
  const { openModalDrawer } = useModalDrawer()
  const { isMobile } = useMedia()
  const { translate } = useLanguage()
  const { data } = useComment(dataItem?._id)

  const handleWrite = () => {
    openModalDrawer({
      content: <ModalWrite dataItem={dataItem} />,
      useDrawer: true,
      title: <div className='text-medium'>{translate('feedback.title')}</div>,
      configModal: {
        width: '600px',
      },
    })
  }
  return (
    <div className='flex md:flex-row flex-col md:gap-10 gap-5 justify-between'>
      <div className='flex flex-col gap-2 justify-center md:items-center'>
        <div className='text-medium font-bold'>{translate('textPopular.feedbackProduct')}</div>
        <div className='text-[30px] font-bold text-green-500'>5.0/5</div>
        <Rate disabled defaultValue={5} style={{ fontSize: isMobile ? 15 : 18 }} />
        <div className='opacity-75'>
          {' '}
          {`(${data?.length || 0} ${translate('textPopular.rate')} )`}
        </div>
      </div>
      <div className='flex flex-col gap-2 justify-center'>
        <div className='flex gap-2 w-full'>
          <Rate disabled defaultValue={4} style={{ fontSize: isMobile ? 16 : 18 }} />
          <span>({translate('comment.veryGood')})</span>
        </div>
        <div className='flex gap-2 w-full'>
          <Rate disabled defaultValue={3} style={{ fontSize: isMobile ? 16 : 18 }} />
          <span>({translate('comment.good')})</span>
        </div>
        <div className='flex gap-2 w-full'>
          <Rate disabled defaultValue={2} style={{ fontSize: isMobile ? 16 : 18 }} />
          <span>({translate('comment.normal')})</span>
        </div>
        <div className='flex gap-2 w-full'>
          <Rate disabled defaultValue={1} style={{ fontSize: isMobile ? 16 : 18 }} />
          <span>({translate('comment.bad')})</span>
        </div>
      </div>
      <div className='flex flex-col gap-2 flex-1  items-center'>
        <div className='text-medium text-center'>{translate('comment.writeToShare')}</div>
        <Button onClick={handleWrite}>{translate('common.writeComment')}</Button>
      </div>
    </div>
  )
}

export default WriteComment
