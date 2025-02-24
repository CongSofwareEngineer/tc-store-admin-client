'use client'
import React from 'react'
import useAos from '@/hook/useAos'
import MenuCategory from './Component/MenuCategory'
import InputSearch from './Component/InputSearch'
import Content from './Component/Content'
import useFirstLoadPage from '@/hook/useFirstLoadPage'

const ShopScreen = () => {
  useAos()
  useFirstLoadPage()
  return (
    <div className='w-full flex md:flex-row flex-col  md:gap-6 gap-3  h-full justify-star md:mt-3'>
      <div className='md:w-[250px] w-full' data-aos='fade-right'>
        <MenuCategory />
      </div>
      <div className='flex-1 w-full  h-full' data-aos='fade-left'>
        <InputSearch />
        <Content />
      </div>
    </div>
  )
}

export default ShopScreen
