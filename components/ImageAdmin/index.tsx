import { images } from '@/configs/images'
import { detectImg } from '@/utils/functions'
import { Image } from 'antd'
import React from 'react'
import { useInView } from 'react-intersection-observer'
const ImageAdmin = ({
  src,
  className,
  alt = '',
}: {
  src: string
  className?: string
  alt?: string
}) => {
  const { ref, inView } = useInView({ threshold: 0, triggerOnce: true })
  return (
    <div className={`w-full h-full ${className}`} ref={ref}>
      {inView && (
        <Image
          alt={alt || `${new Date().getTime().toString()}-${src}`}
          className='w-full h-auto'
          src={detectImg(src) || images.userDetail.iconUserDetail}
        />
      )}
    </div>
  )
}

export default ImageAdmin
