import React from 'react'
import { detectImg } from '@/utils/functions'
import { Image } from 'antd'

const ImgMoreProduct = ({
  data,
  onHover = () => {},
}: {
  data: any
  onHover?: (param?: string) => void
}) => {
  return data?.imageMore?.length > 1 ? (
    // <div className="absolute bottom-0 ">
    <div className='mt-2'>
      <div className='flex w-full overflow-x-auto gap-2 pb-2'>
        {data.imageMore.map((e: string) => {
          return (
            <div
              style={{
                boxShadow:
                  'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px',
              }}
              className='flex shadow-inner md:w-[60px] w-10 aspect-square  md:h-[60px] h-10'
              key={e}
              onMouseLeave={() => onHover('')}
              onMouseOver={() => onHover(e)}
            >
              <Image alt={e} src={detectImg(e)} />
            </div>
          )
        })}
      </div>
    </div>
  ) : (
    <></>
  )
}

export default ImgMoreProduct
