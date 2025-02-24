// hooks/useStoreAfterHydration.js
import { useState, useLayoutEffect } from 'react'

const useStoreAfterHydration = (store: any, selector: any) => {
  const [isHydrated, setIsHydrated] = useState(false)
  const result = store(selector)

  useLayoutEffect(() => {
    setIsHydrated(true)
  }, [])

  return isHydrated ? result : null // Or some default value if needed
}

export default useStoreAfterHydration
