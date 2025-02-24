import { useEffect, useState } from 'react'
const useCountdown = (amount: number = 60, step: number = 1) => {
  const [time, setTime] = useState(amount)

  useEffect(() => {
    setTime(amount)
  }, [amount])

  useEffect(() => {
    const interval = setInterval(() => {
      if (time === 0) {
        clearInterval(interval)
      } else {
        setTime(time - step)
      }
    }, step * 1000)

    return () => clearInterval(interval)
  }, [step, time])

  return {
    time,
  }
}

export default useCountdown
