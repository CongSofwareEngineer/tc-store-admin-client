import { PATH_LANGUAGE, TYPE_LANGUAGE } from '@/constant/zustand'
import { useCategoryMenu } from '@/zustand/useCategoryMenu'
import { useLanguage as useLanguageZustand } from '@/zustand/useLanguage'
import { message } from 'antd'

const useLanguage = () => {
  const { language } = useLanguageZustand()
  const { categoryMenu } = useCategoryMenu()

  const translate = (key?: PATH_LANGUAGE<TYPE_LANGUAGE>) => {
    try {
      const arrKey = key!.split('.')
      let text: any = ''
      arrKey.forEach((e) => {
        if (!text) {
          text = language?.messages[e]
        } else {
          text = text[e]
        }
      })
      return text
    } catch {
      return ''
    }
  }

  const getLabelCategory = (key: string) => {
    try {
      const data = categoryMenu.find((e) => e.keyName === key)
      return data?.lang?.[language.locale] || key
    } catch {
      return key
    }
  }

  const copyToClipboard = (text: any) => {
    const tmp = document.createElement('input')
    tmp.value = text
    document.body.appendChild(tmp)
    tmp.select()
    document.execCommand('copy')
    tmp.remove()
    message.success({
      type: 'success',
      content: translate('textPopular.copied'),
    })
  }

  return {
    copyToClipboard,
    getLabelCategory,
    translate,
    lang: language?.locale || 'vn',
  }
}

export default useLanguage
