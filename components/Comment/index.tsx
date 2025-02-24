import React from 'react'
import WriteComment from './WriteComment'
import { ItemDetailType } from '../InfoItemDetail/type'
import ListComment from './ListComment'

const Comment = ({ dataItem }: { dataItem: ItemDetailType }) => {
  return (
    <div className='w-full md:mt-4 mt-3 flex flex-col gap-3'>
      <WriteComment dataItem={dataItem} />
      <ListComment dataItem={dataItem} />
    </div>
  )
}

export default Comment
