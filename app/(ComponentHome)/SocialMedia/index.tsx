import { images } from '@/configs/images'
import { NextPage } from 'next'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { LINK_CONTACT } from '@/constant/app'

const SocialMedia: NextPage = () => {
  return (
    <div
      style={{
        background:
          'linear-gradient(135.25deg, rgb(88, 201, 226) 18.39%, rgb(166, 247, 242) 59.75%, rgb(209, 164, 229) 80.43%, rgb(170, 124, 191) 101.11%)',
      }}
      className='w-auto fixed top-[50%] -translate-y-[50%]  left-0 p-[2px] pl-0 rounded-r-2xl rounded-br-2xl '
    >
      <div className='bg-black/80 flex flex-col py-2 px-2  gap-3 w-12 rounded-r-2xl  rounded-br-2xl'>
        <Link target='_blank' href={LINK_CONTACT.Zalo}>
          <Image
            fill
            src={images.footer.iconZalo}
            alt={LINK_CONTACT.Zalo}
            className='hover:scale-110 cursor-pointer !relative !w-full !h-auto'
          />
        </Link>

        <Link target='_blank' href={LINK_CONTACT.SDT}>
          <Image
            fill
            src={images.footer.iconNumberPhone}
            alt={LINK_CONTACT.SDT}
            className='hover:scale-110 cursor-pointer !relative !w-full !h-auto'
          />
        </Link>
        <Link className='w-[90%]' target='_blank' href={LINK_CONTACT.FaceBook}>
          <Image
            fill
            src={images.footer.iconFace}
            alt={LINK_CONTACT.FaceBook}
            className='hover:scale-110 cursor-pointer !relative !w-full !h-auto'
          />
        </Link>
      </div>
    </div>
  )
}

export default SocialMedia
