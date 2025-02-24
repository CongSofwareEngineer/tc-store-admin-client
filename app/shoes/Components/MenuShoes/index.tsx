import MyFilter from '@/components/MyFilter'
import MyFilterCheckBox from '@/components/MyFilterCheckBox'
import MyFilterRange from '@/components/MyFilterRange'
import { DEFAULT_VALUE_RANGE, FilterAPI } from '@/constant/app'
import useLanguage from '@/hook/useLanguage'
import React from 'react'

const MenuShoes = () => {
  const { translate } = useLanguage()

  const menuShoes = [
    {
      value: 'male',
      label: translate('textPopular.male'),
    },
    {
      value: 'female',
      label: translate('textPopular.female'),
    },
  ]

  return (
    <MyFilter titleHeader={translate('menuProduct.category')}>
      <MyFilterCheckBox
        data={menuShoes}
        titleFilter={translate('menuProduct.product')}
        typeChecked={FilterAPI.Sex}
        isReplace={false}
      />

      <MyFilterRange
        keyMax='maxSize'
        keyMin='minSize'
        maxSlider={DEFAULT_VALUE_RANGE.Shoes.maxSize}
        minSlider={DEFAULT_VALUE_RANGE.Shoes.minSize}
        title={translate('textPopular.size')}
      />

      <MyFilterRange
        stepRange={100000}
        keyMax='maxPrice'
        keyMin='minPrice'
        maxSlider={DEFAULT_VALUE_RANGE.Price.max}
        minSlider={DEFAULT_VALUE_RANGE.Price.min}
        title={`${translate('productDetail.price')} (VNĐ)`}
      />
    </MyFilter>
  )
}

export default MenuShoes
